import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { email, code } = body as Record<string, unknown>;
  if (typeof email !== "string" || typeof code !== "string") {
    return NextResponse.json({ error: "Email y código son obligatorios." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedCode = code.trim();
  if (!/^\d{6}$/.test(trimmedCode)) {
    return NextResponse.json({ error: "El código tiene que tener 6 dígitos." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    return NextResponse.json({ error: "No encontramos esa cuenta." }, { status: 404 });
  }
  if (user.verified) {
    return NextResponse.json(
      { error: "Tu cuenta ya estaba verificada. Iniciá sesión con tu contraseña." },
      { status: 400 },
    );
  }
  if (!user.verificationCodeHash || !user.verificationCodeExpiresAt) {
    return NextResponse.json(
      { error: "No hay un código activo. Pedí uno nuevo." },
      { status: 400 },
    );
  }
  if (user.verificationCodeExpiresAt.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "El código venció. Pedí uno nuevo." },
      { status: 400 },
    );
  }

  const match = await bcrypt.compare(trimmedCode, user.verificationCodeHash);
  if (!match) {
    return NextResponse.json({ error: "Código incorrecto." }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { email: normalizedEmail },
    data: {
      verified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      verificationCodeSentAt: null,
    },
  });

  const token = signToken({
    userId: updated.id,
    email: updated.email,
    isAdmin: updated.isAdmin,
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
