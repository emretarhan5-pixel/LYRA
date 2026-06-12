"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { FormType } from "@/lib/types";

export async function createLead(data: {
  siteId: string;
  formType: FormType;
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }> {
  const { siteId, formType, fullName, phone, email, message } = data;

  if (!fullName.trim()) {
    return { success: false, error: "Ad soyad zorunludur" };
  }

  if (!phone.trim()) {
    return { success: false, error: "Telefon zorunludur" };
  }

  const admin = createAdminClient();

  const { data: site } = await admin
    .from("sites")
    .select("id, is_published")
    .eq("id", siteId)
    .maybeSingle();

  if (!site || !site.is_published) {
    return { success: false, error: "Site bulunamadı" };
  }

  const { error } = await admin.from("leads").insert({
    site_id: siteId,
    form_type: formType,
    full_name: fullName.trim(),
    phone: phone.trim(),
    email: email?.trim() || null,
    message: message?.trim() || null,
    status: "new",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
