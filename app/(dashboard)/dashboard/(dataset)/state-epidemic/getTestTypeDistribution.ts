import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getTestTypeDistribution(
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
        rtk_ag: true,
        pcr: true,
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

  const aggregatedData = chartData.reduce((acc, curr) => {
    acc.rtk_ag += (curr.rtk_ag ?? 0) + (curr.rtk_ag ?? 0) + (curr.rtk_ag ?? 0) + (curr.rtk_ag ?? 0);
    acc.pcr += (curr.pcr ?? 0) + (curr.pcr ?? 0) + (curr.pcr ?? 0) + (curr.pcr ?? 0);

    return acc;
  }, {
    rtk_ag: 0,
    pcr: 0,
  });

  const vaccineDistributionData = Object.entries(aggregatedData).map(([name, value]) => ({
    name,
    value
  }));
  
  return {
    chartData: vaccineDistributionData
  };
}
