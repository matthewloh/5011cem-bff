import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getAverageCases(
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
        cases_new: true,
      }
    }),
  ]);

  const average_cases: {
    state: string;
    avg_cases: number;
  }[] = [];

  chartData.forEach((state) => {
    // Calculate average cases for each state
    var avg_cases = (state._sum.cases_new ?? 0) / (state._count.id ?? 0);

    average_cases.push({
      state: state.state,
      avg_cases: avg_cases,
    });
  });
  
  return {
    chartData: average_cases
  };
}
