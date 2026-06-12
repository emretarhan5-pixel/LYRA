import type { TemplateId } from "@/lib/types";

export interface SiteContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaPhone: string;
    heroImageUrl?: string;
  };
  about: {
    title: string;
    body: string;
    photoUrl: string | null;
  };
  services: {
    title: string;
    items: {
      name: string;
      description: string;
      price?: string | null;
      icon?: string;
    }[];
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
    workingHours: string;
    mapEmbedUrl: string | null;
  };
  testimonials: {
    items: { name: string; text: string; rating: number }[];
  };
  appointment: {
    title: string;
    description: string;
  };
  meta: {
    siteName: string;
    tagline: string;
    logoText: string;
    primaryColor: string;
    fontFamily: string;
  };
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  accent: string;
  sections: string[];
  defaultContent: SiteContent;
}

export const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  services: "Hizmetler",
  about: "Hakkında",
  testimonials: "Yorumlar",
  appointment: "Randevu",
  contact: "İletişim",
};

const dentalContent: SiteContent = {
  hero: {
    headline: "Sağlıklı Dişler, Güzel Gülüşler",
    subheadline:
      "Modern teknoloji ve uzman kadromuzla ağız ve diş sağlığınız için kapsamlı tedavi hizmetleri sunuyoruz.",
    ctaText: "Randevu Al",
    ctaPhone: "0312 000 00 00",
    heroImageUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  },
  about: {
    title: "Hakkımızda",
    body: "Kliniğimizde hasta memnuniyetini ön planda tutarak, kişiye özel tedavi planları oluşturuyoruz. Deneyimli diş hekimlerimiz ve steril ortamımızla güvenli bir tedavi süreci sunuyoruz.",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  },
  services: {
    title: "Hizmetlerimiz",
    items: [
      {
        name: "Dolgu",
        icon: "🦷",
        description: "Çürük dişlerin restorasyonu için estetik ve dayanıklı dolgu uygulamaları.",
        price: "1.500 ₺'den",
      },
      {
        name: "Kanal Tedavisi",
        icon: "🔬",
        description: "Enfekte diş sinirlerinin tedavisi ile dişinizi kurtarıyoruz.",
        price: "3.500 ₺'den",
      },
      {
        name: "İmplant",
        icon: "⚕️",
        description: "Eksik dişleriniz için kalıcı ve doğal görünümlü implant çözümleri.",
        price: "15.000 ₺'den",
      },
      {
        name: "Diş Beyazlatma",
        icon: "✨",
        description: "Profesyonel beyazlatma ile daha parlak ve sağlıklı bir gülüş.",
        price: "4.000 ₺'den",
      },
      {
        name: "Ortodonti",
        icon: "😁",
        description: "Tel ve şeffaf plak tedavileri ile düzgün diş dizilimi.",
        price: "25.000 ₺'den",
      },
    ],
  },
  contact: {
    phone: "0312 000 00 00",
    whatsapp: "905550000000",
    email: "info@disklinigi.com",
    address: "Örnek Mah. Diş Sok. No: 1",
    city: "Ankara",
    workingHours: "Pzt–Cum 09:00–18:00, Cmt 09:00–14:00",
    mapEmbedUrl: null,
  },
  testimonials: {
    items: [
      {
        name: "Elif Y.",
        text: "Çok profesyonel bir ekip. Diş tedavim hiç acı vermeden tamamlandı, kesinlikle tavsiye ederim.",
        rating: 5,
      },
      {
        name: "Mehmet K.",
        text: "İmplant tedavim için burayı seçtim ve çok memnun kaldım. Ortam çok hijyenik ve modern.",
        rating: 5,
      },
    ],
  },
  appointment: {
    title: "Online Randevu",
    description:
      "Formu doldurun, en kısa sürede sizinle iletişime geçelim ve size uygun bir randevu oluşturalım.",
  },
  meta: {
    siteName: "Diş Kliniği",
    tagline: "Sağlıklı gülüşler için",
    logoText: "Diş Kliniği",
    primaryColor: "#0ea5e9",
    fontFamily: "Inter",
  },
};

