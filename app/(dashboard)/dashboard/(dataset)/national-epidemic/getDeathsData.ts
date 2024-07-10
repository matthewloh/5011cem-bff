import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";

import { startOfDay } from "date-fns";
export async function getDeathsData(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
) {
  const recordedAtQuery: Prisma.MalaysiaEpidemicWhereInput["date"] = {};
  if (recordedAfter) recordedAtQuery.gte = recordedAfter;
  if (recordedBefore) recordedAtQuery.lte = recordedBefore;

  const [chartData] = await Promise.all([
    prisma.malaysiaEpidemic.findMany({
      select: {
        id: true,
        date: true,
        deaths_new: true,
        deaths_bid: true,
        deaths_new_dod: true,
        deaths_bid_dod: true,
        deaths_unvax: true,
        deaths_pvax: true,
        deaths_fvax: true,
        deaths_boost: true,
      },
      where: {
        date: recordedAtQuery,
      },
      orderBy: {
        date: "asc",
      },
    }),
  ]);
  const { format } = getChartDateArray(
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
