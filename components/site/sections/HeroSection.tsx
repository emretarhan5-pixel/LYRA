import type { SiteContent } from "@/lib/templates";

interface HeroSectionProps {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
  category: string;
}

const stats = [
  { value: "500+", label: "Mutlu Hasta" },
  { value: "10+", label: "Yıl Deneyim" },
  { value: "%98", label: "Memnuniyet" },
];

const features = [
  "Modern Ekipman",
  "Steril Ortam",
  "Deneyimli Ekip",
];

function TrustBadge() {
  return (
    <div
      className="absolute bottom-4 right-4 font-semibold text-slate-800"
      style={{
        background: "white",
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 13,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      🏆 Güvenilir Klinik
    </div>
  );
}

export function HeroSection({ hero, contact, category }: HeroSectionProps) {
  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/\s/g, "")}`
    : undefined;

  return (
    <section
      className="scroll-mt-20 px-6 py-section-y"
      style={{
        background:
          "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span
            className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              color: "var(--site-accent)",
              backgroundColor: "color-mix(in srgb, var(--site-accent) 10%, white)",
            }}
          >
            ✓ {category}
          </span>

          <h1
            className="mt-6 whitespace-pre-line font-extrabold text-slate-900"
            style={{
              fontSize: "clamp(36px, 5vw, 52px)",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            {hero.headline}
          </h1>

          <p
            className="mt-4 text-lg leading-relaxed text-slate-500"
            style={{ lineHeight: 1.7 }}
          >
            {hero.subheadline}
          </p>

          <div className="mt-6 flex items-center divide-x divide-slate-200">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 px-4 first:pl-0 last:pr-0">
                <p
                  className="text-2xl font-bold"
                  style={{ color: "var(--site-accent)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#appointment"
              className="inline-flex h-12 items-center justify-center rounded-[10px] px-8 text-base font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
              style={{ backgroundColor: "var(--site-accent)" }}
            >
              {hero.ctaText || "Randevu Al"}
            </a>
            {phoneHref && (
              <a
                href={phoneHref}
                className="inline-flex h-12 items-center justify-center rounded-[10px] border-[1.5px] bg-white px-8 text-base font-semibold transition-all duration-200 ease-in-out hover:bg-slate-50"
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

        {hero.heroImageUrl ? (
          <div
            className="relative"
            style={{
              borderRadius: 24,
              overflow: "hidden",
              height: 420,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={hero.heroImageUrl}
              alt="Klinik"
              className="h-full w-full object-cover"
            />
            <TrustBadge />
          </div>
        ) : (
          <div
            className="overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.12)" }}
          >
            <div
              className="relative flex h-[260px] items-center justify-center"
              style={{
                background: `linear-gradient(135deg, var(--site-accent), color-mix(in srgb, var(--site-accent) 70%, #000))`,
              }}
            >
              <span
                className="select-none text-white"
                style={{ fontSize: "80px", opacity: 0.3, fontWeight: 300 }}
              >
                +
              </span>
              <TrustBadge />
            </div>

            <div className="bg-white p-5">
              <p className="text-sm text-slate-700">
                Uzman Kadromuzla Yanınızdayız
              </p>
              <div className="mt-3 space-y-2">
                {features.map((feature) => (
                  <p key={feature} className="text-[13px] text-slate-600">
                    <span style={{ color: "var(--site-accent)" }}>✓ </span>
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
