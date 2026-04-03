"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelX } from "lucide-react";

export default function ClearFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Button
      variant="outline"
      onClick={() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("hazard_only");
        newParams.delete("sentry_objects_only");
        newParams.delete("min_velocity");
        newParams.delete("min_diameter");

        router.push(`/dashboard?${newParams.toString()}`);
      }}
    >
      <FunnelX />
      <span className="max-sm:hidden">Clear filters</span>
    </Button>
  );
}
