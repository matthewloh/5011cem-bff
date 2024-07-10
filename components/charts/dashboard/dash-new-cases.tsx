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
import { CirclePlus } from "lucide-react";

export async function DashboardNewCasesCard() {
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
      cases_new: true,
    },
    _count: {
      cases_new: true,
    },
    _max: {
      state: true,
      cases_new: true,
    },
    _min: {
      cases_new: true,
    },
    _avg: {
      cases_new: true,
    },
    take: 14 * 7,
    orderBy: {
      date: "desc",
    },
  });

  return (
    <Card className="col-span-1 row-span-2 rounded-lg bg-card p-6 shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex flex-row items-center gap-2">
            <CirclePlus className="text-cyan-400" />
            New Cases
          </div>
        </CardTitle>
        <CardDescription>
          Data collected up to {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && (
          <div>
            <p>Total new cases: {data._sum.cases_new}</p>
            <p>Total number of records: {data._count.cases_new}</p>
            <p>
              Highest cases in a state: {data._max.cases_new} in{" "}
              {data._max.state}
            </p>
            <p>Minimum cases: {data._min.cases_new}</p>
          </div>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default DashboardNewCasesCard;
