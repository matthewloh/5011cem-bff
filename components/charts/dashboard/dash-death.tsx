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

  return (
    <Card className="col-span-1 row-span-2 rounded-lg bg-card p-6 shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Vaccinations</CardTitle>
        <CardDescription>
          Data collected up to {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Highest number of deaths : ${data._max.deaths_new} recorded ${formatDate(data._max.date!)}`}</p>
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
