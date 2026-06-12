"use client";

import Link from "next/link";
import {
  IconEdit,
  IconUsers,
  IconDotsVertical,
  IconChartBar,
  IconSettings,
  IconExternalLink,
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

const previewBg: Record<TemplateId, string> = {
  dental: "#f0f9ff",
  psychologist: "#faf5ff",
  clinic: "#f0fdf4",
  dietitian: "#fffbeb",
};

const templateAccent: Record<TemplateId, string> = {
  dental: "#0ea5e9",
  psychologist: "#8b5cf6",
  clinic: "#10b981",
  dietitian: "#f59e0b",
};

function MiniSitePreview({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-0"
      style={{
        transform: "scale(0.55)",
        transformOrigin: "top left",
        width: "calc(100% / 0.55)",
        background: "white",
        borderRadius: 8,
        padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            width: 60,
            height: 8,
            background: accentColor,
            borderRadius: 4,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            width: 48,
            height: 22,
            background: accentColor,
            borderRadius: 5,
            opacity: 0.9,
          }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            width: "75%",
            height: 10,
            background: "#0f172a",
            borderRadius: 3,
            marginBottom: 6,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            width: "55%",
            height: 10,
            background: "#0f172a",
            borderRadius: 3,
            marginBottom: 10,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            width: "90%",
            height: 6,
            background: "#94a3b8",
            borderRadius: 2,
            marginBottom: 4,
          }}
        />
        <div
          style={{
            width: "70%",
            height: 6,
            background: "#94a3b8",
            borderRadius: 2,
            marginBottom: 14,
          }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 64,
              height: 20,
              background: accentColor,
              borderRadius: 5,
            }}
          />
          <div
            style={{
              width: 52,
              height: 20,
              background: "transparent",
              border: `1.5px solid ${accentColor}`,
              borderRadius: 5,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 36,
              background: "#f8fafc",
              borderRadius: 5,
              border: "1px solid #f0f0f0",
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const bgColor = previewBg[site.template_id] ?? "#f8fafc";
  const accentColor = templateAccent[site.template_id] ?? "#6366f1";
  const basePath = `/sites/${site.id}`;

  return (
    <div className="overflow-hidden rounded-xl border border-[#f0f0f0] bg-white transition-all duration-150 hover:border-[#e2e8f0] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <div
        className="relative h-[160px] overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <MiniSitePreview accentColor={accentColor} />

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
