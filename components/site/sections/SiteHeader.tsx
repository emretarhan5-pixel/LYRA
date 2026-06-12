interface SiteHeaderProps {
  logoText: string;
  ctaText: string;
}

export function SiteHeader({ logoText, ctaText }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6">
        <span
          className="text-lg font-bold"
          style={{ color: "var(--site-accent)" }}
        >
          {logoText}
        </span>
        <a
          href="#appointment"
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--site-accent)" }}
        >
          {ctaText || "Randevu Al"}
        </a>
      </div>
    </header>
  );
}
