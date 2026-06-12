# Lyra

Sağlık profesyonelleri için website builder. Türkiye'deki diş hekimleri, psikologlar, diyetisyenler ve özel klinikler için hazır şablonlarla 15 dakikada profesyonel web sitesi.

## Tech Stack

- Next.js 15 (App Router)
- Supabase (auth, database)
- Tailwind CSS v4
- TypeScript
- Vercel (deployment)

## Geliştirme

```bash
npm install
cp .env.local.example .env.local
# .env.local dosyasını Supabase bilgileriyle doldurun
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

### Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL'i |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Public site ve lead kayıtları için |
| `NEXT_PUBLIC_APP_URL` | Uygulama kök URL'i |
| `NEXT_PUBLIC_ROOT_DOMAIN` | Kök domain (ör. `lyra.app`) |

## Public site routing

### Production

Yayında olan siteler subdomain üzerinden sunulur:

```
https://{slug}.lyra.app
```

Örnek: `https://dr-ayse-kaya.lyra.app`

Middleware, subdomain isteklerini dahili olarak `/[slug]` rotasına rewrite eder.

### Development

İki yöntemle test edilebilir:

**Path-based (fallback):**

```
http://localhost:3000/dr-ayse-kaya
```

**Subdomain (production davranışını simüle eder):**

1. `/etc/hosts` dosyasına ekleyin:

```
127.0.0.1 dr-ayse-kaya.localhost
```

2. Tarayıcıda açın:

```
http://dr-ayse-kaya.localhost:3000
```

## Vercel deployment

### Wildcard subdomain kurulumu

1. Vercel dashboard → Project → **Settings** → **Domains**
2. `lyra.app` ekleyin (zaten varsa atlayın)
3. `*.lyra.app` ekleyin (wildcard)
4. DNS sağlayıcınızda `*.lyra.app` için CNAME kaydı oluşturun:

```
*.lyra.app  →  cname.vercel-dns.com
```

### Environment variables (Vercel dashboard)

```
NEXT_PUBLIC_ROOT_DOMAIN=lyra.app
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=https://lyra.app
```

### vercel.json

Proje kökündeki `vercel.json`, wildcard host isteklerini `/:slug` rotasına yönlendirir. Middleware ile birlikte çalışır.

## Supabase migration

`supabase/migrations/001_initial.sql` dosyasını Supabase SQL Editor'da çalıştırın.

## Auth

Magic link (e-posta OTP) ile giriş. Redirect URL olarak şunu Supabase Auth ayarlarına ekleyin:

```
http://localhost:3000/auth/callback
https://lyra.app/auth/callback
```
