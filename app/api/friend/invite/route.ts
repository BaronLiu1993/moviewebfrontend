import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";

  const response = await fetch("http://localhost:8000/v1/api/friend/invite", {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });

  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return NextResponse.json(data, { status: response.status });
  } catch {
    return new NextResponse(text, { status: response.status });
  }
}
