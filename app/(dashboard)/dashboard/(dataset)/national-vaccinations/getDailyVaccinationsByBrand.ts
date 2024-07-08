import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getDailyVaccinationsByBrand(
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
        pfizer2: true,
        pfizer3: true,
        pfizer4: true,
        sinovac1: true,
        sinovac2: true,
        sinovac3: true,
        sinovac4: true,
        astra1: true,
        astra2: true,
        astra3: true,
        astra4: true,
        sinopharm1: true,
        sinopharm2: true,
        sinopharm3: true,
        sinopharm4: true,
        cansino: true,
        cansino3: true,
        cansino4: true,
        pending1: true,
        pending2: true,
        pending3: true,
        pending4: true
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
        date: format(day.date!),
        pfizer: (day.pfizer1 ?? 0) + (day.pfizer2 ?? 0) + (day.pfizer3 ?? 0) + (day.pfizer4 ?? 0),
        sinovac: (day.sinovac1 ?? 0) + (day.sinovac2 ?? 0) + (day.sinovac3 ?? 0) + (day.sinovac4 ?? 0),
        astra: (day.astra1 ?? 0) + (day.astra2 ?? 0) + (day.astra3 ?? 0) + (day.astra3 ?? 0),
        sinopharm: (day.sinopharm1 ?? 0) + (day.sinopharm2 ?? 0) + (day.sinopharm3 ?? 0) + (day.sinopharm4 ?? 0),
        cansino: (day.cansino ?? 0) + (day.cansino3 ?? 0) + (day.cansino4 ?? 0),
        pending: (day.pending1 ?? 0) + (day.pending2 ?? 0) + (day.pending3 ?? 0) + (day.pending4 ?? 0)
    }))
  };
}
