import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { FEATURED_LISTINGS } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  let listings = [...FEATURED_LISTINGS];

  if (type && type !== "ALL") {
    listings = listings.filter((l) => l.type === type);
  }
  if (search) {
    const q = search.toLowerCase();
    listings = listings.filter(
      (l) =>
        l.player.name.toLowerCase().includes(q) ||
        l.player.country.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ listings, total: listings.length });
}

export async function POST(req: NextRequest) {
  const user = getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado. Iniciá sesión." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, playerId, price, description } = body;

    if (!type || !playerId) {
      return NextResponse.json({ error: "Tipo y jugador son obligatorios." }, { status: 400 });
    }

    // In production: await prisma.listing.create({ data: { type, playerId, price, description, userId: user.userId } })
    const mockListing = { id: Date.now(), type, playerId, price, description, userId: user.userId, status: "ACTIVE", createdAt: new Date().toISOString() };
    return NextResponse.json({ listing: mockListing }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
