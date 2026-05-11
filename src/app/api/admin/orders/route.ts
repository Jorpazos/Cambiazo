import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

const VALID_STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export async function GET() {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }
  // In production: const orders = await prisma.order.findMany({
  //   include: { user: true, product: true, listing: { include: { player: true } } },
  //   orderBy: { createdAt: "desc" },
  // });
  return NextResponse.json({ orders: [] });
}

export async function PATCH(req: NextRequest) {
  const user = getAuthUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Solo administradores." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID de orden requerido." }, { status: 400 });

  const body = await req.json();
  const { status } = body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
  }

  // In production: await prisma.order.update({ where: { id: parseInt(id) }, data: { status } });
  return NextResponse.json({ success: true, orderId: parseInt(id), status });
}
