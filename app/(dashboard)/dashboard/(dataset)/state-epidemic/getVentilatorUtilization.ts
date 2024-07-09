import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getVentilatorUtilization(
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
        vent: true,
        vent_used: true,
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
      date: format(day.date!)
    }))
  };
}
