"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { updateCustomDomain } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Plan } from "@/lib/types";

interface DomainSettingsProps {
  siteId: string;
  customDomain: string | null;
  plan: Plan;
}

function DnsInstructions() {
  return (
    <div className="mt-6 rounded-lg border border-zinc-200 bg-gray-50 p-4">
      <p className="mb-4 text-sm text-lyra-surface">
        Alan adınızın DNS ayarlarına aşağıdaki kaydı ekleyin:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs text-lyra-text-secondary">
              <th className="pb-2 pr-4">Tür</th>
              <th className="pb-2 pr-4">İsim</th>
              <th className="pb-2">Değer</th>
            </tr>
          </thead>
          <tbody className="text-lyra-surface">
            <tr className="border-b border-zinc-100">
              <td className="py-2 pr-4">CNAME</td>
              <td className="py-2 pr-4">@</td>
              <td className="py-2 font-mono text-xs">cname.vercel-dns.com</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">A</td>
              <td className="py-2 pr-4">@</td>
              <td className="py-2 font-mono text-xs">76.76.21.21</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-lyra-text-secondary">
        DNS değişiklikleri 24-48 saat içinde aktif olur.
      </p>
      <p className="text-xs text-lyra-text-secondary">
        Doğrulama otomatik yapılacaktır.
      </p>
    </div>
  );
}

export function DomainSettings({
  siteId,
  customDomain,
  plan,
}: DomainSettingsProps) {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [isBinding, setIsBinding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showDns, setShowDns] = useState(!!customDomain);

  const canUseCustomDomain = plan === "pro" || plan === "agency";

  async function handleBind() {
    setIsBinding(true);
    const result = await updateCustomDomain(siteId, domain);
    setIsBinding(false);

    if (result.success) {
      toast.success("Özel alan adı bağlandı");
      setShowDns(true);
      setDomain("");
      router.refresh();
    } else {
      toast.error(result.error ?? "Bağlama başarısız");
    }
  }

  async function handleRemove() {
    setIsRemoving(true);
    const result = await updateCustomDomain(siteId, null);
    setIsRemoving(false);

    if (result.success) {
      toast.success("Özel alan adı kaldırıldı");
      setShowDns(false);
      router.refresh();
    } else {
      toast.error(result.error ?? "Kaldırma başarısız");
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="mb-2 text-base font-medium text-lyra-surface">
        Özel Alan Adı
      </h2>
      <p className="mb-6 text-sm text-lyra-text-secondary">
        Pro plan gerektirir. Kendi alan adınızı bağlayarak drkaya.com gibi bir
        adres kullanabilirsiniz.
      </p>

      {!canUseCustomDomain && (
        <div className="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="mb-3 text-sm font-medium text-lyra-surface">
            Bu özellik Pro plan gerektirir
          </p>
          <Button asChild size="sm">
            <Link href="/dashboard/billing">Pro&apos;ya Geç</Link>
          </Button>
        </div>
      )}

      <div className="mb-6">
        {customDomain ? (
          <div className="flex items-center gap-3">
            <Badge variant="published">Bağlı</Badge>
            <span className="text-sm font-medium text-lyra-surface">
              {customDomain}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleRemove}
              disabled={isRemoving || !canUseCustomDomain}
            >
              {isRemoving ? "Kaldırılıyor..." : "Kaldır"}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-lyra-text-secondary">
            Henüz özel alan adı yok
          </p>
        )}
      </div>

      <div className={!canUseCustomDomain ? "pointer-events-none opacity-50" : ""}>
        <Label htmlFor="customDomain" className="mb-2 block">
          Alan Adı
        </Label>
        <div className="flex gap-3">
          <Input
            id="customDomain"
            placeholder="drkaya.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled={!canUseCustomDomain}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={handleBind}
            disabled={!canUseCustomDomain || isBinding || !domain.trim()}
          >
            {isBinding ? "Bağlanıyor..." : "Bağla"}
          </Button>
        </div>
      </div>

      {showDns && customDomain && <DnsInstructions />}
    </div>
  );
}
