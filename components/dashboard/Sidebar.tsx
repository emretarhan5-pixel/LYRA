"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconLayoutGrid,
  IconTemplate,
  IconCreditCard,
  IconSettings2,
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
  { href: "/dashboard/settings", label: "Ayarlar", icon: IconSettings2 },
];

interface SidebarProps {
  profile: Profile | null;
}

function PlanBadge({ plan }: { plan: Profile["plan"] }) {
  const isPro = plan === "pro" || plan === "agency";

  return (
    <span
      className={cn(
        "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
        isPro ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-[#fafafa] text-[#94a3b8]"
      )}
    >
      {isPro ? "Pro" : "Free"}
    </span>
  );
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
    <aside className="sticky top-0 flex h-screen w-[220px] shrink-0 flex-col border-r border-[#f0f0f0] bg-white">
      <div className="shrink-0">
        <div className="px-4 pb-3 pt-5">
          <Link href="/dashboard" className="inline-flex items-center gap-2">
            <span className="text-base font-bold tracking-[-0.5px] text-[#0f172a]">
              lyra
            </span>
            <span className="rounded bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-medium text-[#64748b]">
              beta
            </span>
          </Link>
        </div>

        <div className="mb-2 px-4">
          <div className="flex items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-[#f8fafc]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-[11px] font-medium text-white">
              {getInitials(profile?.full_name)}
            </div>
            <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#0f172a]">
              {profile?.full_name ?? "Kullanıcı"}
            </p>
            <PlanBadge plan={profile?.plan ?? "free"} />
          </div>
        </div>

        <div className="mx-4 mb-2 h-px bg-[#f0f0f0]" />
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-1">
        <div className="flex flex-col py-0.5">
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
                  "flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[13px] transition-colors",
                  isActive
                    ? "bg-[#f8fafc] font-medium text-[#0f172a]"
                    : "font-[450] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                )}
              >
                <Icon
                  size={15}
                  stroke={1.75}
                  className={isActive ? "text-[#0f172a]" : "text-[#64748b]"}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto shrink-0 border-t border-[#f0f0f0] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-[7px] px-2.5 py-2 text-[13px] text-[#94a3b8] transition-colors hover:bg-[#f8fafc] hover:text-[#ef4444]"
        >
          <IconLogout size={15} stroke={1.75} />
          Çıkış
        </button>
      </div>
    </aside>
  );
}
