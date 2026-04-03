"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import type { Asteroid } from "@/types/asteroid";
import ChartCard from "./chart-card";
import { useTheme } from "next-themes";

export default function TopAsteroidsChart({
  asteroids,
}: {
  asteroids: Asteroid[];
}) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const top5 = asteroids
    .map((a) => ({
      name: a.name,
      diameter: a.estimated_diameter.kilometers.estimated_diameter_max,
    }))
    .sort((a, b) => b.diameter - a.diameter)
    .slice(0, 5);

  return (
    <ChartCard header="Top 5 Largest Asteroids">
      <BarChart data={top5}>
        <XAxis dataKey="name" hide stroke={isDark ? "#9CA3AF" : "#374151"} />
        <YAxis stroke={isDark ? "#9CA3AF" : "#374151"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#fff",
          }}
          labelStyle={{
            color: isDark ? "#E5E7EB" : "#111",
          }}
        />
        <Bar dataKey="diameter" fill={isDark ? "#60A5FA" : "#2563EB"} />
      </BarChart>
    </ChartCard>
  );
}
