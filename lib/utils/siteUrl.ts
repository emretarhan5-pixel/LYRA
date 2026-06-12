export function getSiteUrl(slug: string): string {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "lyra.app";
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return `https://${slug}.${rootDomain}`;
  }

  return `http://localhost:3000/${slug}`;
}

export function getSiteHostname(slug: string): string {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "lyra.app";
  return `${slug}.${rootDomain}`;
}
