import { NextRequest, NextResponse } from "next/server";

async function proxy(request: NextRequest, method: string) {
  const body = await request.json();
  const token = request.headers.get("Authorization") || "";

  const response = await fetch("http://localhost:8000/v1/api/list/items", {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
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

export async function POST(request: NextRequest) {
  return proxy(request, "POST");
}

export async function DELETE(request: NextRequest) {
  return proxy(request, "DELETE");
}
