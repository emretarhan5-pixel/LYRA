import {
  IconPhone,
  IconBrandWhatsapp,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";
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

  const contactRows = [
    contact.phone && {
      icon: IconPhone,
      label: contact.phone,
      href: phoneHref,
    },
    contact.whatsapp && {
      icon: IconBrandWhatsapp,
      label: "WhatsApp",
      href: whatsappHref,
    },
    (contact.address || contact.city) && {
      icon: IconMapPin,
      label: [contact.address, contact.city].filter(Boolean).join(", "),
    },
    contact.workingHours && {
      icon: IconClock,
      label: contact.workingHours,
    },
  ].filter(Boolean) as {
    icon: typeof IconPhone;
    label: string;
    href?: string;
  }[];

  return (
    <section
      id="appointment"
      className="scroll-mt-20 px-6 py-section-y"
      style={{ backgroundColor: "var(--site-accent)" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[2px] text-white/70">
            Randevu
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white">
            {appointment.title}
          </h2>
          <p className="mt-4 text-white/85">{appointment.description}</p>

          <div className="mt-8 space-y-4">
            {contactRows.map((row, index) => {
              const Icon = row.icon;
              const isExternal = row.href?.startsWith("http");
              const content = row.href ? (
                <a
                  href={row.href}
                  className="text-white hover:underline"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {row.label}
                </a>
              ) : (
                <span>{row.label}</span>
              );

              return (
                <div key={index} className="flex items-center gap-3 text-white">
                  <Icon size={20} className="shrink-0 text-white" />
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-[20px] bg-white p-8"
          style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
        >
          <AppointmentForm siteId={siteId} />
        </div>
      </div>
    </section>
  );
}
