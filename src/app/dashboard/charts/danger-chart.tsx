"use client";

import { PieChart, Pie, Tooltip } from "recharts";
import type { Asteroid } from "@/types/asteroid";
import ChartCard from "./chart-card";
import { useTheme } from "next-themes";

export default function DangerChart({ asteroids }: { asteroids: Asteroid[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dangerous = asteroids.filter(
    (a) => a.is_potentially_hazardous_asteroid,
  ).length;
  const safe = asteroids.length - dangerous;

  const data = [
    { name: "Dangerous", value: dangerous },
    { name: "Safe", value: safe },
  ];

  const COLORS = ["#DC2626", "#059669"];
  const total = dangerous + safe;

  return (
    <ChartCard header="Risk Breakdown">
      <PieChart>
        <Pie
          data={data.map((d, i) => ({ ...d, fill: COLORS[i] }))}
          dataKey="value"
          outerRadius="80%"
          label={(entry) => `${((entry.value / total) * 100).toFixed(0)}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#fff",
          }}
          labelStyle={{
            color: isDark ? "#E5E7EB" : "#111",
          }}
        />
      </PieChart>
    </ChartCard>
  );
}
