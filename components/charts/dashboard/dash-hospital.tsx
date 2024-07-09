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
        <CardTitle className="text-2xl font-bold">Hospitalizations</CardTitle>
        <CardDescription>
          Data collected up to {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && (
          <div>
            <p>Total beds: {data._sum.beds}</p>
            <p>Total hospitalizations: {data._sum.hosp_covid}</p>
            <p>Total covid beds: {data._sum.beds_covid}</p>
            <p>
              Highest number of hospitalizations: {data._max.hosp_covid}{" "}
              recorded {formatDate(data._max.date!)} in {data._max.state}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default DashboardHospitalizationsCard;
