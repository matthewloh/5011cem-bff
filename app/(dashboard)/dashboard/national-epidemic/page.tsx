import React from "react";
import prisma from "@/lib/db";
export default async function NationalEpidemic() {
  const data = await prisma.malaysiaEpidemic.count();
  const pythonCall = await fetch(
    "http://127.0.0.1:3000/api/python/Pulau Pinang"
    // "http://127.0.0.1:3000/api/python/Pulau Pinang/vaccination"
  ).then((response) => response.json());
  console.log(data);
  return (
    <div className="p-6">
      <div>National Epidemic Dataset</div>
      <div>{data}</div>
      <pre>{JSON.stringify(pythonCall, null, 2)}</pre>
    </div>
  );
}
