import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }

  try {
    const { name, country, number, position, section, image } = await req.json();
    if (!name || !country || !number) {
      return NextResponse.json({ error: "Nombre, país y número son obligatorios." }, { status: 400 });
    }

    // In production: await prisma.player.create({ data: { name, country, number: parseInt(number), position, section, image } });
    const mockPlayer = { id: Date.now(), name, country, number: parseInt(number), position, section, image };
    return NextResponse.json({ player: mockPlayer }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

export async function GET() {
  // In production: const players = await prisma.player.findMany({ orderBy: { number: "asc" } });
  return NextResponse.json({ players: [] });
}
