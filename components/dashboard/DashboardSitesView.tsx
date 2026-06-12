"use client";

import { useState } from "react";
import { SiteCard } from "@/components/dashboard/SiteCard";
import { CreateSiteModal } from "@/components/dashboard/CreateSiteModal";
import type { Site } from "@/lib/types";

interface DashboardSitesViewProps {
  sites: Site[];
}

export function DashboardSitesView({ sites }: DashboardSitesViewProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="px-8 py-7">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#0f172a]">Sitelerim</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-[#0f172a] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1e293b]"
          >
            + Yeni site
          </button>
        </div>

        {sites.length === 0 ? (
          <div className="mx-auto flex flex-col items-center py-20 text-center">
            <span className="text-5xl">🌐</span>
            <h2 className="mt-5 text-lg font-semibold text-[#0f172a]">
              Henüz siteniz yok
            </h2>
            <p className="mt-2 text-sm text-[#94a3b8]">
              İlk sitenizi oluşturmak 5 dakika sürer.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e293b]"
            >
              + İlk siteyi oluştur
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}
      </div>

      <CreateSiteModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
