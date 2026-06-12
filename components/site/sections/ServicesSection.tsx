import type { SiteContent } from "@/lib/templates";

interface ServicesSectionProps {
  services: SiteContent["services"];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      className="scroll-mt-20 px-6 py-section-y"
      style={{ backgroundColor: "#f8faff" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p
            className="text-[10px] font-semibold uppercase tracking-[2px]"
            style={{ color: "var(--site-accent)" }}
          >
            Hizmetlerimiz
          </p>
          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {services.title}
          </h2>
          <div
            className="mx-auto mt-3 h-[3px] w-10 rounded-sm"
            style={{ backgroundColor: "var(--site-accent)" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[var(--site-accent)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--site-accent) 10%, white)",
                }}
              >
                <span style={{ fontSize: 28 }}>
                  {item.icon || (item.name || "H")[0].toUpperCase()}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {item.name}
              </h3>

              {item.description && (
                <p className="mt-1 text-sm text-slate-500">{item.description}</p>
              )}

              {item.price ? (
                <p
                  className="mt-2 text-lg font-bold"
                  style={{ color: "var(--site-accent)" }}
                >
                  {item.price}
                </p>
              ) : (
                <p className="mt-2 text-[13px] text-gray-400">
                  Fiyat için arayın
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
