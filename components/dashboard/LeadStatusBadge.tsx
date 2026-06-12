import { Badge } from "@/components/ui/badge";
import type { LeadStatus } from "@/lib/types";

const statusConfig: Record<
  LeadStatus,
  { label: string; variant: "new" | "contacted" | "appointed" | "closed" }
> = {
  new: { label: "Yeni", variant: "new" },
  contacted: { label: "Görüşüldü", variant: "contacted" },
  appointed: { label: "Randevu", variant: "appointed" },
  closed: { label: "Kapandı", variant: "closed" },
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
