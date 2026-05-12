import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  return NextResponse.json({ orders: [] });
}

export async function PATCH() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  return NextResponse.json(
    { error: "La gestión de órdenes todavía no está habilitada." },
    { status: 501 },
  );
}
