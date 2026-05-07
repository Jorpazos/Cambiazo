import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son obligatorios." }, { status: 400 });
    }

    // In production, replace with real DB lookup:
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) return NextResponse.json({ error: "Credenciales incorrectas." }, { status: 401 });
    // const valid = await bcrypt.compare(password, user.password);
    // if (!valid) return NextResponse.json({ error: "Credenciales incorrectas." }, { status: 401 });

    // Mock: accept admin@cambiazo.ar / admin123 as admin, anything else as regular user
    const isAdmin = email === "admin@cambiazo.ar" && password === "admin123";
    if (!isAdmin && (email === "admin@cambiazo.ar" || password.length < 6)) {
      return NextResponse.json({ error: "Credenciales incorrectas." }, { status: 401 });
    }

    const mockUser = { id: isAdmin ? 1 : 2, email, name: isAdmin ? "Admin" : "Usuario", isAdmin };
    const token = signToken({ userId: mockUser.id, email: mockUser.email, isAdmin: mockUser.isAdmin });

    const res = NextResponse.json({ success: true, user: mockUser, isAdmin: mockUser.isAdmin });
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
