"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { formatWhatsAppUrl } from "@/lib/utils/whatsapp";

interface SiteWhatsAppButtonProps {
  phone: string;
}

export function SiteWhatsAppButton({ phone }: SiteWhatsAppButtonProps) {
  if (!phone) return null;

  const href = formatWhatsAppUrl(phone);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <span className="absolute inset-0 animate-whatsapp-pulse rounded-full bg-[#25d366]" />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-200 ease-in-out hover:scale-110"
        style={{
          backgroundColor: "#25d366",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)",
        }}
        aria-label="WhatsApp ile yazın"
      >
        <IconBrandWhatsapp size={28} />
      </a>
    </div>
  );
}
