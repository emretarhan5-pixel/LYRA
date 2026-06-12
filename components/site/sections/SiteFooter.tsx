interface SiteFooterProps {
  siteName: string;
  logoText: string;
}

export function SiteFooter({ siteName, logoText }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-site">
        <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <span className="font-bold">{logoText}</span>
          <span className="text-sm text-gray-400">Lyra ile oluşturuldu</span>
        </div>
        <p className="text-sm text-gray-400">
          © {year} {siteName}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
