import type { Asteroid } from "@/types/asteroid";

const API_BASE_URL = process.env.API_BASE_URL ?? "";
const NASA_API_KEY = process.env.NASA_API_KEY ?? "";

if (API_BASE_URL === "") {
  throw new Error("API_BASE_URL was not set in enviroment variables!");
}

if (NASA_API_KEY === "") {
  throw new Error("NASA_API_KEY was not set in enviroment variables!");
}

function computeDangerScore(a: Asteroid): number {
  const diameter = a.estimated_diameter.kilometers.estimated_diameter_max || 0;
  const velocity =
    parseFloat(
      a.close_approach_data[0].relative_velocity.kilometers_per_hour,
    ) || 0;
  const missDistance =
    parseFloat(a.close_approach_data[0].miss_distance.kilometers) || 1;
  return (
    ((diameter * velocity) / missDistance) *
    a.absolute_magnitude_h *
    (a.is_potentially_hazardous_asteroid ? 100000 : 1000)
  );
}

export async function fetchAsteroidsRange(
  startDate: string,
  endDate: string,
): Promise<Asteroid[]> {
  "use server";
  const maxDays = 7;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const currentStart = new Date(start);
  const allAsteroids: Asteroid[] = [];
  while (currentStart <= end) {
    const currentEnd = new Date(
      Math.min(
        currentStart.getTime() + maxDays * 24 * 60 * 60 * 1000 - 1,
        end.getTime(),
      ),
    );
    const startStr = currentStart.toISOString().split("T")[0];
    const endStr = currentEnd.toISOString().split("T")[0];

    const response = await fetch(
      `${API_BASE_URL}/feed?start_date=${startStr}&end_date=${endStr}&api_key=${NASA_API_KEY}`,
      {
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) {
      let message = "Unknown error";

      if (response.status === 403) {
        message = "API key invalid or your IP is blocked.";
      } else if (response.status === 429) {
        message = "Too many requests from your API key. Please try later.";
      }

      throw new Error(message);
    }

    const data = await response.json();

    const flattened = Object.entries(data.near_earth_objects).flatMap(
      ([date, asteroids]) =>
        (asteroids as Asteroid[]).map((a) => ({
          ...a,
          name:
            a.name.startsWith("(") && a.name.endsWith(")")
              ? a.name.slice(1, -1)
              : a.name,
          approach_date: date,
          danger_score: computeDangerScore(a),
        })),
    ) as Asteroid[];

    allAsteroids.push(...flattened);

    currentStart.setDate(currentStart.getDate() + maxDays);
  }

  return allAsteroids;
}
