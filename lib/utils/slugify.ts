const turkishMap: Record<string, string> = {
  ş: "s",
  Ş: "s",
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ö: "o",
  Ö: "o",
  ı: "i",
  İ: "i",
  ç: "c",
  Ç: "c",
};

export function slugify(text: string): string {
  let result = text;

  for (const [from, to] of Object.entries(turkishMap)) {
    result = result.replaceAll(from, to);
  }

  return result
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}
