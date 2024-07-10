import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getVaccineBrandDistribution(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
  selectedState: string | undefined,
) {
  const recordedAtQuery: Prisma.StateVaccinationWhereInput["date"] = {};
  if (recordedAfter) recordedAtQuery.gte = recordedAfter;
  if (recordedBefore) recordedAtQuery.lte = recordedBefore;

  const [
    // Data
    chartData,
  ] = await Promise.all([
    prisma.stateVaccination.findMany({
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
        pending4: true,
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

  const aggregatedData = chartData.reduce(
    (acc, curr) => {
      acc.pfizer +=
        (curr.pfizer1 ?? 0) +
        (curr.pfizer2 ?? 0) +
        (curr.pfizer3 ?? 0) +
        (curr.pfizer4 ?? 0);
      acc.sinovac +=
        (curr.sinovac1 ?? 0) +
        (curr.sinovac2 ?? 0) +
        (curr.sinovac3 ?? 0) +
        (curr.sinovac4 ?? 0);
      acc.astra +=
        (curr.astra1 ?? 0) +
        (curr.astra2 ?? 0) +
        (curr.astra3 ?? 0) +
        (curr.astra4 ?? 0);
      acc.sinopharm +=
        (curr.sinopharm1 ?? 0) +
        (curr.sinopharm2 ?? 0) +
        (curr.sinopharm3 ?? 0) +
        (curr.sinopharm4 ?? 0);
      acc.cansino +=
        (curr.cansino ?? 0) + (curr.cansino3 ?? 0) + (curr.cansino4 ?? 0);
      acc.pending +=
        (curr.pending1 ?? 0) +
        (curr.pending2 ?? 0) +
        (curr.pending3 ?? 0) +
        (curr.pending4 ?? 0);

      return acc;
    },
    {
      pfizer: 0,
      sinovac: 0,
      astra: 0,
      sinopharm: 0,
      cansino: 0,
      pending: 0,
    },
  );

  const vaccineDistributionData = Object.entries(aggregatedData).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  return {
    chartData: vaccineDistributionData,
  };
}
