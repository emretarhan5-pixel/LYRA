"use client";

import { useEffect } from "react";
import type { SiteContent, TemplateDefinition } from "@/lib/templates";
import type { Site } from "@/lib/types";
import { SiteHeader } from "@/components/site/sections/SiteHeader";
import { HeroSection } from "@/components/site/sections/HeroSection";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { ServicesSection } from "@/components/site/sections/ServicesSection";
import { TestimonialsSection } from "@/components/site/sections/TestimonialsSection";
import { AppointmentSection } from "@/components/site/sections/AppointmentSection";
import { ContactSection } from "@/components/site/sections/ContactSection";
import { SiteFooter } from "@/components/site/sections/SiteFooter";
import { SiteWhatsAppButton } from "@/components/site/SiteWhatsAppButton";
import { SiteTracker } from "@/components/site/SiteTracker";

interface SiteRendererProps {
  site: Site;
  template: TemplateDefinition;
}

export function SiteRenderer({ site, template }: SiteRendererProps) {
  const content = site.content as unknown as SiteContent;
  const primaryColor = content.meta.primaryColor || template.accent;

  useEffect(() => {
    document.documentElement.style.setProperty("--site-accent", primaryColor);
    return () => {
      document.documentElement.style.removeProperty("--site-accent");
    };
  }, [primaryColor]);

  function renderSection(section: string) {
    switch (section) {
      case "hero":
        return (
          <HeroSection
            key="hero"
            hero={content.hero}
            contact={content.contact}
            category={template.category}
          />
        );
      case "about":
        return <AboutSection key="about" about={content.about} />;
      case "services":
        return (
          <ServicesSection key="services" services={content.services} />
        );
      case "testimonials":
        return (
          <TestimonialsSection
            key="testimonials"
            testimonials={content.testimonials}
          />
        );
      case "appointment":
        return (
          <AppointmentSection
            key="appointment"
            siteId={site.id}
            appointment={content.appointment}
            contact={content.contact}
          />
        );
      case "contact":
        return <ContactSection key="contact" contact={content.contact} />;
      default:
        return null;
    }
  }

  return (
    <div className="scroll-smooth bg-white">
      <SiteTracker siteId={site.id} />
      <SiteHeader
        logoText={content.meta.logoText}
        ctaText={content.hero.ctaText}
        phone={content.contact.phone}
      />
      {template.sections.map((section) => renderSection(section))}
      <SiteFooter
        siteName={content.meta.siteName}
        logoText={content.meta.logoText}
        tagline={content.meta.tagline}
        contact={content.contact}
      />
      <SiteWhatsAppButton phone={content.contact.whatsapp} />
    </div>
  );
}
