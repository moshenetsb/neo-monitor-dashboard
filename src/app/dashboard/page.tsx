"use server";

import AsteroidsTable from "./asteroids-table";
import { fetchAsteroidsRange } from "@/lib/api";
import { getValidDates } from "@/lib/date-utils";
import { redirect } from "next/navigation";
import PaginationForTable from "@/components/pagination-for-table";
import DateFilters from "./date-filters";
import AsteroidFilters from "./asteroid-filters";
import ClearFilters from "./clear-filters";
import { filterData } from "@/lib/filter-data";

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
  const itemsPerPage = 30;

  const filteredAsteroids = filterData(asteroids, {
    get: (key: string) => params[key] || null,
  });
  const totalPages = Math.ceil(filteredAsteroids.length / itemsPerPage);

  if (
    !params.page ||
    parseInt(params.page) < 1 ||
    parseInt(params.page) > totalPages
  ) {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("page", "1");

    redirect(`/dashboard?${newParams.toString()}`);
  }

  const pageNum = parseInt(params.page || "1");

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <DateFilters />
        <AsteroidFilters />
        <ClearFilters />
      </div>
      <AsteroidsTable
        asteroids={filteredAsteroids}
        page={pageNum}
        itemsPerPage={itemsPerPage}
      />
      <PaginationForTable page={pageNum} totalPages={totalPages} />
    </>
  );
}
