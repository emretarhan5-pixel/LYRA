"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import {
  IconEye,
  IconUsers,
  IconUserPlus,
  IconTrendingUp,
  IconChartBar,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandFacebook,
  IconHome,
  IconWorld,
  IconExternalLink,
} from "@tabler/icons-react";
import { getAnalytics, type AnalyticsData } from "@/app/actions/analytics";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { cn } from "@/lib/utils";

const AnalyticsChart = dynamic(() => import("./AnalyticsChart"), {
  ssr: false,
  loading: () => (
    <div className="h-72 animate-pulse rounded-lg border border-zinc-200 bg-zinc-50" />
  ),
});

const PERIOD_OPTIONS = [
  { value: 7, label: "7 gün" },
  { value: 30, label: "30 gün" },
  { value: 90, label: "90 gün" },
] as const;

interface AnalyticsDashboardProps {
  initialData: AnalyticsData;
  siteName: string;
  siteId: string;
  siteSlug: string;
}

function formatNumber(value: number): string {
  return value.toLocaleString("tr-TR");
}

function ReferrerIcon({ source }: { source: string }) {
  const size = 18;
  switch (source) {
    case "Google":
      return <IconBrandGoogle size={size} className="text-zinc-500" />;
    case "Instagram":
      return <IconBrandInstagram size={size} className="text-zinc-500" />;
    case "Facebook":
      return <IconBrandFacebook size={size} className="text-zinc-500" />;
    case "Direkt":
      return <IconHome size={size} className="text-zinc-500" />;
    default:
      return <IconWorld size={size} className="text-zinc-500" />;
  }
}

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  sublabel: string;
  valueClassName?: string;
}

function MetricCard({
  icon,
  value,
  label,
  sublabel,
  valueClassName,
}: MetricCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="mb-3 text-zinc-400">{icon}</div>
      <p className={cn("text-2xl font-bold text-lyra-surface", valueClassName)}>
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-lyra-surface">{label}</p>
      <p className="text-xs text-lyra-text-secondary">{sublabel}</p>
    </div>
  );
}

export function AnalyticsDashboard({
  initialData,
  siteName,
  siteId,
  siteSlug,
}: AnalyticsDashboardProps) {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<AnalyticsData>(initialData);
  const [isPending, startTransition] = useTransition();

  function handlePeriodChange(newDays: number) {
    setDays(newDays);
    startTransition(async () => {
      const result = await getAnalytics(siteId, newDays);
      setData(result);
    });
  }

  const conversionColor =
    data.conversionRate > 5
      ? "text-green-600"
      : data.conversionRate < 2 && data.totalPageviews > 0
        ? "text-red-500"
        : undefined;

  if (data.totalPageviews === 0) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-lyra-surface">Analitik</h1>
          <p className="text-sm text-lyra-text-secondary">{siteName}</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white py-24 text-center">
          <IconChartBar
            size={48}
            stroke={1.5}
            className="mb-4 text-lyra-text-muted"
          />
          <h2 className="mb-2 text-lg font-medium text-lyra-surface">
            Henüz veri yok
          </h2>
          <p className="mb-6 max-w-sm text-sm text-lyra-text-secondary">
            Siteniz ziyaret edildiğinde burada görünecek.
          </p>
          <Button asChild>
            <a
              href={getSiteUrl(siteSlug)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <IconExternalLink size={16} />
              Siteyi Görüntüle
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-lyra-surface">Analitik</h1>
          <p className="text-sm text-lyra-text-secondary">{siteName}</p>
        </div>

        <div className="flex gap-1 rounded-lg border border-zinc-200 bg-white p-1">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handlePeriodChange(option.value)}
              disabled={isPending}
              className={cn(
                "rounded-button px-3 py-1.5 text-xs font-medium transition-colors",
                days === option.value
                  ? "bg-lyra-accent text-white"
                  : "text-lyra-text-secondary hover:bg-zinc-50",
                isPending && "opacity-60"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4",
          isPending && "opacity-60"
        )}
      >
        <MetricCard
          icon={<IconEye size={20} />}
          value={formatNumber(data.totalPageviews)}
          label="Sayfa Görüntüleme"
          sublabel={`son ${days} günde`}
        />
        <MetricCard
          icon={<IconUsers size={20} />}
          value={formatNumber(data.uniqueVisitors)}
          label="Ziyaretçi"
          sublabel="tahmini tekil"
        />
        <MetricCard
          icon={<IconUserPlus size={20} />}
          value={formatNumber(data.totalLeads)}
          label="Hasta Adayı"
          sublabel="form doldurdu"
        />
        <MetricCard
          icon={<IconTrendingUp size={20} />}
          value={`%${data.conversionRate.toFixed(1)}`}
          label="Dönüşüm Oranı"
          sublabel="aday/ziyaretçi"
          valueClassName={conversionColor}
        />
      </div>

      <div className={cn("mb-6", isPending && "opacity-60")}>
        <AnalyticsChart dailyData={data.dailyData} />
      </div>

      {data.topReferrers.length > 0 && (
        <div
          className={cn(
            "rounded-lg border border-zinc-200 bg-white p-5",
            isPending && "opacity-60"
          )}
        >
          <h3 className="mb-4 text-sm font-medium text-lyra-surface">
            Trafik Kaynakları
          </h3>
          <div className="space-y-4">
            {data.topReferrers.map((referrer) => (
              <div key={referrer.source} className="flex items-center gap-3">
                <ReferrerIcon source={referrer.source} />
                <span className="w-28 shrink-0 text-sm text-lyra-surface sm:w-36">
                  {referrer.source}
                </span>
                <span className="w-10 shrink-0 text-right text-sm text-lyra-text-secondary">
                  {formatNumber(referrer.count)}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-lyra-accent"
                    style={{ width: `${referrer.percentage}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-xs text-lyra-text-secondary">
                  %{referrer.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
