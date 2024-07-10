import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getCasesByAgeGroup(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
  selectedState: string | undefined,
) {
  const recordedAtQuery: Prisma.StateEpidemicWhereInput["date"] = {};
  if (recordedAfter) recordedAtQuery.gte = recordedAfter;
  if (recordedBefore) recordedAtQuery.lte = recordedBefore;

  const [
    // Data
    chartData,
  ] = await Promise.all([
    prisma.stateEpidemic.findMany({
      select: {
        id: true,
        date: true,
        cases_0_4: true,
        cases_5_11: true,
        cases_12_17: true,
        cases_18_29: true,
        cases_30_39: true,
        cases_40_49: true,
        cases_50_59: true,
        cases_60_69: true,
        cases_70_79: true,
        cases_80: true,
      },
      where: {
        date: recordedAtQuery,
        state: selectedState,
      },
      orderBy: {
        date: "asc",
      },
    }),
  ]);

  const { array, format } = getChartDateArray(
    recordedAfter || startOfDay(chartData[0].date!),
    recordedBefore || new Date(),
  );

  return {
    chartData: chartData.map((day) => ({
      ...day,
      date: format(day.date!),
    })),
  };
}
