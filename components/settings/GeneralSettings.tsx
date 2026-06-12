"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  checkSlugAvailabilityForSite,
  updateSiteName,
  updateSiteSlug,
} from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify } from "@/lib/utils/slugify";

interface GeneralSettingsProps {
  siteId: string;
  initialName: string;
  initialSlug: string;
}

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "lyra.app";

export function GeneralSettings({
  siteId,
  initialName,
  initialSlug,
}: GeneralSettingsProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingSlug, setIsSavingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid" | "current"
  >("current");

  useEffect(() => {
    setName(initialName);
    setSlug(initialSlug);
  }, [initialName, initialSlug]);

  useEffect(() => {
    if (slug === initialSlug) {
      setSlugStatus("current");
      return;
    }

    if (slug.length < 3) {
      setSlugStatus("invalid");
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setSlugStatus("invalid");
      return;
    }

    setSlugStatus("checking");
    const timer = setTimeout(async () => {
      const result = await checkSlugAvailabilityForSite(slug, siteId);
      if (result.error) {
        setSlugStatus("invalid");
      } else {
        setSlugStatus(result.available ? "available" : "taken");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [slug, initialSlug, siteId]);

  async function handleSaveName() {
    setIsSavingName(true);
    const result = await updateSiteName(siteId, name);
    setIsSavingName(false);

    if (result.success) {
      toast.success("Site adı güncellendi");
      router.refresh();
    } else {
      toast.error(result.error ?? "Güncelleme başarısız");
    }
  }

  async function handleUpdateSlug() {
    setIsSavingSlug(true);
    const result = await updateSiteSlug(siteId, slug);
    setIsSavingSlug(false);

    if (result.success) {
      toast.success("Site adresi güncellendi");
      router.refresh();
    } else {
      toast.error(result.error ?? "Güncelleme başarısız");
    }
  }

  const canUpdateSlug =
    slug !== initialSlug &&
    slugStatus === "available" &&
    !isSavingSlug;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="mb-6 text-base font-medium text-lyra-surface">Genel</h2>

      <div className="mb-8">
        <Label htmlFor="siteName" className="mb-2 block">
          Site Adı
        </Label>
        <div className="flex gap-3">
          <Input
            id="siteName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveName}
            disabled={isSavingName || name.trim() === initialName}
          >
            {isSavingName ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="siteSlug" className="mb-1 block">
          Site Adresi
        </Label>
        <p className="mb-3 text-xs text-lyra-text-secondary">
          Sitenizin URL&apos;ini belirler. Değiştirirseniz eski adres çalışmayı
          durdurur.
        </p>

        <div className="flex items-center gap-0">
          <span className="flex h-10 items-center rounded-l-button border border-r-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-lyra-text-secondary">
            {ROOT_DOMAIN}/
          </span>
          <Input
            id="siteSlug"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            className="rounded-l-none"
          />
        </div>

        {slug !== initialSlug && slugStatus === "checking" && (
          <p className="mt-2 text-xs text-lyra-text-secondary">
            Kontrol ediliyor...
          </p>
        )}
        {slug !== initialSlug && slugStatus === "available" && (
          <p className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <IconCheck size={14} />
            Kullanılabilir
          </p>
        )}
        {slug !== initialSlug && slugStatus === "taken" && (
          <p className="mt-2 flex items-center gap-1 text-xs text-red-500">
            <IconX size={14} />
            Bu adres kullanımda
          </p>
        )}
        {slug !== initialSlug && slugStatus === "invalid" && (
          <p className="mt-2 flex items-center gap-1 text-xs text-red-500">
            <IconX size={14} />
            Geçersiz adres formatı
          </p>
        )}

        <p className="mt-3 text-xs text-yellow-700">
          ⚠ Eski adresinizi paylaştıysanız güncelleme yapmanızı önermeyiz.
        </p>

        <Button
          className="mt-4"
          variant="outline"
          size="sm"
          onClick={handleUpdateSlug}
          disabled={!canUpdateSlug}
        >
          {isSavingSlug ? "Güncelleniyor..." : "Adresi Güncelle"}
        </Button>
      </div>
    </div>
  );
}
