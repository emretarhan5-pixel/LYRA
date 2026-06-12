export type Plan = "free" | "starter" | "pro" | "agency";
export type TemplateId = "dental" | "psychologist" | "clinic" | "dietitian";
export type LeadStatus = "new" | "contacted" | "appointed" | "closed";
export type FormType = "contact" | "appointment";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: Plan;
  created_at: string;
}

export interface Site {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  template_id: TemplateId;
  content: Record<string, unknown>;
  is_published: boolean;
  custom_domain: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  site_id: string;
  form_type: FormType;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface Pageview {
  id: string;
  site_id: string;
  visited_at: string;
  path: string | null;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
}
