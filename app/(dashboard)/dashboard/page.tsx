import { DashboardSitesView } from "@/components/dashboard/DashboardSitesView";
import { createClient } from "@/lib/supabase/server";
import type { Site } from "@/lib/types";

export default async function SitesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sites } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  const siteList = (sites ?? []) as Site[];

  return <DashboardSitesView sites={siteList} />;
}
