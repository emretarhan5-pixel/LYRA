"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrowLeft,
  IconEdit,
  IconFiles,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconExternalLink,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { getSiteHostname, getSiteUrl } from "@/lib/utils/siteUrl";
import type { Site } from "@/lib/types";

const navItems = [
  { href: "editor", label: "Editör", icon: IconEdit },
  { href: "pages", label: "Sayfalar", icon: IconFiles },
  { href: "crm", label: "Hasta Adayları", icon: IconUsers },
  { href: "analytics", label: "Analitik", icon: IconChartBar },
  { href: "settings", label: "Ayarlar", icon: IconSettings },
];

interface SiteSidebarProps {
  site: Pick<Site, "id" | "name" | "slug" | "is_published">;
}

export function SiteSidebar({ site }: SiteSidebarProps) {
  const pathname = usePathname();
  const basePath = `/sites/${site.id}`;

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-lyra-bg">
      <div className="border-b border-sidebar-border px-4 py-4">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-2 text-sm text-lyra-text-secondary transition-colors hover:text-lyra-text-primary"
        >
          <IconArrowLeft size={16} stroke={1.5} />
          Dashboard&apos;a Dön
        </Link>
        <p className="truncate text-sm font-medium text-lyra-text-primary">
          {site.name}
        </p>
        <p className="truncate text-xs text-lyra-text-secondary">
          {getSiteHostname(site.slug)}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const href = `${basePath}/${item.href}`;
          const isActive = pathname.startsWith(href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-button px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-lyra-accent text-white"
                  : "text-lyra-text-secondary hover:bg-white/5 hover:text-lyra-text-primary"
              )}
            >
              <Icon size={18} stroke={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              site.is_published ? "bg-green-500" : "bg-yellow-500"
            )}
          />
          <span className="text-xs text-lyra-text-secondary">
            {site.is_published ? "Yayında" : "Taslak"}
          </span>
        </div>
        <a
          href={getSiteUrl(site.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-lyra-accent transition-colors hover:text-indigo-400"
        >
          <IconExternalLink size={14} stroke={1.5} />
          Siteyi Görüntüle
        </a>
      </div>
    </aside>
  );
}
