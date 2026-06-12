import { IconPhone, IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import type { SiteContent } from "@/lib/templates";
import { formatWhatsAppUrl } from "@/lib/utils/whatsapp";

interface ContactSectionProps {
  contact: SiteContent["contact"];
}

export function ContactSection({ contact }: ContactSectionProps) {
  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/\s/g, "")}`
    : undefined;
  const whatsappHref = contact.whatsapp
    ? formatWhatsAppUrl(contact.whatsapp)
    : undefined;

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center">
            <IconPhone
              size={32}
              className="mx-auto mb-4"
              style={{ color: "var(--site-accent)" }}
            />
            <h3 className="mb-2 font-bold text-gray-900">Telefon</h3>
            {phoneHref ? (
              <a
                href={phoneHref}
                className="text-gray-600 hover:underline"
              >
                {contact.phone}
              </a>
            ) : (
              <p className="text-gray-600">{contact.phone}</p>
            )}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center">
            <IconBrandWhatsapp
              size={32}
              className="mx-auto mb-4 text-green-500"
            />
            <h3 className="mb-2 font-bold text-gray-900">WhatsApp</h3>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                {contact.whatsapp}
              </a>
            ) : (
              <p className="text-gray-600">{contact.whatsapp}</p>
            )}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center">
            <IconMapPin
              size={32}
              className="mx-auto mb-4"
              style={{ color: "var(--site-accent)" }}
            />
            <h3 className="mb-2 font-bold text-gray-900">Adres</h3>
            <p className="text-gray-600">
              {contact.address}
              {contact.city ? `, ${contact.city}` : ""}
            </p>
          </div>
        </div>

        {contact.mapEmbedUrl && (
          <div className="mt-8 overflow-hidden rounded-xl">
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
