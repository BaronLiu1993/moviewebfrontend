import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "40";
  const token = request.headers.get("Authorization") || "";
  const response = await fetch(
    `http://localhost:8000/v1/api/feed/generate-feed?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}
