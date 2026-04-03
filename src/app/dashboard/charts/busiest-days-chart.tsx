"use client";
import { XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import type { Asteroid } from "@/types/asteroid";
import ChartCard from "./chart-card";
import { useTheme } from "next-themes";

export default function BusiestDaysChart({
  asteroids,
}: {
  asteroids: Asteroid[];
}) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const daysMap: { [key: string]: number } = {};

  asteroids.forEach((a) => {
    const date = a.close_approach_data[0].close_approach_date;
    daysMap[date] = (daysMap[date] || 0) + 1;
  });

  const busiestDays = Object.entries(daysMap).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <ChartCard header="Busiest Days">
      <AreaChart data={busiestDays}>
        <XAxis
          dataKey="date"
          stroke={isDark ? "#9CA3AF" : "#374151"}
          tick={{ fontSize: 12 }}
        />
        <YAxis stroke={isDark ? "#9CA3AF" : "#374151"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#fff",
          }}
          labelStyle={{ color: isDark ? "#E5E7EB" : "#111" }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke={isDark ? "#60A5FA" : "#2563EB"}
          fill={isDark ? "#2563EB33" : "#60A5FA33"}
        />
      </AreaChart>
    </ChartCard>
  );
}
