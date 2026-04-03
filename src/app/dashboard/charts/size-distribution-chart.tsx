"use client";

import { RadialBarChart, RadialBar, Tooltip, Legend } from "recharts";
import type { Asteroid } from "@/types/asteroid";
import ChartCard from "./chart-card";
import { useTheme } from "next-themes";

export default function SizeDistributionChart({
  asteroids,
}: {
  asteroids: Asteroid[];
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = [
    {
      name: "< 50m",
      value: asteroids.filter(
        (a) => a.estimated_diameter.kilometers.estimated_diameter_max < 0.05,
      ).length,
      fill: isDark ? "#FBBF24" : "#F59E0B",
    },
    {
      name: "50m - 200m",
      value: asteroids.filter(
        (a) =>
          a.estimated_diameter.kilometers.estimated_diameter_max >= 0.05 &&
          a.estimated_diameter.kilometers.estimated_diameter_max < 0.2,
      ).length,
      fill: isDark ? "#60A5FA" : "#3B82F6",
    },
    {
      name: "200m - 1km",
      value: asteroids.filter(
        (a) =>
          a.estimated_diameter.kilometers.estimated_diameter_max >= 0.2 &&
          a.estimated_diameter.kilometers.estimated_diameter_max < 1,
      ).length,
      fill: isDark ? "#F87171" : "#EF4444",
    },
    {
      name: "> 1km",
      value: asteroids.filter(
        (a) => a.estimated_diameter.kilometers.estimated_diameter_max >= 1,
      ).length,
      fill: isDark ? "#34D399" : "#10B981",
    },
  ];

  return (
    <ChartCard header="Asteroids by Size">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="100%"
        barSize={30}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          label={{
            position: "insideStart",
            fill: "#111",
            formatter: (value) => `${value}`,
          }}
          background
          dataKey="value"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#fff",
          }}
          labelStyle={{
            color: isDark ? "#E5E7EB" : "#111",
          }}
          itemStyle={{
            color: isDark ? "#60A5FA" : "#111",
          }}
        />
        <Legend
          iconSize={10}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </RadialBarChart>
    </ChartCard>
  );
}
