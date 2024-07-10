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
import { Syringe } from "lucide-react";

export default async function DashboardVaccinationCard() {
  const { date } = (await prisma.malaysiaVaccination.findFirst({
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
  })) as { date: Date };
  const vacData = await prisma.malaysiaVaccination.findMany({
    orderBy: {
      date: "desc",
    },
    take: 14,
    select: {
      date: true,
      daily: true,
    },
  });
  const data = await prisma.malaysiaVaccination.aggregate({
    _sum: {
      daily: true,
    },
    _count: {
      daily: true,
    },
    _max: {
      daily: true,
    },
    _min: {
      daily: true,
    },
    _avg: {
      daily: true,
    },
  });

  return (
    <Card className="col-span-2 row-span-1 rounded-lg bg-card p-6 shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex flex-row items-center gap-2">
            <Syringe className="text-emerald-400 animate-in-index"/>
            Vaccinations
          </div>
        </CardTitle>
        <CardDescription>
          Data collected up to {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Highest number of daily vaccinations: ${data._max.daily}`}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col">
          <Link
            href="/dashboard/state-vaccinations"
            className="text-indigo-400"
          >
            <p>View State Vaccination Data</p>
          </Link>
          <Link
            href="/dashboard/national-vaccinations"
            className="text-indigo-400"
          >
            <p>View National Vaccination Data</p>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
