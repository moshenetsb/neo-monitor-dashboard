import type { Asteroid } from "@/types/asteroid";

export function filterAndSortData(
  asteroids: Asteroid[],
  params: { get: (key: string) => string | null },
): Asteroid[] {
  //Filters
  const hazard_only = params.get("hazard_only") === "true";
  const sentry_objects_only = params.get("sentry_objects_only") === "true";

  const min_velocity = params.get("min_velocity")
    ? Number(params.get("min_velocity"))
    : "";
  const min_diameter = params.get("min_diameter")
    ? Number(params.get("min_diameter"))
    : "";

  let filtered = [...asteroids];

  const neo_id = params.get("neo_reference_id");
  if (neo_id) {
    filtered = filtered.filter((a) => a.neo_reference_id === neo_id);
  }

  if (hazard_only) {
    filtered = filtered.filter((a) => a.is_potentially_hazardous_asteroid);
  }

  if (sentry_objects_only) {
    filtered = filtered.filter((a) => a.is_sentry_object);
  }

  if (min_velocity !== "") {
    filtered = filtered.filter((a) => {
      const velocity = parseFloat(
        a.close_approach_data[0]?.relative_velocity.kilometers_per_hour ?? "0",
      );
      return velocity >= min_velocity;
    });
  }

  if (min_diameter !== "") {
    filtered = filtered.filter((a) => {
      const diameter =
        (a.estimated_diameter.kilometers.estimated_diameter_min +
          a.estimated_diameter.kilometers.estimated_diameter_max) /
          2 || 0;
      return diameter >= min_diameter;
    });
  }

  //Sort data
  const sortBy = params.get("sort_by") || "approach_date";
  const sortOrder = params.get("sort_order") || "asc";

  filtered.sort((a, b) => {
    let valA: number = 0;
    let valB: number = 0;

    switch (sortBy) {
      case "approach_date":
        valA = new Date(a.approach_date).getTime();
        valB = new Date(b.approach_date).getTime();
        break;
      case "diameter":
        valA =
          (a.estimated_diameter.kilometers.estimated_diameter_min +
            a.estimated_diameter.kilometers.estimated_diameter_max) /
            2 || 0;
        valB =
          (b.estimated_diameter.kilometers.estimated_diameter_min +
            b.estimated_diameter.kilometers.estimated_diameter_max) /
            2 || 0;
        break;
      case "velocity":
        valA = parseFloat(
          a.close_approach_data[0]?.relative_velocity.kilometers_per_hour ||
            "0",
        );
        valB = parseFloat(
          b.close_approach_data[0]?.relative_velocity.kilometers_per_hour ||
            "0",
        );
        break;
      case "danger_score":
        valA = a.danger_score ?? 0;
        valB = b.danger_score ?? 0;
        break;
    }

    return sortOrder === "asc"
      ? (valA as number) - (valB as number)
      : (valB as number) - (valA as number);
  });
  return filtered;
}
