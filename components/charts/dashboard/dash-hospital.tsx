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
import { Hospital } from "lucide-react";
import Link from "next/link";

export async function DashboardHospitalizationsCard() {
  const { date } = (await prisma.stateEpidemic.findFirst({
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
  })) as { date: Date };
  const data = await prisma.stateEpidemic.aggregate({
    _sum: {
      beds: true,
      beds_covid: true,
      hosp_covid: true,
    },
    _max: {
      state: true,
      date: true,
      hosp_covid: true,
    },
    // _min: {},
    // _avg: {},
    // orderBy: {
    //   date: "desc",
    // },
  });

  return (
    <Card className="col-span-2 row-span-1 rounded-lg bg-card p-6 shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex flex-row items-center gap-2">
            <Hospital className="text-rose-400" />
            Hospitalizations
          </div>
        </CardTitle>
        <CardDescription>
          Data collected up to {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && (
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-bold">Total beds: {data._sum.beds}</p>
            <p className="text-2xl font-semibold">
              Total Hospitalizations: {data._sum.hosp_covid}
            </p>
            <p className="text-xl font-bold">
              Total Covid Beds: {data._sum.beds_covid}
            </p>
            <p className="text-lg font-bold">
              Highest Number of Hospitalizations: {data._max.hosp_covid}{" "}
              recorded {formatDate(data._max.date!)} in {data._max.state}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col">
          <Link href="/dashboard/state-epidemic" className="text-indigo-400">
            <p>View State Epidemic Data</p>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashboardHospitalizationsCard;
