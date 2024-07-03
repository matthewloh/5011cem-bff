import React from "react";
import prisma from "@/lib/db";
import DatasetViewOptions from "@/components/datasetviewheader";
import { BarChart } from "@/components/BarChart";
import BarChartClient from "@/components/charts/BarChartClient";

export default async function NationalEpidemic() {
  const rawData = await prisma.malaysiaEpidemic.findMany({
    where: {
      date: {
        gte: new Date("2021-01-01"),
        lte: new Date("2021-01-31"),
      },
    },
    take: 5,
    select: {
      id: true,
      date: true,
      cases_new: true,
      deaths_new: true,
      cases_recovered: true,
      cases_active: true,
    },
  });
  const data = rawData.map((v) => ({
    ...v,
    date: v.date?.toISOString().split("T")[0]!,
  }));
  const pythonCall = await fetch(
    "http://127.0.0.1:3000/api/python/Pulau Pinang",
    // "http://127.0.0.1:3000/api/python/Pulau Pinang/vaccination"
  ).then((response) => response.json());
  console.log(data);
  return (
    <div className="p-2">
      <h2 className="m-6 text-3xl font-bold">National Epidemic Dataset</h2>
      <DatasetViewOptions />

      {/* <div className="grid grid-cols-2 gap-4">
        {data.map((v) => (
          <div key={v.id}>
            <BarChartClient data={data} />
          </div>
        ))}
      </div> */}
      <pre>{JSON.stringify(pythonCall, null, 2)}</pre>
      <BarChartClient data={data} />
    </div>
  );
}
