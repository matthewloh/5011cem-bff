import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getICUBedUtilizationRate(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
) {
  
  const recordedAtQuery: Prisma.StateEpidemicWhereInput["date"] = {};
  if (recordedAfter) recordedAtQuery.gte = recordedAfter;
  if (recordedBefore) recordedAtQuery.lte = recordedBefore;
  
  const [
    // Data
    chartData,
  ] = await Promise.all([
    prisma.stateEpidemic.groupBy({
      by: ["state"],
      where: {
        date: recordedAtQuery,
      },
      _count: {
        id: true,
      },
      _sum: {
        beds_icu_total: true,
        icu_pui: true,
        icu_covid: true,
        icu_noncovid: true,
      }
    }),
  ]);

  const icu_utilization_rates: {
    state: string;
    utilization_rate: number;
  }[] = [];

  chartData.forEach((state) => {
    // Calculate average ICU bed utilization rate for each state
    var avg_beds_icu_total = (state._sum.beds_icu_total ?? 0) / (state._count.id ?? 0);
    var avg_icu_pui = (state._sum.icu_pui ?? 0) / (state._count.id ?? 0);
    var avg_icu_covid = (state._sum.icu_covid ?? 0) / (state._count.id ?? 0);
    var avg_icu_noncovid = (state._sum.icu_noncovid ?? 0) / (state._count.id ?? 0);

    var utilization_rate = ((avg_icu_pui + avg_icu_covid + avg_icu_noncovid) / avg_beds_icu_total) * 100;

    icu_utilization_rates.push({
      state: state.state,
      utilization_rate: utilization_rate,
    });
  });

  return {
    chartData: icu_utilization_rates
  };
}
