import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { validateEmail, validatePassword } from "@/lib/passwordPolicy";

const CODE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function generateCode() {
  // 6-digit numeric, cryptographically random
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { name, email, password } = body as Record<string, unknown>;
  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Ingresá tu nombre." }, { status: 400 });
  }
  if (typeof email !== "string" || !validateEmail(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }
  if (typeof password !== "string") {
    return NextResponse.json({ error: "La contraseña es obligatoria." }, { status: 400 });
  }
  const pwCheck = validatePassword(password);
  if (!pwCheck.ok) {
    return NextResponse.json({ error: pwCheck.error }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (existing?.verified) {
    return NextResponse.json(
      { error: "Ese email ya está registrado. Ingresá con tu contraseña." },
      { status: 409 },
    );
  }

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CODE_TTL_MS);

  if (existing) {
    // Unverified user already exists — refresh password + code
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        name: name.trim(),
        password: passwordHash,
        verificationCodeHash: codeHash,
        verificationCodeExpiresAt: expiresAt,
        verificationCodeSentAt: now,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name.trim(),
        password: passwordHash,
        verified: false,
        verificationCodeHash: codeHash,
        verificationCodeExpiresAt: expiresAt,
        verificationCodeSentAt: now,
      },
    });
  }

  try {
    await sendVerificationEmail(normalizedEmail, code);
  } catch (err) {
    console.error("[register-email] sendVerificationEmail failed:", err);
    return NextResponse.json(
      { error: "No pudimos enviar el código de verificación. Probá de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, email: normalizedEmail });
}
