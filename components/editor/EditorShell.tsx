"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";
import { updateSiteContent, togglePublish } from "@/app/actions/sites";
import { SectionForm } from "@/components/editor/SectionForm";
import { SitePreview } from "@/components/editor/SitePreview";
import { Button } from "@/components/ui/button";
import {
  EDITOR_SECTION_LABELS,
  editorContentToSite,
  getEditorSections,
  siteContentToEditor,
  type EditorContent,
} from "@/lib/editor";
import type { SiteContent, TemplateDefinition } from "@/lib/templates";
import type { Site } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/utils/siteUrl";

const PREVIEW_SCALE = 0.65;
const PREVIEW_WIDTH = 1440;

interface EditorShellProps {
  site: Site;
  template: TemplateDefinition;
}

export function EditorShell({ site, template }: EditorShellProps) {
  const router = useRouter();
  const sections = useMemo(
    () => getEditorSections(template.sections),
    [template.sections]
  );

  const initialContent = useMemo(
    () => siteContentToEditor(site.content as unknown as SiteContent),
    [site.content]
  );

  const [content, setContent] = useState<EditorContent>(initialContent);
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isPublished, setIsPublished] = useState(site.is_published);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState(() =>
    JSON.stringify(editorContentToSite(initialContent))
  );

  const previewContent = useMemo(
    () => editorContentToSite(content),
    [content]
  );

  const hasUnsavedChanges =
    JSON.stringify(previewContent) !== lastSaved;

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    const siteContent = editorContentToSite(content);
    const result = await updateSiteContent(site.id, siteContent);
    setIsSaving(false);

    if (result.success) {
      setLastSaved(JSON.stringify(siteContent));
      toast.success("Değişiklikler kaydedildi");
      router.refresh();
    } else {
      toast.error(result.error ?? "Kayıt başarısız");
    }
  }, [content, site.id, router]);

  const handlePublish = useCallback(async () => {
    const newPublished = !isPublished;
    setIsPublishing(true);
    const result = await togglePublish(site.id, newPublished);
    setIsPublishing(false);

    if (result.success) {
      setIsPublished(newPublished);
      toast.success(
        newPublished ? "Site yayına alındı" : "Site yayından kaldırıldı"
      );
      router.refresh();
    } else {
      toast.error(result.error ?? "İşlem başarısız");
    }
  }, [isPublished, site.id, router]);

  const scaledHeight = PREVIEW_WIDTH * PREVIEW_SCALE * 2.5;

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex h-editor-topbar shrink-0 items-center justify-between border-b border-zinc-200 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-button text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <IconArrowLeft size={18} />
          </Link>
          <span className="truncate text-sm font-medium text-lyra-surface">
            {site.name}
          </span>
        </div>

        <nav className="flex max-w-xl flex-1 items-center justify-center gap-1 overflow-x-auto px-4">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={cn(
                "shrink-0 rounded-button px-3 py-1.5 text-xs font-medium transition-colors",
                activeSection === section
                  ? "bg-lyra-accent text-white"
                  : "text-lyra-text-secondary hover:bg-zinc-100 hover:text-lyra-surface"
              )}
            >
              {EDITOR_SECTION_LABELS[section] ?? section}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
          >
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
          <Button
            size="sm"
            variant={isPublished ? "outline" : "default"}
            onClick={handlePublish}
            disabled={isPublishing}
          >
            {isPublishing
              ? "İşleniyor..."
              : isPublished
                ? "Yayından Kaldır"
                : "Yayınla"}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div className="w-editor-panel shrink-0 overflow-y-auto border-r border-zinc-200 p-5">
          <h2 className="mb-4 text-sm font-medium text-lyra-surface">
            {EDITOR_SECTION_LABELS[activeSection]}
          </h2>
          <SectionForm
            activeSection={activeSection}
            content={content}
            onChange={setContent}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-zinc-100">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-2">
            <span className="text-xs font-medium text-lyra-text-secondary">
              Önizleme
            </span>
            <a
              href={getSiteUrl(site.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-lyra-text-secondary transition-colors hover:text-lyra-accent"
            >
              <IconExternalLink size={14} />
              Tam ekran
            </a>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div
              className="overflow-hidden"
              style={{
                width: PREVIEW_WIDTH * PREVIEW_SCALE,
                height: scaledHeight,
              }}
            >
              <div
                style={{
                  width: PREVIEW_WIDTH,
                  transform: `scale(${PREVIEW_SCALE})`,
                  transformOrigin: "top left",
                }}
              >
                <SitePreview
                  content={previewContent}
                  templateId={site.template_id}
                  sections={template.sections}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
