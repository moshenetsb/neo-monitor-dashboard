"use server";

import AsteroidsTable from "./asteroids-table";
import { fetchAsteroidsRange } from "@/lib/api";
import { getValidDates } from "@/lib/date-utils";
import { redirect } from "next/navigation";
import PaginationForTable from "@/components/pagination-for-table";
import DateFilters from "../date-filters";
import AsteroidFiltersAndSorting from "./asteroid-filters-and-sorting";
import RemoveFiltersAndSorting from "./clear-filters-and-sorting";
import { filterAndSortData } from "@/lib/filter-and-sort-data";

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

  if (
    params.sort_by &&
    !["approach_date", "velocity", "diameter", "danger_score"].includes(
      params.sort_by,
    )
  ) {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.delete("sort_by");
    newParams.delete("sort_order");

    redirect(`/dashboard?${newParams.toString()}`);
  }

  if (params.sort_order && !["asc", "desc"].includes(params.sort_order)) {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("sort_order", "asc");

    redirect(`/dashboard?${newParams.toString()}`);
  }

  const asteroids = await fetchAsteroidsRange(rawStart, rawEnd);
  const itemsPerPage = 30;

  const filteredAsteroids = filterAndSortData(asteroids, {
    get: (key: string) => params[key] || null,
  });
  const totalPages = Math.ceil(filteredAsteroids.length / itemsPerPage);

  const pageNum = parseInt(params.page || "1");

  const validPageNum =
    filteredAsteroids.length > 0
      ? Math.min(Math.max(pageNum, 1), totalPages)
      : 1;

  if (pageNum !== validPageNum && filteredAsteroids.length > 0) {
    const newParams = new URLSearchParams(params as Record<string, string>);
    newParams.set("page", validPageNum.toString());
    redirect(`/dashboard?${newParams.toString()}`);
  }

  return (
    <>
      <div className="flex items-center flex-wrap gap-2 w-full">
        <DateFilters path="/dashboard" />
        <div className="flex gap-2">
          <AsteroidFiltersAndSorting />
          <RemoveFiltersAndSorting />
        </div>
      </div>
      <AsteroidsTable
        asteroids={filteredAsteroids}
        page={pageNum}
        itemsPerPage={itemsPerPage}
      />
      {filteredAsteroids.length > 0 ? (
        <PaginationForTable page={pageNum} totalPages={totalPages} />
      ) : null}
    </>
  );
}
