/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/BbTTX1hYAlE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartCard } from "@/components/charts/national_epidemic/ChartCard";
import { TrendingUp } from "lucide-react";
import prisma from "@/lib/db";
import { formatDate } from "@/utils/formatters";
import DashboardVaccinationCard from "../../../components/charts/dashboard/dash-vacc";
import DashboardDeathsCard from "@/components/charts/dashboard/dash-death";
import DashboardNewCasesCard from "@/components/charts/dashboard/dash-new-cases";
import DashboardHospitalizationsCard from "@/components/charts/dashboard/dash-hospital";
import { getRangeOption, RANGE_OPTIONS } from "@/lib/rangeOptions";
import { ICUBedUtilizationRateChart } from "@/components/charts/dashboard/dash-icu-util-rate";
import { getICUBedUtilizationRate } from "./getICUBedUtilizationRate";
import { getVentilatorUtilizationRate } from "./getVentilatorUtilizationRate";
import { VentilatorUtilizationRateChart } from "@/components/charts/dashboard/dash-vent-util-rate";
import { getAverageDeaths } from "./getAverageDeaths";
import { AverageDeathsChart } from "@/components/charts/dashboard/dash-avg-deaths";
import { getAverageCases } from "./getAverageCases";
import { AverageCasesChart } from "@/components/charts/dashboard/dash-avg-cases";
import DashboardInteractiveCard from "@/components/charts/dashboard/dash-interactive";
import { DashBarInteractive } from "@/components/charts/dashboard/DashBarLine";
import { subDays } from "date-fns";

