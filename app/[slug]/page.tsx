import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteRenderer } from "@/components/site/SiteRenderer";
import { getTemplateById } from "@/lib/templates";
import type { SiteContent } from "@/lib/templates";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Site } from "@/lib/types";

const RESERVED_SLUGS = new Set([
  "dashboard",
  "auth",
  "sites",
  "api",
  "_next",
]);

interface PublicSitePageProps {
  params: Promise<{ slug: string }>;
}

async function getPublishedSite(slug: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  return data as Site | null;
}

export async function generateMetadata({
  params,
}: PublicSitePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) {
    return { title: "Site Bulunamadı" };
  }

  const site = await getPublishedSite(slug);
  if (!site) {
    return { title: "Site Bulunamadı" };
  }

  const content = site.content as unknown as SiteContent;

  return {
    title: content.meta.siteName,
    description: content.hero.subheadline,
    openGraph: {
      title: content.meta.siteName,
      description: content.hero.subheadline,
      siteName: content.meta.siteName,
      type: "website",
    },
  };
}

export default async function PublicSitePage({ params }: PublicSitePageProps) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const site = await getPublishedSite(slug);
  if (!site) {
    notFound();
  }

  const template = getTemplateById(site.template_id);
  if (!template) {
    notFound();
  }

  return <SiteRenderer site={site} template={template} />;
}
