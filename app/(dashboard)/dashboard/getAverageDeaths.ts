import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getAverageDeaths(
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
        deaths_new: true,
      }
    }),
  ]);

  const average_deaths: {
    state: string;
    avg_deaths: number;
  }[] = [];

  chartData.forEach((state) => {
    // Calculate average deaths for each state
    var avg_deaths = (state._sum.deaths_new ?? 0) / (state._count.id ?? 0);

    average_deaths.push({
      state: state.state,
      avg_deaths: avg_deaths,
    });
  });

  return {
    chartData: average_deaths
  };
}
