"use client";

import { Separator } from "@/components/ui/separator";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { DomainSettings } from "@/components/settings/DomainSettings";
import { DangerZone } from "@/components/settings/DangerZone";
import type { Plan, Site } from "@/lib/types";

interface SiteSettingsShellProps {
  site: Site;
  plan: Plan;
}

export function SiteSettingsShell({ site, plan }: SiteSettingsShellProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-lyra-surface">
          Site Ayarları
        </h1>
        <p className="text-sm text-lyra-text-secondary">{site.name}</p>
      </div>

      <div className="mx-auto max-w-2xl space-y-8">
        <GeneralSettings
          siteId={site.id}
          initialName={site.name}
          initialSlug={site.slug}
        />

        <Separator />

        <DomainSettings
          siteId={site.id}
          customDomain={site.custom_domain}
          plan={plan}
        />

        <Separator />

        <DangerZone siteId={site.id} siteName={site.name} />
      </div>
    </div>
  );
}
