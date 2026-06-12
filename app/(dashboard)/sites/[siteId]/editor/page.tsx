import { notFound } from "next/navigation";
import { EditorShell } from "@/components/editor/EditorShell";
import { getTemplateById } from "@/lib/templates";
import { createClient } from "@/lib/supabase/server";
import type { Site } from "@/lib/types";

interface EditorPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { siteId } = await params;
  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .single();

  if (!site) {
    notFound();
  }

  const template = getTemplateById(site.template_id);
  if (!template) {
    notFound();
  }

  return (
    <EditorShell site={site as Site} template={template} />
  );
}
