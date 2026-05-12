import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { validateEmail } from "@/lib/passwordPolicy";

const CODE_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 30 * 1000; // 30s between resends

function generateCode() {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;
  if (typeof email !== "string" || !validateEmail(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    // Don't leak whether the email exists
    return NextResponse.json({ success: true });
  }
  if (user.verified) {
    return NextResponse.json(
      { error: "Tu cuenta ya estaba verificada." },
      { status: 400 },
    );
  }

  if (user.verificationCodeSentAt) {
    const elapsed = Date.now() - user.verificationCodeSentAt.getTime();
    if (elapsed < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
      return NextResponse.json(
        { error: `Esperá ${waitSeconds}s antes de pedir otro código.` },
        { status: 429 },
      );
    }
  }

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const now = new Date();

  await prisma.user.update({
    where: { email: normalizedEmail },
    data: {
      verificationCodeHash: codeHash,
      verificationCodeExpiresAt: new Date(now.getTime() + CODE_TTL_MS),
      verificationCodeSentAt: now,
    },
  });

  try {
    await sendVerificationEmail(normalizedEmail, code);
  } catch (err) {
    console.error("[resend-code] sendVerificationEmail failed:", err);
    return NextResponse.json(
      { error: "No pudimos enviar el código. Probá de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
