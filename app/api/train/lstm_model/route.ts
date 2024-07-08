import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const res = await fetch(`http://127.0.0.1:8000/api/train/lstm_model`);
  const data = await res.json();
  return NextResponse.json({ data });
}