const psychologistContent: SiteContent = {
  hero: {
    headline: "İçinizdeki Gücü\nKeşfedin",
    subheadline:
      "Güvenli ve destekleyici bir ortamda, yaşamınızın her alanında büyümenize eşlik ediyorum.",
    ctaText: "Seans Ayarla",
    ctaPhone: "05xx xxx xx xx",
    heroImageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  },
  about: {
    title: "Sizinle Birlikte Büyüyorum",
    body: "10 yılı aşkın deneyimimle bireysel terapi, çift terapisi ve grup seansları sunuyorum. Bilişsel davranışçı terapi ve mindfulness temelli yaklaşımlarla çalışıyorum.",
    photoUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80",
  },
  services: {
    title: "Terapi Hizmetleri",
    items: [
      {
        name: "Bireysel Terapi",
        icon: "🧠",
        description: "Kaygı, depresyon, öz güven",
        price: null,
      },
      {
        name: "Çift Terapisi",
        icon: "💑",
        description: "İletişim ve ilişki sorunları",
        price: null,
      },
      {
        name: "Online Seans",
        icon: "💻",
        description: "Nerede olursan ol",
        price: null,
      },
      {
        name: "Anksiyete Terapisi",
        icon: "🌱",
        description: "Panik atak, sosyal kaygı",
        price: null,
      },
      {
        name: "Yas ve Kayıp",
        icon: "🤝",
        description: "Kayıp sonrası iyileşme",
        price: null,
      },
      {
        name: "Öfke Yönetimi",
        icon: "⚖️",
        description: "Duygusal düzenleme",
        price: null,
      },
    ],
  },
  contact: {
    phone: "0312 000 00 00",
    whatsapp: "05550000000",
    email: "psikolog@ornek.com",
    address: "Çankaya, Ankara",
    city: "Ankara",
    workingHours: "Pzt-Cmt 09:00-19:00",
    mapEmbedUrl: null,
  },
  testimonials: {
    items: [
      {
        name: "A. Yıldız",
        text: "Terapiye başlamadan önce çok kararsızdım. Ama ilk seanstan itibaren kendimi güvende hissettim. Hayatım gerçekten değişti.",
        rating: 5,
      },
      {
        name: "M. Demir",
        text: "Çift terapisi ilişkimizi kurtardı. İletişimimiz çok daha sağlıklı artık.",
        rating: 5,
      },
      {
        name: "S. Kaya",
        text: "Anksiyete ile baş etmeyi öğrendim. Artık panik ataklarım çok daha az.",
        rating: 5,
      },
    ],
  },
  appointment: {
    title: "Seans Ayarla",
    description:
      "İlk görüşme ücretsizdir. Size en uygun seans saatini birlikte belirleyelim.",
  },
  meta: {
    siteName: "Psk. Örnek İsim",
    tagline: "Bireysel & Çift Terapisi",
    logoText: "Psk. Örnek",
    primaryColor: "#8b5cf6",
    fontFamily: "Inter",
  },
};

const clinicContent: SiteContent = {
  hero: {
    headline: "Uzman Kadromuzla Yanınızdayız",
    subheadline:
      "Özel kliniğimizde genel sağlık hizmetlerinden tanı ve tedaviye kadar kapsamlı tıbbi destek sunuyoruz.",
    ctaText: "Randevu Al",
    ctaPhone: "0312 000 00 00",
  },
  about: {
    title: "Kliniğimiz",
    body: "Deneyimli doktor ve sağlık personelimizle hasta odaklı hizmet anlayışını benimsiyoruz. Modern cihazlarımız ve konforlu ortamımızla sağlığınızı güvence altına alıyoruz.",
    photoUrl: null,
  },
  services: {
    title: "Hizmetlerimiz",
    items: [
      {
        name: "Muayene",
        description: "Genel sağlık muayenesi ve yönlendirme hizmetleri.",
        price: "500 ₺",
      },
      {
        name: "Ultrason",
        description: "Karın, tiroid ve diğer bölgeler için ultrasonografi.",
        price: "800 ₺'den",
      },
      {
        name: "Kan Tahlili",
        description: "Kapsamlı kan testleri ve hızlı sonuç raporlama.",
        price: "300 ₺'den",
      },
      {
        name: "Aşılama",
        description: "Yetişkin ve çocuk aşıları, seyahat aşıları.",
        price: "200 ₺'den",
      },
      {
        name: "Check-up",
        description: "Kişiye özel sağlık taraması ve değerlendirme paketleri.",
        price: "2.500 ₺'den",
      },
    ],
  },
  contact: {
    phone: "0312 000 00 00",
    whatsapp: "905550000000",
    email: "info@ozelklinik.com",
    address: "Örnek Mah. Sağlık Cad. No: 12",
    city: "İzmir",
    workingHours: "Pzt–Cum 08:00–20:00, Cmt 09:00–17:00",
    mapEmbedUrl: null,
  },
  testimonials: {
    items: [
      {
        name: "Zeynep A.",
        text: "Check-up paketi aldım, tüm süreç çok düzenli ve hızlıydı. Personel çok ilgili.",
        rating: 5,
      },
      {
        name: "Ali R.",
        text: "Aile hekimimiz gibi güvenilir bir klinik. Randevu sistemi de çok pratik.",
        rating: 5,
      },
    ],
  },
  appointment: {
    title: "Randevu Formu",
    description:
      "Randevu talebinizi iletin, ekibimiz en kısa sürede sizinle iletişime geçsin.",
  },
  meta: {
    siteName: "Özel Klinik",
    tagline: "Sağlığınız önceliğimiz",
    logoText: "Özel Klinik",
    primaryColor: "#10b981",
    fontFamily: "Inter",
  },
};

