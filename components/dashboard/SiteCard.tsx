"use client";

import Link from "next/link";
import {
  IconEdit,
  IconUsers,
  IconDotsVertical,
  IconChartBar,
  IconSettings,
  IconExternalLink,
  IconDental,
  IconBrain,
  IconStethoscope,
  IconSalad,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSiteHostname, getSiteUrl } from "@/lib/utils/siteUrl";
import { timeAgo } from "@/lib/utils/timeAgo";
import type { Site, TemplateId } from "@/lib/types";

const previewGradient: Record<TemplateId, string> = {
  dental: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
  psychologist: "linear-gradient(135deg, #faf5ff, #ede9fe)",
  clinic: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
  dietitian: "linear-gradient(135deg, #fffbeb, #fef3c7)",
};

const templateAccent: Record<TemplateId, string> = {
  dental: "#0ea5e9",
  psychologist: "#8b5cf6",
  clinic: "#10b981",
  dietitian: "#f59e0b",
};

const templateIcons: Record<
  TemplateId,
  React.ComponentType<{ size?: number; style?: React.CSSProperties; stroke?: number }>
> = {
  dental: IconDental,
  psychologist: IconBrain,
  clinic: IconStethoscope,
  dietitian: IconSalad,
};

function MockBrowserBar() {
  return (
    <div
      className="pointer-events-none absolute left-3 top-3 flex items-center gap-2"
      style={{ zIndex: 1 }}
    >
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
      </div>
      <div className="h-1.5 w-20 rounded-sm bg-[#e2e8f0]" />
    </div>
  );
}

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const gradient =
    previewGradient[site.template_id] ??
    "linear-gradient(135deg, #f8fafc, #f1f5f9)";
  const accentColor = templateAccent[site.template_id] ?? "#6366f1";
  const TemplateIcon = templateIcons[site.template_id] ?? IconStethoscope;
  const basePath = `/sites/${site.id}`;

  return (
    <div className="overflow-hidden rounded-xl border border-[#f0f0f0] bg-white transition-all duration-150 hover:border-[#e2e8f0] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <div
        className="relative h-[140px] overflow-hidden"
        style={{ background: gradient }}
      >
        <MockBrowserBar />

        <div className="pointer-events-none absolute bottom-3 right-4">
          <TemplateIcon
            size={36}
            stroke={1.5}
            style={{ color: accentColor, opacity: 0.4 }}
          />
        </div>

        <div className="absolute left-3 top-3 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-white/80 hover:text-[#64748b]"
                onClick={(e) => e.stopPropagation()}
              >
                <IconDotsVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
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

        <div className="absolute right-2.5 top-2.5 z-10">
          {site.is_published ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-[3px] text-[11px] font-medium text-[#16a34a]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
              </span>
              Yayında
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0f0f0] bg-[#fafafa] px-2 py-[3px] text-[11px] font-medium text-[#94a3b8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
              Taslak
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-3.5">
        <p className="truncate text-sm font-semibold text-[#0f172a]">{site.name}</p>
        <a
          href={getSiteUrl(site.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 block truncate font-mono text-xs text-[#94a3b8] transition-colors hover:text-[#6366f1]"
        >
          {getSiteHostname(site.slug)}
        </a>

        <div className="mt-2.5 flex items-center justify-between border-t border-[#f8fafc] pt-2.5">
          <span className="text-xs text-[#94a3b8]">
            {timeAgo(site.updated_at)}
          </span>

          <div className="flex items-center gap-1.5">
            <Link
              href={`${basePath}/editor`}
              className="flex h-6 w-6 items-center justify-center rounded-md border border-[#f0f0f0] bg-white text-[#64748b] transition-colors hover:bg-[#f8fafc]"
              title="Düzenle"
            >
              <IconEdit size={16} stroke={1.5} />
            </Link>
            <Link
              href={`${basePath}/crm`}
              className="flex h-6 w-6 items-center justify-center rounded-md border border-[#f0f0f0] bg-white text-[#64748b] transition-colors hover:bg-[#f8fafc]"
              title="CRM"
            >
              <IconUsers size={16} stroke={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
