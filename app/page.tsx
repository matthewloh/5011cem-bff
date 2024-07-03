import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { stateArray } from "@/utils/constants/stateArray";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 14 days
  // redirect("/home");
  // const malaysiavaccinations = await prisma.malaysiaVaccination.findMany({
  //   take: 14,
  // });
  // const malaysiaepidemics = await prisma.malaysiaEpidemic.findMany({
  //   take: 14,
  // });
  // // 1 day for each of the 16 states
  // const statevaccinations = await prisma.stateVaccination.findMany({
  //   take: 16,
  // });
  // const stateepidemics = await prisma.stateEpidemic.findMany({
  //   take: 16,
  // });
  // useEffect(() => {
  //   fetch("/api/python")
  //     .then((response) => response.text())
  //     .then((responseData) => setData(responseData))
  //     .catch((error) => console.error(error));
  // }, []);
  // const data = await fetch(
  //   "http://127.0.0.1:3000/api/python/Pulau Pinang",
  // ).then((response) => response.json());
  // return (
  //   // <>
  //   //   <div className="flex flex-col gap-4">
  //   //     <h1 className="font-mono">
  //   //       To use the Prisma Python & FastAPI API hosted on a FastAPI Instance,{" "}
  //   //       access state epidemic data by using going to /api/state_name; for
  //   //       example:
  //   //     </h1>
  //   //     <div className="flex flex-row gap-4 p-4">
  //   //       {stateArray.map((v) => (
  //   //         <Link key={v} href={`/api/python/${v}`}>
  //   //           <span>{`${v}`}</span>
  //   //         </Link>
  //   //       ))}
  //   //     </div>
  //   //     {/* Prettify the json */}
  //   //     <h1 className="font-mono">
  //   //       Fetch to http://127.0.0.1:3000/api/python/Pulau Pinang (Rewrites to
  //   //       :8000)
  //   //     </h1>
  //   //     <pre className="overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  //   //     <h1 className="font-mono">Malaysia Vaccination Data</h1>
  //   //     <div className="flex flex-wrap gap-4">
  //   //       {malaysiavaccinations.map((v) => (
  //   //         <div key={v.id}>
  //   //           <h1>{`${v.date}`}</h1>
  //   //           <h2>{`Total Vaccinated: ${v.daily}`}</h2>
  //   //           <h2>{`Cumulative: ${v.cumul}`}</h2>
  //   //         </div>
  //   //       ))}
  //   //     </div>
  //   //     <h1 className="font-mono">Malaysia Epidemic Data</h1>
  //   //     <div className="flex flex-wrap gap-4">
  //   //       {malaysiaepidemics.map((v) => (
  //   //         <div key={v.id}>
  //   //           <h1>{`${v.date}`}</h1>
  //   //           <h2>{`New Cases: ${v.cases_new}`}</h2>
  //   //           <h2>{`New Deaths: ${v.deaths_new}`}</h2>
  //   //         </div>
  //   //       ))}
  //   //     </div>
  //   //     <h1 className="font-mono">State Vaccination Data</h1>
  //   //     <div className="flex flex-wrap gap-4">
  //   //       {statevaccinations.map((v) => (
  //   //         <div key={v.id}>
  //   //           <h1>{`${v.date} - ${v.state}`}</h1>
  //   //           <h2>{`Total Vaccinated: ${v.daily}`}</h2>
  //   //           <h2>{`Cumulative: ${v.cumul}`}</h2>
  //   //         </div>
  //   //       ))}
  //   //     </div>
  //   //     <h1 className="font-mono">State Epidemic Data</h1>
  //   //     <div className="flex flex-wrap gap-4">
  //   //       {stateepidemics.map((v) => (
  //   //         <div key={v.id}>
  //   //           <h1>{`${v.date}`}</h1>
  //   //           <h2>{`New Cases: ${v.cases_new}`}</h2>
  //   //           <h2>{`New Deaths: ${v.deaths_new}`}</h2>
  //   //         </div>
  //   //       ))}
  //   //     </div>
  //   //   </div>
  //   // </>
  // );
}
