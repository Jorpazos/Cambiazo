import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "El registro con email todavía no está habilitado. Usá 'Registrarse con Google'." },
    { status: 501 },
  );
}
