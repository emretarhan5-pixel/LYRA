"use client";

import { useState } from "react";
import { TEMPLATES, type TemplateDefinition } from "@/lib/templates";
import { TemplateCard } from "@/components/dashboard/TemplateCard";
import { CreateSiteModal } from "@/components/dashboard/CreateSiteModal";
import type { TemplateId } from "@/lib/types";

export function TemplateGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<
    TemplateId | undefined
  >();

  function handleSelect(template: TemplateDefinition) {
    setSelectedTemplateId(template.id);
    setModalOpen(true);
  }

  function handleModalChange(open: boolean) {
    setModalOpen(open);
    if (!open) {
      setSelectedTemplateId(undefined);
    }
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-lyra-surface">
            Şablon Seç
          </h1>
          <p className="mt-1 text-sm text-lyra-text-secondary">
            Siteniz için en uygun şablonu seçin. Tüm içerikleri daha sonra
            düzenleyebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <CreateSiteModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        initialTemplateId={selectedTemplateId}
      />
    </>
  );
}
