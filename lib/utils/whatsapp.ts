export function formatWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("90")) {
    return `https://wa.me/${digits}`;
  }

  if (digits.startsWith("0")) {
    return `https://wa.me/90${digits.slice(1)}`;
  }

  return `https://wa.me/90${digits}`;
}
