"use client";

import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { createLead } from "@/app/actions/leads";

interface AppointmentFormProps {
  siteId: string;
}

const inputClassName =
  "w-full rounded-[10px] border-[1.5px] border-slate-200 px-4 py-3 text-[15px] text-slate-900 outline-none transition-colors duration-200 focus:border-[var(--site-accent)]";

const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500";

export function AppointmentForm({ siteId }: AppointmentFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [hoverSubmit, setHoverSubmit] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setError(false);

    const result = await createLead({
      siteId,
      formType: "appointment",
      fullName,
      phone,
      email: email || undefined,
      message: message || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-slate-900">Randevu Talebi</h3>

      {submitted && (
        <div className="mb-4 rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Talebiniz alındı, en kısa sürede dönüş yapacağız.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Bir hata oluştu, lütfen telefon ile arayın.
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className={labelClassName}>
              Ad Soyad
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClassName}>
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              E-posta
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClassName}>
              Mesaj
            </label>
            <textarea
              id="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClassName}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setHoverSubmit(true)}
            onMouseLeave={() => setHoverSubmit(false)}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] py-3.5 text-sm font-semibold transition-all duration-200 ease-in-out disabled:opacity-60"
            style={{
              backgroundColor: hoverSubmit ? "var(--site-accent)" : "white",
              color: hoverSubmit ? "white" : "var(--site-accent)",
              border: "1.5px solid var(--site-accent)",
            }}
          >
            {isSubmitting && <IconLoader2 size={18} className="animate-spin" />}
            {isSubmitting ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
          </button>
        </form>
      )}
    </div>
  );
}
