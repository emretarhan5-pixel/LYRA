export function parseReferrerSource(referrer: string | null): string {
  if (!referrer || referrer.trim() === "") {
    return "Direkt";
  }

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    if (host.includes("google")) return "Google";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("facebook") || host.includes("fb.")) return "Facebook";

    return host.replace(/^www\./, "");
  } catch {
    return "Direkt";
  }
}
