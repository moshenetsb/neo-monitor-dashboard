"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DateRangePicker } from "@/components/date-range-picker";
import { toast } from "sonner";

export default function DateFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const start = searchParams.get("start_date");
  const end = searchParams.get("end_date");

  return (
    <DateRangePicker
      from={start ? new Date(start) : undefined}
      to={end ? new Date(end) : undefined}
      onChange={({ from, to }) => {
        const params = new URLSearchParams(searchParams);

        if (from) {
          params.set("start_date", from.toLocaleString("sv").split(" ")[0]);
        }
        if (to) {
          params.set("end_date", to.toLocaleString("sv").split(" ")[0]);
        }

        params.set("page", "1");

        router.push(`/dashboard?${params.toString()}`);

        toast.success("Date range updated");
      }}
    />
  );
}
