import { Skeleton } from "@/components/ui/skeleton";

export default function CrmLoading() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-8 rounded-full" />
      </div>
      <Skeleton className="h-64 rounded-card" />
    </div>
  );
}
