import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/formatters";
import Link from "next/link";
import { RiSkull2Fill } from "@remixicon/react";
import { BarChartWithLabel } from "./BarChartWithLabel";
import { subDays } from "date-fns";

export async function DashboardDeathsCard() {
  const { date } = (await prisma.malaysiaEpidemic.findFirst({
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
  })) as { date: Date };
  const vacData = await prisma.malaysiaEpidemic.findMany({
    orderBy: {
      date: "desc",
    },
    take: 14,
    select: {
      date: true,
    },
  });
  const data = await prisma.malaysiaEpidemic.aggregate({
    _sum: { deaths_new: true },
    _count: { deaths_new: true },
    _max: { date: true, deaths_new: true },
    // _min: {},
    // _avg: {},
  });
  const deathsData = await prisma.malaysiaEpidemic.aggregate({
    _sum: {
      deaths_bid: true,
      deaths_new: true,
      deaths_bid_dod: true,
      deaths_new_dod: true,
      deaths_boost: true,
      deaths_fvax: true,
      deaths_pvax: true,
      deaths_unvax: true,
    },
    orderBy: {
      date: "desc",
    },
    take: 60,
  });
  // const stateData = await prisma.stateEpidemic.groupBy({
  //   by: [
  //     "date",
  //     "state",
  //     "deaths_new",
  //     "deaths_unvax",
  //     "deaths_pvax",
  //     "deaths_fvax",
  //   ],
  //   orderBy: {
  //     date: "desc",
  //   },
  //   // take: 14 * 5, // 14 states * 5 days
  //   where: {
  //     date: {
  //       gte: new Date("2024-01-01"),
  //       lte: new Date(),
  //     },
  //   },
  //   _sum: {
  //     deaths_new: true,
  //     deaths_unvax: true,
  //     deaths_fvax: true,
  //     deaths_pvax: true,
  //     deaths_boost: true,
  //   },
  // });
  // const chartData = stateData.map((d) => {
  //   return {
  //     date: d.date,
  //     deaths_new: d.deaths_new,
  //     deaths_unvax: d.deaths_unvax,
  //     deaths_pvax: d.deaths_pvax,
  //     deaths_fvax: d.deaths_fvax,
  //   };
  // });
  // console.log()
  return (
    <Card className="col-span-1 row-span-2 rounded-lg bg-card shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex flex-row items-center gap-2">
            <RiSkull2Fill className="text-gray-400" />
            Deaths
          </div>
        </CardTitle>
        <CardDescription>
          Data collected up to {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold">
            {data._sum.deaths_new!.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Total Deaths in Malaysia
          </p>
          <p className="text-sm text-muted-foreground">
            {deathsData._sum!.deaths_new} deaths in the last 60 days
          </p>
        </div>
        {/* <BarChartWithLabel /> */}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col">
          <Link href="/dashboard/state-epidemic" className="text-indigo-400">
            <p>View State Epidemic Data</p>
          </Link>
          <Link
            href="/dashboard/national-vaccinations"
            className="text-indigo-400"
          >
            <p>View National Epidemic Data</p>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashboardDeathsCard;
