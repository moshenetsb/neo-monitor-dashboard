"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AsteroidFiltersAndSorting() {
  const params = useSearchParams();
  const router = useRouter();

  const onClick = (filters: {
    hazard_only: boolean;
    sentry_objects_only: boolean;
    min_velocity: number | "";
    min_diameter: number | "";
    sort_by: string;
    sort_order: string;
  }) => {
    const newParams = new URLSearchParams(params);
    if (filters.hazard_only) {
      newParams.set("hazard_only", "true");
    } else {
      newParams.delete("hazard_only");
    }

    if (filters.sentry_objects_only) {
      newParams.set("sentry_objects_only", "true");
    } else {
      newParams.delete("sentry_objects_only");
    }

    if (filters.min_velocity !== "") {
      newParams.set("min_velocity", filters.min_velocity.toString());
    } else {
      newParams.delete("min_velocity");
    }

    if (filters.min_diameter !== "") {
      newParams.set("min_diameter", filters.min_diameter.toString());
    } else {
      newParams.delete("min_diameter");
    }

    newParams.set("sort_by", filters.sort_by.toString());
    newParams.set("sort_order", filters.sort_order.toString());

    router.push(`/dashboard?${newParams.toString()}`);
  };

  const [hazard_only, setHazardOnly] = useState(
    params.get("hazard_only") === "true",
  );
  const [sentry_objects_only, setSentryObjectsOnly] = useState(
    params.get("sentry_objects_only") === "true",
  );
  const [min_velocity, setMinVelocity] = useState<number | "">(
    params.get("min_velocity") ? Number(params.get("min_velocity")) : "",
  );
  const [min_diameter, setMinDiameter] = useState<number | "">(
    params.get("min_diameter") ? Number(params.get("min_diameter")) : "",
  );

  const [sort_by, setSortBy] = useState<string>(
    params.get("sort_by") ?? "approach_date",
  );
  const [sort_order, setSortOrder] = useState<string>(
    params.get("sort_order") ?? "asc",
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FunnelPlus />
          <span className="max-md:hidden">Change filters and sorting</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="min_velocity">Min velocity (km/h)</Label>
            <Input
              id="min_velocity"
              type="number"
              step={1000}
              value={min_velocity}
              min={0}
              onChange={(e) => {
                const val = e.target.value;
                setMinVelocity(val === "" ? "" : Math.max(0, Number(val)));
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="min_diameter">Min diameter (m)</Label>
            <Input
              id="min_diameter"
              type="number"
              min={0}
              step={0.001}
              value={min_diameter}
              onChange={(e) => {
                const val = e.target.value;
                setMinDiameter(val === "" ? "" : Math.max(0, Number(val)));
              }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hazard_only"
              checked={hazard_only}
              onCheckedChange={(val) => {
                setHazardOnly(!!val);
              }}
            />
            <Label htmlFor="hazard_only">Hazardous only</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sentry_objects_only"
              checked={sentry_objects_only}
              onCheckedChange={(val) => {
                setSentryObjectsOnly(!!val);
              }}
            />
            <Label htmlFor="sentry_objects_only">Sentry objects only</Label>
          </div>

          <div className="flex gap-2 items-center">
            <Select value={sort_by} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approach_date">Approach Date</SelectItem>
                <SelectItem value="diameter">Estimated Diameter</SelectItem>
                <SelectItem value="velocity">Velocity</SelectItem>
                <SelectItem value="danger_score">Danger Score</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort_order} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() =>
              onClick({
                hazard_only: hazard_only,
                min_velocity: min_velocity,
                min_diameter: min_diameter,
                sentry_objects_only: sentry_objects_only,
                sort_by: sort_by,
                sort_order: sort_order,
              })
            }
          >
            Apply parameters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
