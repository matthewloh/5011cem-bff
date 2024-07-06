import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getThirdDoseByBrand(
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
        pfizer3: true,
        sinovac3: true,
        astra3: true,
        sinopharm3: true,
        cansino3: true,
        pending3: true
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
