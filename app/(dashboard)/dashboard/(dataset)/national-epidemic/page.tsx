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
import { Separator } from "@/components/ui/separator";
import { InteractiveLineChart } from "@/components/charts/national_epidemic/InteractiveLine";

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
  const defaultRangeOption = RANGE_OPTIONS.from_2023_to_now;
  const totalCasesRangeOption =
    getRangeOption(totalCasesRange, totalCasesRangeFrom, totalCasesRangeTo) ||
    defaultRangeOption;

  const totalTestingRangeOption =
    getRangeOption(
      totalTestingRange,
      totalTestingRangeFrom,
      totalTestingRangeTo,
    ) || defaultRangeOption;

  const totalDeathsRangeOption =
    getRangeOption(
      totalDeathsRange,
      totalDeathsRangeFrom,
      totalDeathsRangeTo,
    ) || defaultRangeOption;

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
    <div className="max-h-full">
      <div className="sticky top-0 z-10 mb-6 flex flex-col justify-between gap-4 border-b bg-background p-6">
        <h2 className="text-3xl font-bold">National Epidemic Dataset</h2>
      </div>
      <p className="px-6 text-lg text-foreground">
        This dataset contains the national epidemic data of Malaysia.
        Represented are{" "}
        <strong>
          cases (new, imported, recovered, active, cluster, unvax, boost,
          partially vax, fully vax)
        </strong>{" "}
      </p>

      <div className="m-6 flex h-full flex-col gap-8">
        <ChartCard
          title="Overview of Overall Cases"
          description={`Cases (New, Imported, Recovered, Active, Cluster, Unvax, Boost, Partially Vax, Fully Vax)`}
          queryKey="totalCasesRange"
          selectedRangeLabel={totalCasesRangeOption.label}
        >
          <AreaChartClient data={casesData.chartData} />
        </ChartCard>
        {/* <ChartCard
          title="Overview of Overall Cases"
          description={`Cases (New, Imported, Recovered, Active, Cluster, Unvax, Boost, Partially Vax, Fully Vax)`}
          queryKey="totalCasesRange"
          selectedRangeLabel={totalCasesRangeOption.label}
        >
          <CasesByDayChart data={casesData.chartData} />
        </ChartCard> */}
        <ChartCard
          title="Overview of Overall Deaths"
          description={`Deaths (New, Brought-in Dead, New Deaths (DoD), Brought-in Dead (DoD), Unvaccinated Deaths, Partially Vaccinated Deaths, Fully Vaccinated Deaths, Booster Dose Deaths)`}
          queryKey="totalDeathsRange"
          selectedRangeLabel={totalDeathsRangeOption.label}
        >
          <DeathsByDayChart data={deathsData.chartData} />
        </ChartCard>
        {/* <ChartCard
          title="Cumulative Testing Data"
          description={`A cumulative count of tests conducted`}
          queryKey="totalTestingRange"
          selectedRangeLabel={totalTestingRangeOption.label}
        >
          <TestingByDayChart data={testingData.chartData} />
        </ChartCard> */}
      </div>
      <div className="m-6 flex flex-col">
        <InteractiveLineChart
          title="Interactive Testing Line Chart"
          description="Filter by date range according to the categories of RTK Antigen and PCR tests."
          queryKey="totalTestingRange"
          selectedRangeLabel={totalTestingRangeOption.label}
          chartData={testingData.chartData}
        />
      </div>
    </div>
  );
}
