import { fetchAsteroidsRange } from "@/lib/api";
import { getValidDates } from "@/lib/date-utils";
import { redirect } from "next/navigation";
import DateFilters from "../date-filters";
import BusiestDaysChart from "./busiest-days-chart";
import Top5AsteroidsChart from "./top-asteroids-chart";
import DangerChart from "./danger-chart";
import SizeDistributionChart from "./size-distribution-chart";

export default async function ChartsPage({
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

    redirect(`/dashboard/charts?${newParams.toString()}`);
  }

  const asteroids = await fetchAsteroidsRange(rawStart, rawEnd);

  return (
    <>
      <DateFilters path="/dashboard/charts" />
      <div className="flex flex-wrap gap-4 w-full">
        <BusiestDaysChart asteroids={asteroids} />
        <DangerChart asteroids={asteroids} />
        <Top5AsteroidsChart asteroids={asteroids} />
        <SizeDistributionChart asteroids={asteroids} />
      </div>
    </>
  );
}
