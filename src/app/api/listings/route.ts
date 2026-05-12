import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ listings: [], total: 0 });
}

export async function POST() {
  return NextResponse.json(
    { error: "La creación de publicaciones todavía no está habilitada." },
    { status: 501 },
  );
}
