import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface PagesPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function PagesPage({ params }: PagesPageProps) {
  const { siteId } = await params;
  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("name")
    .eq("id", siteId)
    .single();

  if (!site) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium text-lyra-surface">
        Sayfalar — {site.name}
      </h1>
      <p className="mt-2 text-sm text-lyra-text-secondary">
        Sayfa editörü yakında eklenecek.
      </p>
    </div>
  );
}
