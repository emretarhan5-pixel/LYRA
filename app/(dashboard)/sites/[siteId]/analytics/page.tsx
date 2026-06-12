import { notFound } from "next/navigation";
import { getAnalytics } from "@/app/actions/analytics";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { createClient } from "@/lib/supabase/server";

interface AnalyticsPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { siteId } = await params;
  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("id, name, slug")
    .eq("id", siteId)
    .single();

  if (!site) {
    notFound();
  }

  const analyticsData = await getAnalytics(siteId, 7);

  return (
    <AnalyticsDashboard
      initialData={analyticsData}
      siteName={site.name}
      siteId={site.id}
      siteSlug={site.slug}
    />
  );
}
