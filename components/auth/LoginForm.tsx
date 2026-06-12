"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-lyra-border bg-lyra-surface p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl italic text-lyra-accent">lyra</h1>
      </div>

      {sent ? (
        <div className="text-center">
          <h2 className="mb-2 text-lg font-medium text-lyra-text-primary">
            E-postanızı kontrol edin
          </h2>
          <p className="text-sm text-lyra-text-secondary">
            Giriş bağlantısı <span className="text-lyra-text-primary">{email}</span>{" "}
            adresine gönderildi.
          </p>
        </div>
      ) : (
        <>
          <h2 className="mb-6 text-center text-lg font-medium text-lyra-text-primary">
            Giriş yapmak için e-posta adresinizi girin
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-zinc-700 bg-lyra-bg text-lyra-text-primary placeholder:text-lyra-text-muted"
            />

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Gönderiliyor..." : "Bağlantı Gönder"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
