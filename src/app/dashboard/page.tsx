"use server";

import AsteroidsList from "./asteroids-list";
import { fetchAsteroidsRange } from "@/lib/api";
import { getValidDates } from "@/lib/date-utils";
import { redirect } from "next/navigation";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const { rawStart, rawEnd, isCorrect } = getValidDates(
    params.start_date,
    params.end_date,
  );

  if (!isCorrect) {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("start_date", rawStart);
    newParams.set("end_date", rawEnd);

    redirect(`/dashboard?${newParams.toString()}`);
  }

  const asteroids = await fetchAsteroidsRange(rawStart, rawEnd);

  return <AsteroidsList asteroids={asteroids} />;
}
