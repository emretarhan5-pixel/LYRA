import type { SiteContent } from "@/lib/templates";

export const EDITOR_SECTION_LABELS: Record<string, string> = {
  hero: "Ana Bölüm",
  about: "Hakkımda",
  services: "Hizmetler",
  contact: "İletişim",
  testimonials: "Yorumlar",
  appointment: "Randevu",
  meta: "Genel Ayarlar",
};

export const PRIMARY_COLOR_OPTIONS = [
  { value: "#0ea5e9", label: "Sky" },
  { value: "#6366f1", label: "Indigo" },
  { value: "#8b5cf6", label: "Violet" },
  { value: "#10b981", label: "Emerald" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#ef4444", label: "Red" },
] as const;

export interface EditorServiceItem {
  _id: string;
  name: string;
  description: string;
  price?: string;
}

export interface EditorTestimonialItem {
  _id: string;
  name: string;
  text: string;
  rating: number;
}

export interface EditorContent {
  hero: SiteContent["hero"];
  about: SiteContent["about"];
  services: {
    title: string;
    items: EditorServiceItem[];
  };
  contact: SiteContent["contact"];
  testimonials: {
    items: EditorTestimonialItem[];
  };
  appointment: SiteContent["appointment"];
  meta: SiteContent["meta"];
}

export function siteContentToEditor(content: SiteContent): EditorContent {
  return {
    ...content,
    services: {
      title: content.services.title,
      items: content.services.items.map((item) => ({
        _id: crypto.randomUUID(),
        name: item.name,
        description: item.description,
        price: item.price,
      })),
    },
    testimonials: {
      items: content.testimonials.items.map((item) => ({
        _id: crypto.randomUUID(),
        name: item.name,
        text: item.text,
        rating: item.rating,
      })),
    },
  };
}

function stripServiceId(item: EditorServiceItem) {
  return {
    name: item.name,
    description: item.description,
    price: item.price,
  };
}

function stripTestimonialId(item: EditorTestimonialItem) {
  return {
    name: item.name,
    text: item.text,
    rating: item.rating,
  };
}

export function editorContentToSite(content: EditorContent): SiteContent {
  return {
    ...content,
    services: {
      title: content.services.title,
      items: content.services.items.map(stripServiceId),
    },
    testimonials: {
      items: content.testimonials.items.map(stripTestimonialId),
    },
  };
}

export function getEditorSections(templateSections: string[]): string[] {
  const sections = [...templateSections];
  if (!sections.includes("meta")) {
    sections.push("meta");
  }
  return sections;
}
