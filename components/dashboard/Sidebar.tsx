"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconLayoutGrid,
  IconTemplate,
  IconCreditCard,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Sitelerim", icon: IconLayoutGrid },
  { href: "/dashboard/templates", label: "Şablonlar", icon: IconTemplate },
  { href: "/dashboard/billing", label: "Abonelik", icon: IconCreditCard },
  { href: "/dashboard/settings", label: "Ayarlar", icon: IconSettings },
];

interface SidebarProps {
  profile: Profile | null;
}

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-lyra-bg">
      <div className="px-5 py-6">
        <Link href="/dashboard" className="text-lg italic text-lyra-accent">
          lyra
        </Link>
      </div>

      <div className="flex items-center gap-3 px-5 pb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lyra-surface text-sm font-medium text-lyra-text-primary">
          {getInitials(profile?.full_name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-lyra-text-primary">
            {profile?.full_name ?? "Kullanıcı"}
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-button px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-white/8 text-lyra-text-primary"
                  : "text-lyra-text-secondary hover:bg-white/5 hover:text-lyra-text-primary"
              )}
            >
              <Icon size={18} stroke={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-button px-3 py-2 text-sm text-lyra-text-secondary transition-colors hover:bg-white/5 hover:text-lyra-text-primary"
        >
          <IconLogout size={18} stroke={1.5} />
          Çıkış
        </button>
      </div>
    </aside>
  );
}
