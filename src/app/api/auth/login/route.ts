import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "El login con email todavía no está habilitado. Usá 'Continuar con Google'." },
    { status: 501 },
  );
}
