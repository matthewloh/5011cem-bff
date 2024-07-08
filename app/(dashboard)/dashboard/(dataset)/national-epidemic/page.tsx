import CasesByDayChart from "@/components/charts/national_epidemic/CasesByDayChart";

import { RANGE_OPTIONS, getRangeOption } from "@/lib/rangeOptions";
import { ChartCard } from "@/components/charts/national_epidemic/ChartCard";
import { getTotalCases } from "./getCasesData";
import { getCumulativeTestingData } from "./getTestingData";
import TestingByDayChart from "@/components/charts/national_epidemic/TestingByDayChart";
import { getDeathsData } from "./getDeathsData";
import DeathsByDayChart from "@/components/charts/national_epidemic/DeathsByDayChart";
import CasesTremorClientChart from "@/components/charts/national_epidemic/BarChartClient";
import { AreaChartClient } from "@/components/charts/AreaChart";

export default async function NationalEpidemic({
  searchParams: {
    totalCasesRange,
    totalCasesRangeFrom,
    totalCasesRangeTo,
    totalTestingRange,
    totalTestingRangeFrom,
    totalTestingRangeTo,
    totalDeathsRange,
    totalDeathsRangeFrom,
    totalDeathsRangeTo,
  },
}: {
  searchParams: {
    totalCasesRange?: string;
    totalCasesRangeFrom?: string;
    totalCasesRangeTo?: string;
    totalTestingRange?: string;
    totalTestingRangeFrom?: string;
    totalTestingRangeTo?: string;
    totalDeathsRange?: string;
    totalDeathsRangeFrom?: string;
    totalDeathsRangeTo?: string;
  };
}) {
  const totalCasesRangeOption =
    getRangeOption(totalCasesRange, totalCasesRangeFrom, totalCasesRangeTo) ||
    RANGE_OPTIONS.from_2021_to_2022;

  const totalTestingRangeOption =
    getRangeOption(
      totalTestingRange,
      totalTestingRangeFrom,
      totalTestingRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const totalDeathsRangeOption =
    getRangeOption(
      totalDeathsRange,
      totalDeathsRangeFrom,
      totalDeathsRangeTo,
    ) || RANGE_OPTIONS.from_2021_to_2022;

  const [casesData, testingData, deathsData] = await Promise.all([
    getTotalCases(
      totalCasesRangeOption.startDate,
      totalCasesRangeOption.endDate,
    ),
    getCumulativeTestingData(
      totalTestingRangeOption.startDate,
      totalTestingRangeOption.endDate,
    ),
    getDeathsData(
      totalDeathsRangeOption.startDate,
      totalDeathsRangeOption.endDate,
    ),
  ]);

  return (
    <div className="">
      <h2 className="m-6 text-3xl font-bold">National Epidemic Dataset</h2>
      <p className="m-6 text-lg text-gray-700">
        This dataset contains the national epidemic data of Malaysia.
        Represented are{" "}
        <strong>
          cases (new, imported, recovered, active, cluster, unvax, boost,
          partially vax, fully vax)
        </strong>{" "}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <ChartCard
          title="Total Cases"
          description={`Cases (New, Imported, Recovered, Active, Cluster, Unvax, Boost, Partially Vax, Fully Vax)`}
          queryKey="totalCasesRange"
          selectedRangeLabel={totalCasesRangeOption.label}
        >
          <AreaChartClient data={casesData.chartData} />
        </ChartCard>
        {/* <CasesTremorClientChart data={casesData.chartData} /> */}
        <ChartCard
          title="Total Cases"
          description={`Cases (New, Imported, Recovered, Active, Cluster, Unvax, Boost, Partially Vax, Fully Vax)`}
          queryKey="totalCasesRange"
          selectedRangeLabel={totalCasesRangeOption.label}
        >
          <CasesByDayChart data={casesData.chartData} />
        </ChartCard>
        <ChartCard
          title="Total Deaths"
          description={`Deaths (New)`}
          queryKey="totalDeathsRange"
          selectedRangeLabel={totalDeathsRangeOption.label}
        >
          <DeathsByDayChart data={deathsData.chartData} />
        </ChartCard>
        <ChartCard
          title="Cumulative Testing Data"
          description={`A cumulative count of tests conducted`}
          queryKey="totalTestingRange"
          selectedRangeLabel={totalTestingRangeOption.label}
        >
          <TestingByDayChart data={testingData.chartData} />
        </ChartCard>
      </div>
    </div>
  );
}
