"use client";

import {
  IconPhone,
  IconBrandWhatsapp,
  IconMapPin,
  IconMail,
  IconClock,
} from "@tabler/icons-react";
import type { SiteContent } from "@/lib/templates";
import type { TemplateId } from "@/lib/types";

interface SitePreviewProps {
  content: SiteContent;
  templateId: TemplateId;
  sections: string[];
}

function PreviewHeader({
  logoText,
  primaryColor,
}: {
  logoText: string;
  primaryColor: string;
}) {
  const navLinks = ["Ana Sayfa", "Hizmetler", "Hakkımda", "İletişim"];

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-12 py-5">
      <span className="text-xl font-semibold" style={{ color: primaryColor }}>
        {logoText}
      </span>
      <nav className="flex gap-8">
        {navLinks.map((link) => (
          <span key={link} className="text-sm text-zinc-600">
            {link}
          </span>
        ))}
      </nav>
    </header>
  );
}

function PreviewHero({
  hero,
  primaryColor,
}: {
  hero: SiteContent["hero"];
  primaryColor: string;
}) {
  return (
    <section className="bg-zinc-50 px-12 py-20 text-center">
      <h1 className="mb-4 text-5xl font-bold text-zinc-900">
        {hero.headline || "Başlık"}
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600">
        {hero.subheadline || "Alt başlık"}
      </p>
      <button
        type="button"
        className="rounded-lg px-8 py-3 text-base font-medium text-white"
        style={{ backgroundColor: primaryColor }}
      >
        {hero.ctaText || "Randevu Al"}
      </button>
    </section>
  );
}

function PreviewAbout({
  about,
  primaryColor,
}: {
  about: SiteContent["about"];
  primaryColor: string;
}) {
  return (
    <section className="px-12 py-16">
      <div className="flex items-start gap-8">
        {about.photoUrl ? (
          <img
            src={about.photoUrl}
            alt=""
            className="h-32 w-32 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full text-3xl font-semibold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {(about.title || "A")[0]}
          </div>
        )}
        <div>
          <h2 className="mb-4 text-3xl font-bold text-zinc-900">
            {about.title || "Hakkımda"}
          </h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-zinc-600">
            {about.body || "Hakkımda metni"}
          </p>
        </div>
      </div>
    </section>
  );
}

function PreviewServices({
  services,
  primaryColor,
}: {
  services: SiteContent["services"];
  primaryColor: string;
}) {
  return (
    <section className="bg-zinc-50 px-12 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900">
        {services.title || "Hizmetler"}
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {services.items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-200 bg-white p-6"
          >
            <h3
              className="mb-2 text-lg font-semibold"
              style={{ color: primaryColor }}
            >
              {item.name || "Hizmet"}
            </h3>
            {item.description && (
              <p className="mb-3 text-sm text-zinc-600">{item.description}</p>
            )}
            {item.price && (
              <p className="text-sm font-medium text-zinc-900">{item.price}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function PreviewTestimonials({
  testimonials,
}: {
  testimonials: SiteContent["testimonials"];
}) {
  return (
    <section className="px-12 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900">
        Yorumlar
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {testimonials.items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-200 bg-white p-6"
          >
            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < item.rating ? "text-amber-400" : "text-zinc-200"}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mb-4 text-sm text-zinc-600">
              &ldquo;{item.text || "Yorum"}&rdquo;
            </p>
            <p className="text-sm font-medium text-zinc-900">
              {item.name || "İsim"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PreviewContact({ contact }: { contact: SiteContent["contact"] }) {
  const rows = [
    { icon: IconPhone, text: contact.phone },
    { icon: IconBrandWhatsapp, text: contact.whatsapp },
    { icon: IconMail, text: contact.email },
    { icon: IconMapPin, text: `${contact.address}, ${contact.city}` },
    { icon: IconClock, text: contact.workingHours },
  ];

  return (
    <section className="bg-zinc-50 px-12 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900">
        İletişim
      </h2>
      <div className="mx-auto max-w-lg space-y-4">
        {rows.map(
          (row, index) =>
            row.text && (
              <div key={index} className="flex items-center gap-4 text-zinc-700">
                <row.icon size={20} className="shrink-0 text-zinc-400" />
                <span className="text-base">{row.text}</span>
              </div>
            )
        )}
      </div>
    </section>
  );
}

function PreviewAppointment({
  appointment,
  primaryColor,
}: {
  appointment: SiteContent["appointment"];
  primaryColor: string;
}) {
  return (
    <section className="px-12 py-16">
      <div className="mx-auto max-w-lg rounded-xl border border-zinc-200 bg-white p-8">
        <h2 className="mb-2 text-2xl font-bold text-zinc-900">
          {appointment.title || "Randevu"}
        </h2>
        <p className="mb-6 text-sm text-zinc-600">
          {appointment.description || "Randevu formu açıklaması"}
        </p>
        <div className="space-y-4">
          <input
            disabled
            placeholder="Ad Soyad"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-400"
          />
          <input
            disabled
            placeholder="Telefon"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-400"
          />
          <textarea
            disabled
            placeholder="Mesajınız"
            rows={3}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-400"
          />
          <button
            type="button"
            disabled
            className="w-full rounded-lg py-3 text-sm font-medium text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Gönder
          </button>
        </div>
      </div>
    </section>
  );
}

export function SitePreview({ content, sections }: SitePreviewProps) {
  const primaryColor = content.meta.primaryColor || "#6366f1";

  const sectionComponents: Record<string, React.ReactNode> = {
    hero: (
      <PreviewHero key="hero" hero={content.hero} primaryColor={primaryColor} />
    ),
    about: (
      <PreviewAbout
        key="about"
        about={content.about}
        primaryColor={primaryColor}
      />
    ),
    services: (
      <PreviewServices
        key="services"
        services={content.services}
        primaryColor={primaryColor}
      />
    ),
    testimonials: (
      <PreviewTestimonials
        key="testimonials"
        testimonials={content.testimonials}
      />
    ),
    contact: <PreviewContact key="contact" contact={content.contact} />,
    appointment: (
      <PreviewAppointment
        key="appointment"
        appointment={content.appointment}
        primaryColor={primaryColor}
      />
    ),
  };

  return (
    <div className="bg-white">
      <PreviewHeader
        logoText={content.meta.logoText}
        primaryColor={primaryColor}
      />
      {sections
        .filter((s) => s !== "meta")
        .map((section) => sectionComponents[section])}
    </div>
  );
}
