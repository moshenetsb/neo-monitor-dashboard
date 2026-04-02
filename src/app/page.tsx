import AsteroidsList from "./asteroids-list";
import { API_URL, API_KEY } from "@/lib/api";
import type { Asteroid } from "@/types/asteroid";
import { redirect } from "next/navigation";
import { start } from "repl";

async function fetchAsteroidsRange(
  startDate: string,
  endDate: string,
): Promise<Asteroid[]> {
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
      `${API_URL}/feed?start_date=${startStr}&end_date=${endStr}&api_key=${API_KEY}`,
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
        (asteroids as Asteroid[]).map((a) => ({ ...a, approach_date: date })),
    ) as Asteroid[];

    allAsteroids.push(...flattened);

    currentStart.setDate(currentStart.getDate() + maxDays);
  }

  return allAsteroids;
}

function isValidDate(str?: string) {
  if (!str) return false;
  return new Date(str).toISOString().startsWith(str);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const today = new Date().toLocaleString("sv").split(" ")[0];

  const parseDate = (val: string | string[] | undefined) => {
    const str = Array.isArray(val) ? val[0] : val;
    return str;
  };

  const startDate = parseDate(params.start_date);
  const endDate = parseDate(params.end_date);

  let rawStart = startDate && isValidDate(startDate) ? startDate : today;
  let rawEnd = endDate && isValidDate(endDate) ? endDate : today;

  if (rawStart > rawEnd) {
    [rawStart, rawEnd] = [rawEnd, rawStart];
  }

  if (startDate !== rawStart || endDate !== rawEnd) {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("start_date", rawStart);
    newParams.set("end_date", rawEnd);

    redirect(`/?${newParams.toString()}`);
  }

  const asteroids = (await fetchAsteroidsRange(
    startDate,
    endDate,
  )) as Asteroid[];

  return (
    <div className="flex flex-col w-full flex-1 items-center font-sans">
      <main className="max-w-5xl justify-between px-4">
        <AsteroidsList asteroids={asteroids} />
      </main>
    </div>
  );
}
