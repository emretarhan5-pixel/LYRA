import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { LeadStatusBadge } from "@/components/dashboard/LeadStatusBadge";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Lead } from "@/lib/types";

interface CrmPageProps {
  params: Promise<{ siteId: string }>;
}

const formTypeLabels: Record<string, string> = {
  contact: "İletişim",
  appointment: "Randevu",
};

export default async function CrmPage({ params }: CrmPageProps) {
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

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("site_id", siteId)
    .order("created_at", { ascending: false });

  const leadList = (leads ?? []) as Lead[];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-medium text-lyra-surface">
          Hasta Adayları
        </h1>
        <Badge variant="count">{leadList.length}</Badge>
      </div>

      {leadList.length === 0 ? (
        <div className="rounded-card border border-zinc-200 bg-white px-6 py-16 text-center">
          <p className="text-sm text-lyra-text-secondary">
            Henüz hasta adayı yok. Siteniz yayına girince formdan gelen
            kayıtlar burada görünecek.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-medium text-lyra-text-secondary">
                <th className="px-4 py-3 w-10">#</th>
                <th className="px-4 py-3">Ad Soyad</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3">E-posta</th>
                <th className="px-4 py-3">Form</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {leadList.map((lead, index) => (
                <tr
                  key={lead.id}
                  className="cursor-pointer border-b border-zinc-100 transition-colors last:border-0 hover:bg-zinc-50"
                >
                  <td className="px-4 py-3 text-lyra-text-secondary">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-lyra-surface">
                    {lead.full_name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-lyra-text-secondary">
                    {lead.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-lyra-text-secondary">
                    {lead.email ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-lyra-text-secondary">
                    {formTypeLabels[lead.form_type] ?? lead.form_type}
                  </td>
                  <td className="px-4 py-3">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-lyra-text-secondary">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