const dietitianContent: SiteContent = {
  hero: {
    headline: "Sağlıklı Yaşam İçin Doğru Adım",
    subheadline:
      "Kişiye özel beslenme programları ile hedeflerinize ulaşmanız için profesyonel diyetisyen desteği.",
    ctaText: "Danışmanlık Al",
    ctaPhone: "0312 000 00 00",
  },
  about: {
    title: "Hakkımda",
    body: "Beslenme ve diyetetik alanında uzman olarak, bilimsel temelli beslenme planları hazırlıyorum. Kilo yönetiminden hastalığa özel diyetlere kadar her yaş grubuna hizmet veriyorum.",
    photoUrl: null,
  },
  services: {
    title: "Danışmanlık Alanları",
    items: [
      {
        name: "Kilo Yönetimi",
        description: "Sağlıklı kilo verme veya alma için kişiye özel programlar.",
        price: "800 ₺/ay",
      },
      {
        name: "Sporcu Beslenmesi",
        description: "Performans artışı ve kas gelişimi için beslenme planları.",
        price: "1.000 ₺/ay",
      },
      {
        name: "Hamilelik Diyeti",
        description: "Gebelik sürecinde anne ve bebek sağlığı için özel beslenme.",
        price: "900 ₺/ay",
      },
      {
        name: "Hastalık Diyeti",
        description: "Diyabet, hipertansiyon ve diğer hastalıklara özel diyetler.",
        price: "900 ₺/ay",
      },
      {
        name: "Online Danışmanlık",
        description: "Uzaktan görüşme ile beslenme takibi ve destek.",
        price: "600 ₺/ay",
      },
    ],
  },
  contact: {
    phone: "0312 000 00 00",
    whatsapp: "905550000000",
    email: "info@diyetisyen.com",
    address: "Örnek Mah. Beslenme Sok. No: 8",
    city: "Bursa",
    workingHours: "Pzt–Cum 09:00–18:00",
    mapEmbedUrl: null,
  },
  testimonials: {
    items: [
      {
        name: "Selin T.",
        text: "3 ayda 8 kilo verdim ve enerjim arttı. Program çok sürdürülebilir ve gerçekçiydi.",
        rating: 5,
      },
      {
        name: "Burak M.",
        text: "Sporcu beslenmesi programı sayesinde performansımda ciddi artış gördüm.",
        rating: 5,
      },
    ],
  },
  appointment: {
    title: "Danışmanlık Talebi",
    description:
      "Formu doldurun, size özel beslenme planınız için ilk görüşmeyi planlayalım.",
  },
  meta: {
    siteName: "Diyetisyen",
    tagline: "Bilimsel beslenme rehberliği",
    logoText: "Diyetisyen",
    primaryColor: "#f59e0b",
    fontFamily: "Inter",
  },
};

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "dental",
    name: "Diş Kliniği",
    description: "Diş hekimleri ve ağız diş sağlığı klinikleri için profesyonel şablon.",
    category: "Diş Hekimliği",
    accent: "#0ea5e9",
    sections: ["hero", "services", "about", "testimonials", "appointment", "contact"],
    defaultContent: dentalContent,
  },
  {
    id: "psychologist",
    name: "Psikolog & Terapist",
    description: "Psikologlar ve terapistler için güven veren, sakin bir tasarım.",
    category: "Psikoloji",
    accent: "#8b5cf6",
    sections: ["hero", "about", "services", "appointment", "testimonials", "contact"],
    defaultContent: psychologistContent,
  },
  {
    id: "clinic",
    name: "Özel Klinik",
    description: "Genel sağlık hizmeti sunan özel klinikler için kapsamlı şablon.",
    category: "Sağlık",
    accent: "#10b981",
    sections: ["hero", "services", "about", "testimonials", "appointment", "contact"],
    defaultContent: clinicContent,
  },
  {
    id: "dietitian",
    name: "Diyetisyen",
    description: "Diyetisyenler ve beslenme uzmanları için modern şablon.",
    category: "Beslenme",
    accent: "#f59e0b",
    sections: ["hero", "about", "services", "appointment", "testimonials", "contact"],
    defaultContent: dietitianContent,
  },
];

export function getTemplateById(id: TemplateId): TemplateDefinition | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
