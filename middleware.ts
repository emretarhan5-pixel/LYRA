import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "lyra.app";
  const isLocalhost = hostname.includes("localhost");
  const isRootDomain =
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    (isLocalhost && !hostname.includes(".localhost"));

  let slug: string | null = null;

  if (!isRootDomain) {
    if (isLocalhost) {
      slug = hostname.split(".localhost")[0];
    } else {
      const parts = hostname.split(`.${ROOT_DOMAIN}`);
      if (parts.length === 2 && parts[0] !== "www") {
        slug = parts[0];
      }
    }
  }

  if (slug) {
    url.pathname = `/${slug}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  const publicPaths = ["/", "/auth/login", "/auth/callback"];
  const isPublicPath = publicPaths.some(
    (p) => url.pathname === p || url.pathname.startsWith("/auth/")
  );

  const isProtectedPath =
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/sites/");

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (
          cookiesToSet: {
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }[]
        ) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
