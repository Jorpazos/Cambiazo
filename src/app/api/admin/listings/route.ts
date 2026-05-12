import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  return NextResponse.json({ listings: [] });
}

export async function DELETE() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  return NextResponse.json(
    { error: "La eliminación de publicaciones todavía no está habilitada." },
    { status: 501 },
  );
}
