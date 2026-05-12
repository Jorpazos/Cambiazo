import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PROFILE_SELECT = {
  id: true,
  email: true,
  name: true,
  firstName: true,
  lastName: true,
  avatar: true,
  phone: true,
  province: true,
  city: true,
  birthDate: true,
  bio: true,
} as const;

export async function GET() {
  const auth = getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: auth.email },
    select: PROFILE_SELECT,
  });

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  const auth = getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { firstName, lastName, phone, province, city, birthDate, bio } = body as Record<string, unknown>;

  const data: Record<string, unknown> = {};
  if (typeof firstName === "string") data.firstName = firstName.trim() || null;
  if (typeof lastName === "string")  data.lastName  = lastName.trim()  || null;
  if (typeof phone === "string")     data.phone     = phone.trim()     || null;
  if (typeof province === "string")  data.province  = province.trim()  || null;
  if (typeof city === "string")      data.city      = city.trim()      || null;
  if (typeof bio === "string")       data.bio       = bio.trim().slice(0, 280) || null;
  if (typeof birthDate === "string" && birthDate) {
    const parsed = new Date(birthDate);
    if (!Number.isNaN(parsed.getTime())) data.birthDate = parsed;
  } else if (birthDate === null || birthDate === "") {
    data.birthDate = null;
  }

  const updated = await prisma.user.update({
    where: { email: auth.email },
    data,
    select: PROFILE_SELECT,
  });

  return NextResponse.json({ user: updated });
}
