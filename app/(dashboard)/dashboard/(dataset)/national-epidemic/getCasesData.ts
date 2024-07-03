import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";
export async function getTotalCases(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
) {
  const recordedAtQuery: Prisma.MalaysiaEpidemicWhereInput["date"] = {};
  if (recordedAfter) recordedAtQuery.gte = recordedAfter;
  if (recordedBefore) recordedAtQuery.lte = recordedBefore;

  const [
    // data
    chartData,
  ] = await Promise.all([
    // prisma.malaysiaEpidemic.aggregate({
    //   _sum: {
    //     cases_new: true,
    //     cases_import: true,
    //     cases_recovered: true,
    //     cases_active: true,
    //     cases_cluster: true,
    //     cases_unvax: true,
    //     cases_boost: true,
    //     cases_pvax: true,
    //     cases_fvax: true,
    //     // cases_0_4: true,
    //     // cases_5_11: true,
    //     // cases_12_17: true,
    //     // cases_18_29: true,
    //     // cases_30_39: true,
    //     // cases_40_49: true,
    //     // cases_50_59: true,
    //     // cases_60_69: true,
    //     // cases_70_79: true,
    //     // cases_80: true,
    //   },
    //   _count: true,
    // }),
    prisma.malaysiaEpidemic.findMany({
      select: {
        id: true,
        date: true,
        cases_new: true,
        cases_import: true,
        cases_recovered: true,
        cases_active: true,
        cases_cluster: true,
        cases_unvax: true,
        cases_boost: true,
        cases_pvax: true,
        cases_fvax: true,
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

  // console.log(array, format);
  // console.log(data);
  // console.log(chartData);
  // console.log(array);
  // const dayArray = array.map((date) => {
  //   return {
  //     date: format(date),
  //     totalCases: 0,
  //   };
  // });

  //   return { chartData : chartData.reduce((data, case) => {
  //     const formattedDate = format(case!);
  //     const entry = dayArray.find(day=> day.date === formattedDate);
  //     if (entry == null) return data
  //     entry.totalCases = case.cases_new!;
  //     return data;
  //   }, dayArray),
  //   totalCases: data._sum.cases_new!,
  //   totalDeaths: data._sum.deaths_new!,
  //   totalRecovered: data._sum.cases_recovered!,
  //   totalActive: data._sum.cases_active!,
  // };
  return {
    chartData: chartData.map((day) => ({
      ...day,
      date: format(day.date!),
    })),
  };
}
