import type { SiteContent } from "@/lib/templates";

interface ServicesSectionProps {
  services: SiteContent["services"];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-site">
        <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
          {services.title}
        </h2>
        <p className="mb-12 text-center text-gray-500">
          Sunduğumuz hizmetler
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 p-6 transition-colors hover:border-[var(--site-accent)]"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: "var(--site-accent)" }}
              >
                {(item.name || "H")[0].toUpperCase()}
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900">
                {item.name}
              </h3>
              {item.description && (
                <p className="mb-3 text-sm text-gray-500">{item.description}</p>
              )}
              {item.price && (
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--site-accent)" }}
                >
                  {item.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
