"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalyticsData } from "@/app/actions/analytics";

interface AnalyticsChartProps {
  dailyData: AnalyticsData["dailyData"];
}

export default function AnalyticsChart({ dailyData }: AnalyticsChartProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-medium text-lyra-surface">
        Günlük Trafik
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={dailyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#71717a" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e4e4e7",
              fontSize: "13px",
            }}
            formatter={(value, name) => [
              Number(value).toLocaleString("tr-TR"),
              name === "pageviews" ? "Sayfa Görüntüleme" : "Hasta Adayı",
            ]}
          />
          <Legend
            formatter={(value) =>
              value === "pageviews" ? "Sayfa Görüntüleme" : "Hasta Adayı"
            }
          />
          <Bar
            dataKey="pageviews"
            fill="#6366f1"
            fillOpacity={0.8}
            radius={[4, 4, 0, 0]}
            name="pageviews"
          />
          <Bar
            dataKey="leads"
            fill="#10b981"
            fillOpacity={0.9}
            radius={[4, 4, 0, 0]}
            name="leads"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
