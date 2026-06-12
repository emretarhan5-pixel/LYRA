import type { SiteContent } from "@/lib/templates";

interface SiteFooterProps {
  siteName: string;
  logoText: string;
  tagline?: string;
  contact?: SiteContent["contact"];
}

export function SiteFooter({
  siteName,
  logoText,
  tagline,
  contact,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <p className="text-xl font-bold text-white">{logoText}</p>
            {tagline && (
              <p className="mt-2 text-sm text-gray-400">{tagline}</p>
            )}
          </div>

          {contact && (
            <div className="text-sm text-gray-400">
              {contact.phone && <p>📞 {contact.phone}</p>}
              {(contact.address || contact.city) && (
                <p className="mt-1">
                  📍 {[contact.address, contact.city].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-gray-500">
            © {year} {siteName}. Tüm hakları saklıdır.
          </p>
          <a
            href="https://lyra.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 transition-colors duration-200 hover:text-gray-400"
          >
            Lyra ile oluşturuldu
          </a>
        </div>
      </div>
    </footer>
  );
}
