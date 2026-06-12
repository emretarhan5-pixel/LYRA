import type { SiteContent } from "@/lib/templates";

interface TestimonialsSectionProps {
  testimonials: SiteContent["testimonials"];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.items.length === 0) return null;

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
            Hasta Yorumları
          </p>
          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Hastalarımız Ne Diyor?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-7"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < item.rating ? "text-amber-400" : "text-gray-200"}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p
                className="relative text-base leading-relaxed text-slate-700"
                style={{ lineHeight: 1.7 }}
              >
                <span
                  className="absolute -left-1 -top-4 select-none font-serif leading-none"
                  style={{
                    color: "var(--site-accent)",
                    fontSize: "40px",
                    opacity: 0.3,
                  }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <span className="relative">{item.text}</span>
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-[15px] font-bold text-slate-900">
                  {item.name}
                </p>
                <p className="text-[13px] text-gray-400">Hasta</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
