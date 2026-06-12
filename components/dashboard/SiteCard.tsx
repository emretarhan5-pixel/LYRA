"use client";

import Link from "next/link";
import {
  IconDental,
  IconBrain,
  IconBuildingHospital,
  IconApple,
  IconEdit,
  IconUsers,
  IconDotsVertical,
  IconChartBar,
  IconSettings,
  IconExternalLink,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSiteHostname, getSiteUrl } from "@/lib/utils/siteUrl";
import type { Site, TemplateId } from "@/lib/types";

const templateIcons: Record<
  TemplateId,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  dental: IconDental,
  psychologist: IconBrain,
  clinic: IconBuildingHospital,
  dietitian: IconApple,
};

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const TemplateIcon = templateIcons[site.template_id] ?? IconBuildingHospital;
  const basePath = `/sites/${site.id}`;

  return (
    <div className="overflow-hidden rounded-card border border-zinc-200 bg-white">
      <div className="relative flex h-site-preview items-center justify-center bg-zinc-100">
        <TemplateIcon size={48} className="text-lyra-text-muted" />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <Badge variant={site.is_published ? "published" : "draft"}>
            {site.is_published ? "Yayında" : "Taslak"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <IconDotsVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`${basePath}/editor`}>
                  <IconEdit size={16} className="mr-2" />
                  Düzenle
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${basePath}/crm`}>
                  <IconUsers size={16} className="mr-2" />
                  Hasta Adayları
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${basePath}/analytics`}>
                  <IconChartBar size={16} className="mr-2" />
                  Analitik
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${basePath}/settings`}>
                  <IconSettings size={16} className="mr-2" />
                  Ayarlar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a
                  href={getSiteUrl(site.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconExternalLink size={16} className="mr-2" />
                  Siteyi Görüntüle
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-lyra-surface">
            {site.name}
          </p>
          <a
            href={getSiteUrl(site.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-lyra-text-secondary hover:text-lyra-accent"
          >
            {getSiteHostname(site.slug)}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`${basePath}/pages`}
            className="flex h-8 w-8 items-center justify-center rounded-button border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            title="Düzenle"
          >
            <IconEdit size={16} stroke={1.5} />
          </Link>
          <Link
            href={`${basePath}/crm`}
            className="flex h-8 w-8 items-center justify-center rounded-button border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            title="CRM"
          >
            <IconUsers size={16} stroke={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
