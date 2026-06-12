interface SiteHeaderProps {
  logoText: string;
  ctaText: string;
  phone?: string;
}

export function SiteHeader({ logoText, ctaText, phone }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 scroll-mt-20 bg-white"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <span
          className="text-xl font-bold"
          style={{ color: "var(--site-accent)" }}
        >
          {logoText}
        </span>

        <div className="flex items-center gap-4">
          {phone && (
            <span className="hidden text-sm text-gray-600 sm:inline">
              📞 {phone}
            </span>
          )}
          <a
            href="#appointment"
            className="text-sm font-medium text-white transition-all duration-200 ease-in-out hover:opacity-90"
            style={{
              backgroundColor: "var(--site-accent)",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            {ctaText || "Randevu Al"}
          </a>
        </div>
      </div>
    </header>
  );
}
