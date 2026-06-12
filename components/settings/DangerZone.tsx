"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { deleteSite } from "@/app/actions/settings";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DangerZoneProps {
  siteId: string;
  siteName: string;
}

export function DangerZone({ siteId, siteName }: DangerZoneProps) {
  const router = useRouter();
  const [confirmName, setConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const canDelete = confirmName === siteName;

  async function handleDelete() {
    if (!canDelete) return;

    setIsDeleting(true);
    const result = await deleteSite(siteId);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Site silindi");
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error(result.error ?? "Silme işlemi başarısız");
    }
  }

  return (
    <div className="rounded-lg border border-red-200 bg-white p-6">
      <h2 className="mb-6 text-base font-medium text-red-600">
        Tehlikeli Bölge
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-gray-900">Siteyi Sil</p>
          <p className="mt-1 text-[13px] text-lyra-text-secondary">
            Bu işlem geri alınamaz. Tüm içerik, hasta adayları ve analitik
            verisi silinir.
          </p>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="shrink-0 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Siteyi Sil
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
              <AlertDialogDescription>
                &apos;{siteName}&apos; sitesi kalıcı olarak silinecek. Bu işlem
                geri alınamaz.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2">
              <Label htmlFor="confirmName">
                Onaylamak için site adını yazın:
              </Label>
              <Input
                id="confirmName"
                placeholder={siteName}
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setConfirmName("");
                }}
              >
                İptal
              </AlertDialogCancel>
              <Button
                variant="default"
                className="bg-red-600 hover:bg-red-700"
                disabled={!canDelete || isDeleting}
                onClick={handleDelete}
              >
                {isDeleting && (
                  <IconLoader2 size={16} className="animate-spin" />
                )}
                {isDeleting ? "Siliniyor..." : "Sil"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
