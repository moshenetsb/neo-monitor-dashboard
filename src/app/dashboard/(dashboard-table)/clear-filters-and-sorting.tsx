"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelX } from "lucide-react";
import { toast } from "sonner";

export default function RemoveFiltersAndSorting() {
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
        newParams.delete("sort_by");
        newParams.delete("sort_order");

        toast.success("All filters removed. Displaying full dataset.");
        router.push(`/dashboard?${newParams.toString()}`);
      }}
    >
      <FunnelX />
      <span className="max-md:hidden">Remove filters and sorting</span>
    </Button>
  );
}
