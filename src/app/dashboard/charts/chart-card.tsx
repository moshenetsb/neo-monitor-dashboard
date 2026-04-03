"use client";
import { ResponsiveContainer } from "recharts";

export default function ChartCard({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <div className="w-full sm:w-[45%]">
      <h2 className="text-lg font-semibold mb-2 not-dark:text-blue-950">
        {header}
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
