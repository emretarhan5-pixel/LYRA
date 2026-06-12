import type { SiteContent } from "@/lib/templates";

interface TestimonialsSectionProps {
  testimonials: SiteContent["testimonials"];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.items.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-site">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Hastalarımız Ne Diyor?
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 p-6"
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
              <p className="mb-4 text-sm italic text-gray-700">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="text-sm font-bold text-gray-900">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
