import type { SiteContent } from "@/lib/templates";

interface HeroSectionProps {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
  category: string;
}

export function HeroSection({ hero, contact, category }: HeroSectionProps) {
  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/\s/g, "")}`
    : undefined;

  return (
    <section
      className="px-4 pb-20 pt-hero-top sm:px-6"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, var(--site-accent) 3%, white) 0%, white 100%)`,
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <span
          className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium"
          style={{
            color: "var(--site-accent)",
            backgroundColor: "color-mix(in srgb, var(--site-accent) 10%, white)",
          }}
        >
          {category}
        </span>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
          {hero.headline}
        </h1>

        <p className="mb-10 text-lg text-gray-500 sm:text-xl">
          {hero.subheadline}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#appointment"
            className="w-full rounded-lg px-8 py-3 text-center text-base font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: "var(--site-accent)" }}
          >
            {hero.ctaText || "Randevu Al"}
          </a>
          {phoneHref && (
            <a
              href={phoneHref}
              className="w-full rounded-lg border-2 px-8 py-3 text-center text-base font-medium transition-colors hover:bg-gray-50 sm:w-auto"
              style={{
                borderColor: "var(--site-accent)",
                color: "var(--site-accent)",
              }}
            >
              Bizi Ara
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
