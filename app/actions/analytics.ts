"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseReferrerSource } from "@/lib/utils/referrer";

export interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  totalLeads: number;
  conversionRate: number;
  dailyData: {
    date: string;
    pageviews: number;
    leads: number;
  }[];
  topReferrers: {
    source: string;
    count: number;
    percentage: number;
  }[];
}

function getDateKey(isoString: string): string {
  return isoString.split("T")[0];
}

function buildDailyLabels(days: number): { key: string; label: string }[] {
  const result: { key: string; label: string }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    const label = new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "short",
    }).format(date);
    result.push({ key, label });
  }

  return result;
}

async function verifySiteOwnership(siteId: string): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("id", siteId)
    .eq("user_id", user.id)
    .maybeSingle();

  return !!site;
}

export async function trackPageview(data: {
  siteId: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
}): Promise<void> {
  try {
    const admin = createAdminClient();
    await admin.from("pageviews").insert({
      site_id: data.siteId,
      path: data.path ?? "/",
      referrer: data.referrer ?? null,
      user_agent: data.userAgent ?? null,
    });
  } catch {
    // Tracking hatası siteyi bozmamalı
  }
}

export async function getAnalytics(
  siteId: string,
  days: number = 7
): Promise<AnalyticsData> {
  const empty: AnalyticsData = {
    totalPageviews: 0,
    uniqueVisitors: 0,
    totalLeads: 0,
    conversionRate: 0,
    dailyData: buildDailyLabels(days).map(({ label }) => ({
      date: label,
      pageviews: 0,
      leads: 0,
    })),
    topReferrers: [],
  };

  const isOwner = await verifySiteOwnership(siteId);
  if (!isOwner) {
    return empty;
  }

  const supabase = await createClient();
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(since.getDate() - (days - 1));
  const sinceIso = since.toISOString();

  const [{ data: pageviews }, { data: leads }] = await Promise.all([
    supabase
      .from("pageviews")
      .select("visited_at, referrer, user_agent")
      .eq("site_id", siteId)
      .gte("visited_at", sinceIso),
    supabase
      .from("leads")
      .select("created_at")
      .eq("site_id", siteId)
      .gte("created_at", sinceIso),
  ]);

  const pageviewList = pageviews ?? [];
  const leadList = leads ?? [];

  const totalPageviews = pageviewList.length;
  const uniqueAgents = new Set(
    pageviewList
      .map((p) => p.user_agent)
      .filter((ua): ua is string => !!ua)
  );
  const uniqueVisitors =
    uniqueAgents.size > 0 ? uniqueAgents.size : totalPageviews;
  const totalLeads = leadList.length;
  const conversionRate =
    totalPageviews > 0 ? (totalLeads / totalPageviews) * 100 : 0;

  const dailyLabels = buildDailyLabels(days);
  const pageviewsByDay = new Map<string, number>();
  const leadsByDay = new Map<string, number>();

  for (const pv of pageviewList) {
    const key = getDateKey(pv.visited_at);
    pageviewsByDay.set(key, (pageviewsByDay.get(key) ?? 0) + 1);
  }

  for (const lead of leadList) {
    const key = getDateKey(lead.created_at);
    leadsByDay.set(key, (leadsByDay.get(key) ?? 0) + 1);
  }

  const dailyData = dailyLabels.map(({ key, label }) => ({
    date: label,
    pageviews: pageviewsByDay.get(key) ?? 0,
    leads: leadsByDay.get(key) ?? 0,
  }));

  const referrerCounts = new Map<string, number>();
  for (const pv of pageviewList) {
    const source = parseReferrerSource(pv.referrer);
    referrerCounts.set(source, (referrerCounts.get(source) ?? 0) + 1);
  }

  const topReferrers = Array.from(referrerCounts.entries())
    .map(([source, count]) => ({
      source,
      count,
      percentage:
        totalPageviews > 0 ? Math.round((count / totalPageviews) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalPageviews,
    uniqueVisitors,
    totalLeads,
    conversionRate,
    dailyData,
    topReferrers,
  };
}
