import type { SiteContent } from "@/lib/templates";

interface AboutSectionProps {
  about: SiteContent["about"];
}

const stats = [
  { label: "10+ Yıl Deneyim" },
  { label: "500+ Hasta" },
  { label: "%98 Memnuniyet" },
];

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          {about.photoUrl ? (
            <img
              src={about.photoUrl}
              alt={about.title}
              className="w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-about-placeholder items-center justify-center rounded-2xl bg-gray-200">
              <span className="text-gray-400">Fotoğraf</span>
            </div>
          )}
        </div>

        <div>
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium"
            style={{
              color: "var(--site-accent)",
              backgroundColor: "color-mix(in srgb, var(--site-accent) 10%, white)",
            }}
          >
            Hakkımda
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            {about.title}
          </h2>
          <p className="mb-8 whitespace-pre-line text-base leading-relaxed text-gray-500">
            {about.body}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-white p-3 text-center"
              >
                <p
                  className="text-xs font-semibold sm:text-sm"
                  style={{ color: "var(--site-accent)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
