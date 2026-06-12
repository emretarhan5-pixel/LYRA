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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105"
      aria-label="WhatsApp ile yazın"
    >
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        WhatsApp ile Yaz
      </span>
      <IconBrandWhatsapp size={28} />
    </a>
  );
}
