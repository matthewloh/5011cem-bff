import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getFirstDoseByBrand(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
) {
  const recordedAtQuery: Prisma.MalaysiaVaccinationWhereInput["date"] = {};
  if (recordedAfter) recordedAtQuery.gte = recordedAfter;
  if (recordedBefore) recordedAtQuery.lte = recordedBefore;

  const [
    // Data
    chartData,
  ] = await Promise.all([
    prisma.malaysiaVaccination.findMany({
      select: {
        id: true,
        date: true,
        pfizer1: true,
        sinovac1: true,
        astra1: true,
        sinopharm1: true,
        cansino: true,
        pending1: true
      },
      where: {
        date: recordedAtQuery,
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
    }))
  };
}
