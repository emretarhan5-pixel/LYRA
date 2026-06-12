import { IconPhone, IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import type { SiteContent } from "@/lib/templates";
import { formatWhatsAppUrl } from "@/lib/utils/whatsapp";

interface ContactSectionProps {
  contact: SiteContent["contact"];
}

const cards = [
  { key: "phone", title: "Telefon", icon: IconPhone, accentIcon: true },
  { key: "whatsapp", title: "WhatsApp", icon: IconBrandWhatsapp, accentIcon: false },
  { key: "address", title: "Adres", icon: IconMapPin, accentIcon: true },
] as const;

export function ContactSection({ contact }: ContactSectionProps) {
  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/\s/g, "")}`
    : undefined;
  const whatsappHref = contact.whatsapp
    ? formatWhatsAppUrl(contact.whatsapp)
    : undefined;

  const values: Record<string, { text: string; href?: string }> = {
    phone: { text: contact.phone, href: phoneHref },
    whatsapp: { text: contact.whatsapp, href: whatsappHref },
    address: {
      text: [contact.address, contact.city].filter(Boolean).join(", "),
    },
  };

  return (
    <section className="scroll-mt-20 bg-white px-6 py-section-y">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const value = values[card.key];

            return (
              <div
                key={card.key}
                className="rounded-2xl border border-slate-200 p-7 text-center transition-all duration-200 ease-in-out hover:border-[var(--site-accent)]"
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[14px]"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--site-accent) 10%, white)",
                  }}
                >
                  <Icon
                    size={24}
                    className={
                      card.key === "whatsapp" ? "text-green-500" : undefined
                    }
                    style={
                      card.accentIcon
                        ? { color: "var(--site-accent)" }
                        : undefined
                    }
                  />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {card.title}
                </h3>
                {value.href ? (
                  <a
                    href={value.href}
                    target={card.key === "whatsapp" ? "_blank" : undefined}
                    rel={
                      card.key === "whatsapp" ? "noopener noreferrer" : undefined
                    }
                    className="mt-2 inline-block text-[15px] text-slate-500 transition-colors duration-200 hover:text-[var(--site-accent)]"
                  >
                    {value.text}
                  </a>
                ) : (
                  <p className="mt-2 text-[15px] text-slate-500">{value.text}</p>
                )}
              </div>
            );
          })}
        </div>

        {contact.mapEmbedUrl && (
          <div className="mt-10 overflow-hidden rounded-2xl">
            <iframe
              src={contact.mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Konum haritası"
            />
          </div>
        )}
      </div>
    </section>
  );
}
