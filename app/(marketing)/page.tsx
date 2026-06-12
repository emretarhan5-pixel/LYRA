import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-lyra-bg px-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl italic text-lyra-accent">lyra</h1>
        <p className="mb-8 max-w-md text-lyra-text-secondary">
          Sağlık profesyonelleri için website builder. 15 dakikada
          profesyonel web sitenizi yayınlayın.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/auth/login">Giriş Yap</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
