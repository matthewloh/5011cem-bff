import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

export async function getVentilatorUtilizationRate(
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
        vent: true,
        vent_port: true,
        vent_used: true,
        vent_port_used: true,
      }
    }),
  ]);

  const vent_utilization_rates: {
    state: string;
    vent_util_rate: number;
    ventport_util_rate: number;
  }[] = [];

  chartData.forEach((state) => {
    // Calculate average ventilator and portable ventilator usage for each state
    var avg_vent = (state._sum.vent ?? 0) / (state._count.id ?? 0);
    var avg_ventport = (state._sum.vent_port ?? 0) / (state._count.id ?? 0);

    var avg_vent_used = (state._sum.vent_used ?? 0) / (state._count.id ?? 0);
    var avg_ventport_used = (state._sum.vent_port_used ?? 0) / (state._count.id ?? 0);

    var vent_util_rate = avg_vent !== 0 ? (avg_vent_used / avg_vent) * 100 : 0;
    var ventport_util_rate = avg_ventport !== 0 ? (avg_ventport_used / avg_ventport) * 100 : 0;

    vent_utilization_rates.push({
      state: state.state,
      vent_util_rate: vent_util_rate,
      ventport_util_rate: ventport_util_rate,
    });
  });
  
  return {
    chartData: vent_utilization_rates
  };
}
