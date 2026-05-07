import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { FEATURED_LISTINGS } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  // In production: const listings = await prisma.listing.findMany({ include: { user: true, player: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ listings: FEATURED_LISTINGS });
}

export async function DELETE(req: NextRequest) {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  // In production: await prisma.listing.update({ where: { id: parseInt(id!) }, data: { status: "CANCELLED" } });
  return NextResponse.json({ success: true, deletedId: id });
}
