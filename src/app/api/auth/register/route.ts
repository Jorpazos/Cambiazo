import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, province, city } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nombre, email y contraseña son obligatorios." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
    }

    // In production, check for duplicate email and save to DB:
    // const existing = await prisma.user.findUnique({ where: { email } });
    // if (existing) return NextResponse.json({ error: "El email ya está registrado." }, { status: 409 });
    // const hashed = await bcrypt.hash(password, 12);
    // const user = await prisma.user.create({ data: { name, email, password: hashed, province, city } });

    const mockUser = { id: 999, email, name, isAdmin: false };
    const token = signToken({ userId: mockUser.id, email: mockUser.email, isAdmin: mockUser.isAdmin });

    const res = NextResponse.json({ success: true, user: mockUser }, { status: 201 });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
