import prisma from "@/lib/db";
import { formatDate, getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";

import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfWeek,
  interval,
  max,
  min,
  startOfDay,
  startOfWeek,
} from "date-fns";

export async function getCumulativeTestingData(
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
        rtk_ag: true,
        pcr: true,
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
