import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import { validateEmail } from "@/lib/passwordPolicy";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { email, password } = body as Record<string, unknown>;
  if (typeof email !== "string" || !validateEmail(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Contraseña obligatoria." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  // Generic error so we don't leak whether the email exists
  const genericError = NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });

  if (!user || !user.password) {
    return genericError;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return genericError;
  }

  if (!user.verified) {
    return NextResponse.json(
      { error: "Tu cuenta no está verificada. Revisá tu email para el código.", needsVerification: true, email: normalizedEmail },
      { status: 403 },
    );
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  const res = NextResponse.json({ success: true, isAdmin: user.isAdmin });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
