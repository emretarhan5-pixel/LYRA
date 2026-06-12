"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    setLoading(true);

    const result = await signUp(email, password);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-lyra-border bg-lyra-surface p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl italic text-lyra-accent">lyra</h1>
      </div>

      <h2 className="mb-6 text-center text-lg font-medium text-lyra-text-primary">
        Yeni hesap oluşturun
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-lyra-text-secondary">
            E-posta
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ornek@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-zinc-700 bg-lyra-bg text-lyra-text-primary placeholder:text-lyra-text-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-lyra-text-secondary">
            Şifre
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="En az 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="border-zinc-700 bg-lyra-bg text-lyra-text-primary placeholder:text-lyra-text-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-lyra-text-secondary">
            Şifre tekrar
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Şifrenizi tekrar girin"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="border-zinc-700 bg-lyra-bg text-lyra-text-primary placeholder:text-lyra-text-muted"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-lyra-text-secondary">
        Zaten hesabınız var mı?{" "}
        <Link
          href="/auth/login"
          className="text-lyra-accent transition-colors hover:text-indigo-400"
        >
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}
