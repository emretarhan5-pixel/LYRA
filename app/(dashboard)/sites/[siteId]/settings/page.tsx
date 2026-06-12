import { notFound, redirect } from "next/navigation";
import { SiteSettingsShell } from "@/components/settings/SiteSettingsShell";
import { createClient } from "@/lib/supabase/server";
import type { Plan, Site } from "@/lib/types";

interface SiteSettingsPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function SiteSettingsPage({
  params,
}: SiteSettingsPageProps) {
  const { siteId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .eq("user_id", user.id)
    .single();

  if (!site) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  return (
    <SiteSettingsShell
      site={site as Site}
      plan={(profile?.plan as Plan) ?? "free"}
    />
  );
}
