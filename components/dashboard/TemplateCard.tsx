"use client";

import { SECTION_LABELS, type TemplateDefinition } from "@/lib/templates";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: TemplateDefinition;
  onSelect: (template: TemplateDefinition) => void;
}

function darkenHex(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const factor = 0.65;
  const dr = Math.round(r * factor);
  const dg = Math.round(g * factor);
  const db = Math.round(b * factor);
  return `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const gradient = `linear-gradient(135deg, ${template.accent}dd 0%, ${darkenHex(template.accent)} 100%)`;

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-card border border-zinc-200 bg-white transition-shadow hover:shadow-md"
      onClick={() => onSelect(template)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(template);
        }
      }}
    >
      <div
        className="flex h-template-preview flex-col items-center justify-center px-4"
        style={{ background: gradient }}
      >
        <h3 className="mb-3 text-center text-xl font-semibold text-white">
          {template.name}
        </h3>
        <div className="flex flex-wrap justify-center gap-1.5">
          {template.sections.map((section) => (
            <span
              key={section}
              className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white"
            >
              {SECTION_LABELS[section] ?? section}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="min-w-0 pr-4">
          <p className="text-[15px] font-medium text-lyra-surface">
            {template.name}
          </p>
          <p className="mt-0.5 text-[13px] text-lyra-text-secondary">
            {template.description}
          </p>
        </div>
        <button
          type="button"
          className={cn(
            "shrink-0 rounded-button border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-50"
          )}
          style={{
            borderColor: template.accent,
            color: template.accent,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
        >
          Seç
        </button>
      </div>
    </div>
  );
}
