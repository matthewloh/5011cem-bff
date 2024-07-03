import CasesByDayChart from "@/components/charts/CasesByDayChart";

import { RANGE_OPTIONS, getRangeOption } from "@/lib/rangeOptions";
import { ChartCard } from "@/components/charts/ChartCard";
import { getTotalCases } from "./getCasesData";
import BarChartClient from "@/components/charts/BarChartClient";
import { getCumulativeTestingData } from "./getTestingData";
import TestingByDayChart from "@/components/charts/TestingByDayChart";
import { getDeathsData } from "./getDeathsData";
import DeathsByDayChart from "@/components/charts/DeathsByDayChart";

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

  /* 
    TODO:
    const [casesData, deathsData, recoveredData, testingData] = await Promise.all([
      server components 
      getTotalCases(totalCasesRangeOption.startDate, totalCasesRangeOption.endDate), DONE
      getTotalDeaths(totalDeathsRangeOption.startDate, totalDeathsRangeOption.endDate), DONE
      getRecoveredData(totalRecoveredRangeOption.startDate, totalRecoveredRangeOption.endDate), 
      getTestingData(totalTestingRangeOption.startDate, totalTestingRangeOption.endDate), DONE
    ])
  */

  const pythonCall = await fetch(
    "http://127.0.0.1:3000/api/python/Pulau Pinang",
    // "http://127.0.0.1:3000/api/python/Pulau Pinang/vaccination"
  ).then((response) => response.json());
  // console.log(data);
  return (
    <div className="max-h-full">
      <h2 className="m-6 text-3xl font-bold">National Epidemic Dataset</h2>
      <p className="m-6 text-lg text-gray-700">
        This dataset contains the national epidemic data of Malaysia.
        Represented are{" "}
        <strong>
          cases (new, imported, recovered, active, cluster, unvax, boost,
          partially vax, fully vax)
        </strong>{" "}
      </p>
      {/* <DatasetViewOptions /> */}

      <pre>{JSON.stringify(pythonCall, null, 2)}</pre>
      <BarChartClient data={casesData.chartData} />

      <div className="grid h-full grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-2">
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
          selectedRangeLabel={totalCasesRangeOption.label}
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
