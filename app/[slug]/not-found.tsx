import Link from "next/link";

export default function SiteNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-lyra-bg px-4 text-center">
      <Link
        href="/"
        className="mb-6 text-2xl italic text-lyra-accent"
      >
        lyra
      </Link>
      <h1 className="mb-2 text-lg font-medium text-lyra-text-primary">
        Bu site bulunamadı veya yayında değil.
      </h1>
      <Link
        href="/"
        className="mt-4 text-sm text-lyra-accent transition-colors hover:text-indigo-400"
      >
        Anasayfaya dön
      </Link>
    </div>
  );
}
