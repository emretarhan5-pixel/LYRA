"use client";

import { IconTrash, IconStar, IconStarFilled } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  PRIMARY_COLOR_OPTIONS,
  type EditorContent,
  type EditorServiceItem,
  type EditorTestimonialItem,
} from "@/lib/editor";
import { cn } from "@/lib/utils";

interface SectionFormProps {
  activeSection: string;
  content: EditorContent;
  onChange: (content: EditorContent) => void;
}

export function SectionForm({
  activeSection,
  content,
  onChange,
}: SectionFormProps) {
  function updateHero(field: keyof EditorContent["hero"], value: string) {
    onChange({ ...content, hero: { ...content.hero, [field]: value } });
  }

  function updateAbout(
    field: keyof EditorContent["about"],
    value: string | null
  ) {
    onChange({ ...content, about: { ...content.about, [field]: value } });
  }

  function updateServices(
    field: "title",
    value: string
  ) {
    onChange({
      ...content,
      services: { ...content.services, [field]: value },
    });
  }

  function updateServiceItem(
    id: string,
    field: keyof Omit<EditorServiceItem, "_id">,
    value: string
  ) {
    onChange({
      ...content,
      services: {
        ...content.services,
        items: content.services.items.map((item) =>
          item._id === id ? { ...item, [field]: value } : item
        ),
      },
    });
  }

  function addService() {
    if (content.services.items.length >= 10) return;
    onChange({
      ...content,
      services: {
        ...content.services,
        items: [
          ...content.services.items,
          {
            _id: crypto.randomUUID(),
            name: "",
            description: "",
            price: "",
          },
        ],
      },
    });
  }

  function removeService(id: string) {
    onChange({
      ...content,
      services: {
        ...content.services,
        items: content.services.items.filter((item) => item._id !== id),
      },
    });
  }

  function updateContact(
    field: keyof EditorContent["contact"],
    value: string | null
  ) {
    onChange({
      ...content,
      contact: { ...content.contact, [field]: value },
    });
  }

  function updateTestimonialItem(
    id: string,
    field: keyof Omit<EditorTestimonialItem, "_id">,
    value: string | number
  ) {
    onChange({
      ...content,
      testimonials: {
        items: content.testimonials.items.map((item) =>
          item._id === id ? { ...item, [field]: value } : item
        ),
      },
    });
  }

  function addTestimonial() {
    if (content.testimonials.items.length >= 5) return;
    onChange({
      ...content,
      testimonials: {
        items: [
          ...content.testimonials.items,
          {
            _id: crypto.randomUUID(),
            name: "",
            text: "",
            rating: 5,
          },
        ],
      },
    });
  }

  function removeTestimonial(id: string) {
    onChange({
      ...content,
      testimonials: {
        items: content.testimonials.items.filter((item) => item._id !== id),
      },
    });
  }

  function updateAppointment(
    field: keyof EditorContent["appointment"],
    value: string
  ) {
    onChange({
      ...content,
      appointment: { ...content.appointment, [field]: value },
    });
  }

  function updateMeta(field: keyof EditorContent["meta"], value: string) {
    onChange({
      ...content,
      meta: { ...content.meta, [field]: value },
    });
  }

  switch (activeSection) {
    case "hero":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="headline">Başlık</Label>
              <span className="text-xs text-lyra-text-secondary">
                {content.hero.headline.length}/60
              </span>
            </div>
            <Input
              id="headline"
              maxLength={60}
              value={content.hero.headline}
              onChange={(e) => updateHero("headline", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="subheadline">Alt başlık</Label>
              <span className="text-xs text-lyra-text-secondary">
                {content.hero.subheadline.length}/160
              </span>
            </div>
            <Textarea
              id="subheadline"
              maxLength={160}
              rows={3}
              value={content.hero.subheadline}
              onChange={(e) => updateHero("subheadline", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaText">Buton metni</Label>
            <Input
              id="ctaText"
              placeholder="Randevu Al"
              value={content.hero.ctaText}
              onChange={(e) => updateHero("ctaText", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaPhone">WhatsApp numarası</Label>
            <Input
              id="ctaPhone"
              placeholder="05xx xxx xx xx"
              value={content.hero.ctaPhone}
              onChange={(e) => updateHero("ctaPhone", e.target.value)}
            />
          </div>
        </div>
      );

    case "about":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutTitle">Başlık</Label>
            <Input
              id="aboutTitle"
              value={content.about.title}
              onChange={(e) => updateAbout("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutBody">Metin</Label>
            <Textarea
              id="aboutBody"
              rows={4}
              value={content.about.body}
              onChange={(e) => updateAbout("body", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoUrl">Fotoğraf URL (opsiyonel)</Label>
            <Input
              id="photoUrl"
              placeholder="https://..."
              value={content.about.photoUrl ?? ""}
              onChange={(e) =>
                updateAbout("photoUrl", e.target.value || null)
              }
            />
            {content.about.photoUrl && (
              <img
                src={content.about.photoUrl}
                alt="Önizleme"
                className="size-avatar-preview rounded-full object-cover"
              />
            )}
          </div>
        </div>
      );

    case "services":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="servicesTitle">Bölüm başlığı</Label>
            <Input
              id="servicesTitle"
              value={content.services.title}
              onChange={(e) => updateServices("title", e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Hizmetler</Label>
            {content.services.items.map((item) => (
              <div key={item._id} className="flex items-center gap-2">
                <Input
                  className="flex-1"
                  placeholder="Hizmet adı"
                  value={item.name}
                  onChange={(e) =>
                    updateServiceItem(item._id, "name", e.target.value)
                  }
                />
                <Input
                  className="w-24"
                  placeholder="₺500"
                  value={item.price ?? ""}
                  onChange={(e) =>
                    updateServiceItem(item._id, "price", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeService(item._id)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-button text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            ))}
          </div>

          {content.services.items.length < 10 && (
            <Button type="button" variant="outline" size="sm" onClick={addService}>
              + Hizmet Ekle
            </Button>
          )}
        </div>
      );

    case "contact":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={content.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={content.contact.whatsapp}
              onChange={(e) => updateContact("whatsapp", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              value={content.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              rows={2}
              value={content.contact.address}
              onChange={(e) => updateContact("address", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Şehir</Label>
            <Input
              id="city"
              value={content.contact.city}
              onChange={(e) => updateContact("city", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workingHours">Çalışma saatleri</Label>
            <Input
              id="workingHours"
              placeholder="Pzt-Cum 09:00-18:00"
              value={content.contact.workingHours}
              onChange={(e) => updateContact("workingHours", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapEmbedUrl">Google Maps embed URL (opsiyonel)</Label>
            <Input
              id="mapEmbedUrl"
              placeholder="https://maps.google.com/..."
              value={content.contact.mapEmbedUrl ?? ""}
              onChange={(e) =>
                updateContact("mapEmbedUrl", e.target.value || null)
              }
            />
          </div>
        </div>
      );

    case "testimonials":
      return (
        <div className="space-y-4">
          {content.testimonials.items.map((item) => (
            <div
              key={item._id}
              className="space-y-3 rounded-card border border-zinc-200 p-4"
            >
              <div className="flex items-center justify-between">
                <Label>Yorum</Label>
                <button
                  type="button"
                  onClick={() => removeTestimonial(item._id)}
                  className="text-zinc-400 transition-colors hover:text-red-500"
                >
                  <IconTrash size={16} />
                </button>
              </div>

              <Input
                placeholder="Ad Soyad"
                value={item.name}
                onChange={(e) =>
                  updateTestimonialItem(item._id, "name", e.target.value)
                }
              />

              <Textarea
                rows={2}
                placeholder="Yorum metni"
                value={item.text}
                onChange={(e) =>
                  updateTestimonialItem(item._id, "text", e.target.value)
                }
              />

              <div className="flex items-center gap-1">
                <span className="mr-2 text-xs text-lyra-text-secondary">
                  Puan:
                </span>
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = i + 1;
                  const filled = rating <= item.rating;
                  const Star = filled ? IconStarFilled : IconStar;
                  return (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        updateTestimonialItem(item._id, "rating", rating)
                      }
                      className={cn(
                        "transition-colors",
                        filled ? "text-amber-400" : "text-zinc-300"
                      )}
                    >
                      <Star size={20} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {content.testimonials.items.length < 5 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTestimonial}
            >
              + Yorum Ekle
            </Button>
          )}
        </div>
      );

    case "appointment":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointmentTitle">Başlık</Label>
            <Input
              id="appointmentTitle"
              value={content.appointment.title}
              onChange={(e) => updateAppointment("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentDesc">Açıklama</Label>
            <Textarea
              id="appointmentDesc"
              rows={2}
              value={content.appointment.description}
              onChange={(e) => updateAppointment("description", e.target.value)}
            />
          </div>

          <p className="text-xs text-lyra-text-secondary">
            Form alanları şablonda otomatik gelir; burada yalnızca başlık ve
            açıklama özelleştirilir.
          </p>
        </div>
      );

    case "meta":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site adı</Label>
            <Input
              id="siteName"
              value={content.meta.siteName}
              onChange={(e) => updateMeta("siteName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Slogan</Label>
            <Input
              id="tagline"
              value={content.meta.tagline}
              onChange={(e) => updateMeta("tagline", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoText">Logo metni</Label>
            <Input
              id="logoText"
              value={content.meta.logoText}
              onChange={(e) => updateMeta("logoText", e.target.value)}
            />
            <p className="text-xs text-lyra-text-secondary">
              Bu metin sitenin header&apos;ında görünür.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Ana renk</Label>
            <div className="grid grid-cols-6 gap-2">
              {PRIMARY_COLOR_OPTIONS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => updateMeta("primaryColor", color.value)}
                  className={cn(
                    "h-9 w-9 rounded-full transition-all",
                    content.meta.primaryColor === color.value &&
                      "ring-2 ring-offset-2 ring-lyra-surface"
                  )}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
