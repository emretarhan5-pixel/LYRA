import { IconPhone, IconBrandWhatsapp, IconMapPin, IconClock } from "@tabler/icons-react";
import type { SiteContent } from "@/lib/templates";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { formatWhatsAppUrl } from "@/lib/utils/whatsapp";

interface AppointmentSectionProps {
  siteId: string;
  appointment: SiteContent["appointment"];
  contact: SiteContent["contact"];
}

export function AppointmentSection({
  siteId,
  appointment,
  contact,
}: AppointmentSectionProps) {
  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/\s/g, "")}`
    : undefined;
  const whatsappHref = contact.whatsapp
    ? formatWhatsAppUrl(contact.whatsapp)
    : undefined;

  return (
    <section
      id="appointment"
      className="px-4 py-20 sm:px-6"
      style={{
        background: `color-mix(in srgb, var(--site-accent) 3%, white)`,
      }}
    >
      <div className="mx-auto grid max-w-site grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            {appointment.title}
          </h2>
          <p className="mb-8 text-gray-500">{appointment.description}</p>

          <div className="space-y-4">
            {contact.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <IconPhone size={20} style={{ color: "var(--site-accent)" }} />
                {phoneHref ? (
                  <a href={phoneHref} className="hover:underline">
                    {contact.phone}
                  </a>
                ) : (
                  <span>{contact.phone}</span>
                )}
              </div>
            )}

            {contact.whatsapp && (
              <div className="flex items-center gap-3 text-gray-700">
                <IconBrandWhatsapp size={20} className="text-green-500" />
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    WhatsApp ile yazın
                  </a>
                ) : (
                  <span>{contact.whatsapp}</span>
                )}
              </div>
            )}

            {(contact.address || contact.city) && (
              <div className="flex items-center gap-3 text-gray-700">
                <IconMapPin size={20} style={{ color: "var(--site-accent)" }} />
                <span>
                  {contact.address}
                  {contact.city ? `, ${contact.city}` : ""}
                </span>
              </div>
            )}

            {contact.workingHours && (
              <div className="flex items-center gap-3 text-gray-700">
                <IconClock size={20} style={{ color: "var(--site-accent)" }} />
                <span>{contact.workingHours}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <AppointmentForm siteId={siteId} />
        </div>
      </div>
    </section>
  );
}