export default async function DashboardPage({
  searchParams: {
    avgCasesRange,
    avgCasesRangeFrom,
    avgCasesRangeTo,
    avgDeathsRange,
    avgDeathsRangeFrom,
    avgDeathsRangeTo,
    icuBedUtilizationRateRange,
    icuBedUtilizationRateRangeFrom,
    icuBedUtilizationRateRangeTo,
    ventUtilizationRateRange,
    ventUtilizationRateRangeFrom,
    ventUtilizationRateRangeTo,
  },
}: {
  searchParams: {
    avgCasesRange?: string;
    avgCasesRangeFrom?: string;
    avgCasesRangeTo?: string;
    avgDeathsRange?: string;
    avgDeathsRangeFrom?: string;
    avgDeathsRangeTo?: string;
    icuBedUtilizationRateRange?: string;
    icuBedUtilizationRateRangeFrom?: string;
    icuBedUtilizationRateRangeTo?: string;
    ventUtilizationRateRange?: string;
    ventUtilizationRateRangeFrom?: string;
    ventUtilizationRateRangeTo?: string;
  };
}) {
  const defaultRangeOption = RANGE_OPTIONS.from_2023_to_now;

  const avgCasesRangeOption =
    getRangeOption(avgCasesRange, avgCasesRangeFrom, avgCasesRangeTo) ||
    defaultRangeOption;

  const avgDeathsRangeOption =
    getRangeOption(avgDeathsRange, avgDeathsRangeFrom, avgDeathsRangeTo) ||
    defaultRangeOption;

  const icuBedUtilizationRateRangeOption =
    getRangeOption(
      icuBedUtilizationRateRange,
      icuBedUtilizationRateRangeFrom,
      icuBedUtilizationRateRangeTo,
    ) || defaultRangeOption;

  const ventUtilizationRateRangeOption =
    getRangeOption(
      ventUtilizationRateRange,
      ventUtilizationRateRangeFrom,
      ventUtilizationRateRangeTo,
    ) || defaultRangeOption;

  const [
    avgCasesData,
    avgDeathsData,
    icuBedUtilizationRateData,
    ventUtilizationRateData,
  ] = await Promise.all([
    getAverageCases(avgCasesRangeOption.startDate, avgCasesRangeOption.endDate),
    getAverageDeaths(
      avgDeathsRangeOption.startDate,
      avgDeathsRangeOption.endDate,
    ),
    getICUBedUtilizationRate(
      icuBedUtilizationRateRangeOption.startDate,
      icuBedUtilizationRateRangeOption.endDate,
    ),
    getVentilatorUtilizationRate(
      ventUtilizationRateRangeOption.startDate,
      ventUtilizationRateRangeOption.endDate,
    ),
  ]);
  const date = await prisma.malaysiaVaccination.findFirst({
    select: {
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  const date_epi = await prisma.malaysiaEpidemic.findFirst({
    select: {
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  // Comparison of two dates, select the latest date
  if (!date || !date_epi || !date.date || !date_epi.date) {
    return <div>Loading...</div>;
  }
  const latest_date = date.date > date_epi.date ? date.date : date_epi.date;
  // Find the three highest cumulative cases_new of three states
  const stateData = await prisma.stateEpidemic.groupBy({
    by: ["date", "state", "cases_new", "deaths_new", "cases_recovered"],
    orderBy: {
      cases_new: "desc",
    },
    take: 180,
    where: {
      AND: {
        date: {
          gte: subDays(new Date(), 90),
          lte: new Date(),
        },
      },
    },
  });
  const chartData = stateData.map((d) => {
    return {
      date: d.date,
      state: d.state,
      cases_new: d.cases_new,
      deaths_new: d.deaths_new,
      cases_recovered: d.cases_recovered,
    };
  });
  return (
    <div className="min-h-screen bg-background/50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-foreground">
            A Summary of COVID-19 Data in Malaysia
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Last updated on {formatDate(latest_date)}
          </p>
        </div>
      </header>
      <div className="animate-in-index animate-fade-in container flex flex-1 flex-col items-center justify-center py-6">
        <main className="grid grid-flow-row-dense grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <DashboardVaccinationCard />
          <DashboardDeathsCard />
          <DashboardHospitalizationsCard />
          <DashboardNewCasesCard />
          <DashBarInteractive randomData={chartData} />
          {/* <section className="col-span-2 row-span-2 rounded-lg bg-card p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">Hospitalizations</h2>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Daily - first dose
                </p>
                <p className="text-2xl font-bold">24,039</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Daily - second dose
                </p>
                <p className="text-2xl font-bold">33,824</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Daily - booster or third dose
                </p>
                <p className="text-2xl font-bold">469,479</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total - first dose
                </p>
                <p className="text-2xl font-bold">51,207,496</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total - second dose
                </p>
                <p className="text-2xl font-bold">46,674,061</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total - booster or third dose
                </p>
                <p className="text-2xl font-bold">22,184,983</p>
              </div>
            </div>
            <a
              href="#"
              className="mt-4 block text-blue-500 hover:text-blue-700"
            >
              All vaccinations data
            </a>
          </section>
          <section className="col-span-4 row-span-2 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">
              Deaths within 28 days of positive test
            </h2>
            <p className="text-sm text-muted-foreground">
              Latest data provided on 10 December 2021
            </p>
            <p className="mt-2 text-2xl font-bold">Daily: 120</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Last 7 days: 831
            </p>
            <p className="mt-1 text-sm text-muted-foreground">No change</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Rate per 100,000 people: 1.1
            </p>
            <a
              href="#"
              className="mt-4 block text-blue-500 hover:text-blue-700"
            >
              All deaths data
            </a>
          </section> */}

          <div className="col-span-4">
            <ChartCard
              title="Average New Cases by State"
              description="Comparison of average new cases by state"
              queryKey="avgCasesRange"
              selectedRangeLabel={avgCasesRangeOption.label}
            >
              <AverageCasesChart
                data={avgCasesData.chartData}
              ></AverageCasesChart>
            </ChartCard>
          </div>
          <div className="col-span-4">
            <ChartCard
              title="Average New Deaths by State"
              description="Comparison of average new deaths by state"
              queryKey="avgDeathsRange"
              selectedRangeLabel={avgDeathsRangeOption.label}
            >
              <AverageDeathsChart
                data={avgDeathsData.chartData}
              ></AverageDeathsChart>
            </ChartCard>
          </div>
          <div className="col-span-4">
            <ChartCard
              title="ICU Bed Utilization Rate by State"
              description="Comparison of ICU bed utilization rate by state"
              queryKey="icuBedUtilizationRateRange"
              selectedRangeLabel={icuBedUtilizationRateRangeOption.label}
            >
              <ICUBedUtilizationRateChart
                data={icuBedUtilizationRateData.chartData}
              ></ICUBedUtilizationRateChart>
            </ChartCard>
          </div>
          <div className="col-span-4">
            <ChartCard
              title="Ventilator Utilization Rate by State"
              description="Comparison of ventilator utilization rate by state"
              queryKey="ventUtilizationRateRange"
              selectedRangeLabel={ventUtilizationRateRangeOption.label}
            >
              <VentilatorUtilizationRateChart
                data={ventUtilizationRateData.chartData}
              ></VentilatorUtilizationRateChart>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  );
}
