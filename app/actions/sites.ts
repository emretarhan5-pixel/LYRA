"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTemplateById } from "@/lib/templates";
import type { SiteContent } from "@/lib/templates";
import type { TemplateId } from "@/lib/types";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function checkSlugAvailability(
  slug: string
): Promise<{ available: boolean; error?: string }> {
  if (!slug) {
    return { available: false, error: "Slug boş olamaz" };
  }

  if (!SLUG_REGEX.test(slug)) {
    return {
      available: false,
      error: "Sadece küçük harf, rakam ve tire kullanılabilir",
    };
  }

  if (slug.length > 50) {
    return { available: false, error: "Slug en fazla 50 karakter olabilir" };
  }

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("sites")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    return { available: !data };
  } catch {
    const supabase = await createClient();
    const { data } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    return { available: !data };
  }
}

export async function createSite(data: {
  name: string;
  slug: string;
  templateId: TemplateId;
  city: string;
}): Promise<{ success: boolean; siteId?: string; error?: string }> {
  const { name, slug, templateId, city } = data;

  if (!name.trim()) {
    return { success: false, error: "Site adı zorunludur" };
  }

  if (!city.trim()) {
    return { success: false, error: "Şehir zorunludur" };
  }

  if (!SLUG_REGEX.test(slug)) {
    return {
      success: false,
      error: "Geçersiz slug formatı. Sadece küçük harf, rakam ve tire kullanın.",
    };
  }

  const template = getTemplateById(templateId);
  if (!template) {
    return { success: false, error: "Geçersiz şablon" };
  }

  const { available } = await checkSlugAvailability(slug);
  if (!available) {
    return { success: false, error: "Bu adres zaten kullanılıyor" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum bulunamadı" };
  }

  const content: SiteContent = {
    ...template.defaultContent,
    contact: {
      ...template.defaultContent.contact,
      city: city.trim(),
    },
    meta: {
      ...template.defaultContent.meta,
      siteName: name.trim(),
      logoText: name.trim(),
    },
  };

  const { data: site, error } = await supabase
    .from("sites")
    .insert({
      user_id: user.id,
      name: name.trim(),
      slug,
      template_id: templateId,
      content,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Bu adres zaten kullanılıyor" };
    }
    return { success: false, error: error.message };
  }

  return { success: true, siteId: site.id };
}

export async function updateSiteContent(
  siteId: string,
  content: SiteContent
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum bulunamadı" };
  }

  const { error } = await supabase
    .from("sites")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", siteId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function togglePublish(
  siteId: string,
  isPublished: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum bulunamadı" };
  }

  const { error } = await supabase
    .from("sites")
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", siteId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
