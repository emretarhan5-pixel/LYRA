"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils/slugify";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DOMAIN_REGEX =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

async function verifySiteOwnership(siteId: string): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("id", siteId)
    .eq("user_id", user.id)
    .maybeSingle();

  return !!site;
}

async function isSlugAvailable(
  slug: string,
  excludeSiteId?: string
): Promise<boolean> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("sites")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!data) return true;
    if (excludeSiteId && data.id === excludeSiteId) return true;
    return false;
  } catch {
    return false;
  }
}

export async function checkSlugAvailabilityForSite(
  slug: string,
  siteId: string
): Promise<{ available: boolean; error?: string }> {
  if (!slug) {
    return { available: false, error: "Slug boş olamaz" };
  }

  if (slug.length < 3) {
    return { available: false, error: "En az 3 karakter olmalı" };
  }

  if (slug.length > 50) {
    return { available: false, error: "En fazla 50 karakter olabilir" };
  }

  if (!SLUG_REGEX.test(slug)) {
    return {
      available: false,
      error: "Sadece küçük harf, rakam ve tire kullanılabilir",
    };
  }

  const isOwner = await verifySiteOwnership(siteId);
  if (!isOwner) {
    return { available: false, error: "Yetkisiz" };
  }

  const available = await isSlugAvailable(slug, siteId);
  return { available };
}

export async function updateSiteSlug(
  siteId: string,
  newSlug: string
): Promise<{ success: boolean; slug?: string; error?: string }> {
  const slug = slugify(newSlug);

  if (slug.length < 3) {
    return { success: false, error: "Slug en az 3 karakter olmalı" };
  }

  if (slug.length > 50) {
    return { success: false, error: "Slug en fazla 50 karakter olabilir" };
  }

  if (!SLUG_REGEX.test(slug)) {
    return {
      success: false,
      error: "Geçersiz slug formatı",
    };
  }

  const isOwner = await verifySiteOwnership(siteId);
  if (!isOwner) {
    return { success: false, error: "Yetkisiz işlem" };
  }

  const available = await isSlugAvailable(slug, siteId);
  if (!available) {
    return { success: false, error: "Bu adres zaten kullanılıyor" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("sites")
    .update({ slug, updated_at: new Date().toISOString() })
    .eq("id", siteId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, slug };
}

export async function updateSiteName(
  siteId: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { success: false, error: "Site adı en az 2 karakter olmalı" };
  }

  if (trimmed.length > 100) {
    return { success: false, error: "Site adı en fazla 100 karakter olabilir" };
  }

  const isOwner = await verifySiteOwnership(siteId);
  if (!isOwner) {
    return { success: false, error: "Yetkisiz işlem" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("sites")
    .update({ name: trimmed, updated_at: new Date().toISOString() })
    .eq("id", siteId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateCustomDomain(
  siteId: string,
  domain: string | null
): Promise<{ success: boolean; error?: string }> {
  const isOwner = await verifySiteOwnership(siteId);
  if (!isOwner) {
    return { success: false, error: "Yetkisiz işlem" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum bulunamadı" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? "free";
  if (plan !== "pro" && plan !== "agency") {
    return { success: false, error: "Bu özellik Pro plan gerektirir" };
  }

  let normalizedDomain: string | null = null;

  if (domain !== null && domain.trim() !== "") {
    normalizedDomain = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "");

    if (!DOMAIN_REGEX.test(normalizedDomain)) {
      return { success: false, error: "Geçersiz alan adı formatı" };
    }
  }

  const { error } = await supabase
    .from("sites")
    .update({
      custom_domain: normalizedDomain,
      updated_at: new Date().toISOString(),
    })
    .eq("id", siteId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteSite(
  siteId: string
): Promise<{ success: boolean; error?: string }> {
  const isOwner = await verifySiteOwnership(siteId);
  if (!isOwner) {
    return { success: false, error: "Yetkisiz işlem" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("sites").delete().eq("id", siteId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
