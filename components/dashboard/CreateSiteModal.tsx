"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconCheck } from "@tabler/icons-react";
import { checkSlugAvailability, createSite } from "@/app/actions/sites";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TEMPLATES, type TemplateDefinition } from "@/lib/templates";
import { slugify } from "@/lib/utils/slugify";
import { cn } from "@/lib/utils";
import type { TemplateId } from "@/lib/types";

const siteFormSchema = z.object({
  name: z.string().min(1, "Site adı zorunludur"),
  slug: z
    .string()
    .min(1, "Adres zorunludur")
    .max(50, "En fazla 50 karakter")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Sadece küçük harf, rakam ve tire kullanılabilir"
    ),
  city: z.string().min(1, "Şehir zorunludur"),
});

type SiteFormValues = z.infer<typeof siteFormSchema>;

interface CreateSiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTemplateId?: TemplateId;
}

function darkenHex(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const factor = 0.65;
  const dr = Math.round(r * factor);
  const dg = Math.round(g * factor);
  const db = Math.round(b * factor);
  return `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`;
}

export function CreateSiteModal({
  open,
  onOpenChange,
  initialTemplateId,
}: CreateSiteModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(initialTemplateId ? 2 : 1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<
    TemplateId | undefined
  >(initialTemplateId);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SiteFormValues>({
    resolver: zodResolver(siteFormSchema),
    defaultValues: { name: "", slug: "", city: "" },
  });

  const nameValue = watch("name");
  const slugValue = watch("slug");

  const resetModal = useCallback(() => {
    setStep(initialTemplateId ? 2 : 1);
    setSelectedTemplateId(initialTemplateId);
    setSlugManuallyEdited(false);
    setSlugStatus("idle");
    setSubmitError(null);
    setIsSubmitting(false);
    reset({ name: "", slug: "", city: "" });
  }, [initialTemplateId, reset]);

  useEffect(() => {
    if (!open) {
      resetModal();
    }
  }, [open, resetModal]);

  useEffect(() => {
    if (initialTemplateId) {
      setSelectedTemplateId(initialTemplateId);
      setStep(2);
    }
  }, [initialTemplateId, open]);

  useEffect(() => {
    if (!slugManuallyEdited && nameValue) {
      setValue("slug", slugify(nameValue));
    }
  }, [nameValue, slugManuallyEdited, setValue]);

  useEffect(() => {
    if (!slugValue) {
      setSlugStatus("idle");
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugValue)) {
      setSlugStatus("invalid");
      return;
    }

    setSlugStatus("checking");
    const timer = setTimeout(async () => {
      const result = await checkSlugAvailability(slugValue);
      if (result.error) {
        setSlugStatus("invalid");
      } else {
        setSlugStatus(result.available ? "available" : "taken");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [slugValue]);

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId);

  function handleTemplateSelect(template: TemplateDefinition) {
    setSelectedTemplateId(template.id);
  }

  function handleNextStep() {
    if (selectedTemplateId) {
      setStep(2);
    }
  }

  async function onSubmit(values: SiteFormValues) {
    if (!selectedTemplateId) return;

    if (slugStatus === "taken" || slugStatus === "invalid") {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await createSite({
      name: values.name,
      slug: values.slug,
      templateId: selectedTemplateId,
      city: values.city,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error ?? "Bir hata oluştu");
      return;
    }

    onOpenChange(false);
    router.push(`/sites/${result.siteId}/editor`);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Şablon Seç" : "Yeni Site Oluştur"}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Siteniz için bir şablon seçin."
              : `${selectedTemplate?.name ?? "Şablon"} şablonu ile yeni sitenizi oluşturun.`}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((template) => {
                const isSelected = selectedTemplateId === template.id;
                const gradient = `linear-gradient(135deg, ${template.accent}dd 0%, ${darkenHex(template.accent)} 100%)`;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className={cn(
                      "relative overflow-hidden rounded-card border-2 p-3 text-left transition-colors",
                      isSelected
                        ? "border-lyra-accent"
                        : "border-zinc-200 hover:border-zinc-300"
                    )}
                  >
                    {isSelected && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-lyra-accent text-white">
                        <IconCheck size={12} stroke={3} />
                      </span>
                    )}
                    <div
                      className="mb-2 flex h-16 items-center justify-center rounded-button"
                      style={{ background: gradient }}
                    >
                      <span className="text-sm font-medium text-white">
                        {template.name}
                      </span>
                    </div>
                    <p className="text-xs text-lyra-text-secondary line-clamp-2">
                      {template.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <Button
              className="w-full"
              disabled={!selectedTemplateId}
              onClick={handleNextStep}
            >
              İleri
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Site adı</Label>
              <Input
                id="name"
                placeholder="Dr. Ayşe Kaya Diş Kliniği"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Site adresi</Label>
              <div className="flex items-center gap-0">
                <span className="flex h-10 items-center rounded-l-button border border-r-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-lyra-text-secondary">
                  lyra.app/
                </span>
                <Input
                  id="slug"
                  className="rounded-l-none"
                  {...register("slug", {
                    onChange: () => setSlugManuallyEdited(true),
                  })}
                />
              </div>
              {errors.slug && (
                <p className="text-xs text-red-500">{errors.slug.message}</p>
              )}
              {slugValue && slugStatus === "checking" && (
                <p className="text-xs text-lyra-text-secondary">
                  Kontrol ediliyor...
                </p>
              )}
              {slugValue && slugStatus === "available" && (
                <p className="text-xs text-green-600">Bu adres kullanılabilir</p>
              )}
              {slugValue && slugStatus === "taken" && (
                <p className="text-xs text-red-500">Bu adres zaten kullanılıyor</p>
              )}
              {slugValue && slugStatus === "invalid" && !errors.slug && (
                <p className="text-xs text-red-500">Geçersiz adres formatı</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Şehir</Label>
              <Input id="city" placeholder="Ankara" {...register("city")} />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}

            <div className="flex gap-3">
              {!initialTemplateId && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Geri
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  isSubmitting ||
                  slugStatus === "checking" ||
                  slugStatus === "taken" ||
                  slugStatus === "invalid"
                }
              >
                {isSubmitting ? "Oluşturuluyor..." : "Siteyi Oluştur"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
