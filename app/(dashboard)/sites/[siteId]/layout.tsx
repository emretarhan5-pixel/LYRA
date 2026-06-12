import { notFound } from "next/navigation";
import { SiteSidebar } from "@/components/dashboard/SiteSidebar";
import { createClient } from "@/lib/supabase/server";
import type { Site } from "@/lib/types";

interface SiteLayoutProps {
  children: React.ReactNode;
  params: Promise<{ siteId: string }>;
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { siteId } = await params;
  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("id, name, slug, is_published")
    .eq("id", siteId)
    .single();

  if (!site) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <SiteSidebar site={site as Pick<Site, "id" | "name" | "slug" | "is_published">} />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
