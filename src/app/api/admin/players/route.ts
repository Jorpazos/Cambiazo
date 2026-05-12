import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  return NextResponse.json({ players: [] });
}

export async function POST() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  return NextResponse.json(
    { error: "La creación de jugadores todavía no está habilitada." },
    { status: 501 },
  );
}
