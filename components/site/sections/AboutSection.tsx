import type { SiteContent } from "@/lib/templates";

interface AboutSectionProps {
  about: SiteContent["about"];
}

const stats = [
  { value: "500+", label: "Hasta" },
  { value: "10+", label: "Yıl" },
  { value: "%98", label: "Memnuniyet" },
];

export function AboutSection({ about }: AboutSectionProps) {
  const initial = (about.title || "A")[0].toUpperCase();

  return (
    <section className="scroll-mt-20 bg-white px-6 py-section-y">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[20px]">
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt={about.title}
                className="h-[400px] w-full object-cover"
              />
            ) : (
              <div
                className="flex h-[400px] items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, var(--site-accent) 20%, white), color-mix(in srgb, var(--site-accent) 5%, white))`,
                }}
              >
                <span
                  className="font-bold"
                  style={{ fontSize: "80px", color: "var(--site-accent)" }}
                >
                  {initial}
                </span>
              </div>
            )}
          </div>

          <div
            className="absolute -bottom-4 left-6 rounded-xl bg-white px-4 py-3"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
          >
            <p className="text-sm font-semibold text-slate-900">⭐ 4.9 / 5</p>
            <p className="text-[11px] text-gray-500">Google Yorumları</p>
          </div>
        </div>

        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[2px]"
            style={{ color: "var(--site-accent)" }}
          >
            Hakkımızda
          </p>
          <h2 className="mt-3 text-[32px] font-bold text-slate-900">
            {about.title}
          </h2>
          <p
            className="mt-4 whitespace-pre-line text-base text-slate-500"
            style={{ lineHeight: 1.8 }}
          >
            {about.body}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center"
              >
                <p
                  className="text-[28px] font-bold leading-none"
                  style={{ color: "var(--site-accent)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
