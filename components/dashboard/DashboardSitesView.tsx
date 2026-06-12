"use client";

import { useState } from "react";
import Link from "next/link";
import { IconLayoutGrid } from "@tabler/icons-react";
import { SiteCard } from "@/components/dashboard/SiteCard";
import { CreateSiteModal } from "@/components/dashboard/CreateSiteModal";
import { Button } from "@/components/ui/button";
import type { Site } from "@/lib/types";

interface DashboardSitesViewProps {
  sites: Site[];
}

export function DashboardSitesView({ sites }: DashboardSitesViewProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-lyra-surface">Sitelerim</h1>
          <Button onClick={() => setModalOpen(true)}>+ Yeni site</Button>
        </div>

        {sites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <IconLayoutGrid
              size={48}
              stroke={1.5}
              className="mb-4 text-lyra-text-muted"
            />
            <h2 className="mb-2 text-lg font-medium text-lyra-surface">
              Henüz siteniz yok
            </h2>
            <p className="mb-6 max-w-sm text-sm text-lyra-text-secondary">
              İlk sitenizi oluşturmak için bir şablon seçin
            </p>
            <Button asChild>
              <Link href="/dashboard/templates">Şablonlara Göz At</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
