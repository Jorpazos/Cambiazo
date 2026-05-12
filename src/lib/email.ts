import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM ?? SMTP_USER;

let cached: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cached) return cached;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP no está configurado. Faltan SMTP_HOST / SMTP_USER / SMTP_PASS en las env vars.",
    );
  }
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return cached;
}

export async function sendVerificationEmail(to: string, code: string) {
  const t = getTransporter();
  const from = `"Cambiazo" <${SMTP_FROM}>`;
  const subject = `${code} es tu código de verificación`;
  const text =
    `Tu código de verificación es: ${code}\n\n` +
    `Vence en 5 minutos.\n\n` +
    `Si no fuiste vos, ignorá este mensaje y cambiá tu contraseña si tenés cuenta.\n\n` +
    `— Cambiazo`;
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;background:#0a0e1f;color:#fff;padding:32px;border-radius:16px;max-width:480px;margin:0 auto;">
      <h1 style="margin:0 0 8px 0;font-size:20px;">Cambiazo</h1>
      <p style="color:#bcd;margin:0 0 24px 0;font-size:14px;">Tu código de verificación</p>
      <div style="background:#111a36;border:1px solid #233;border-radius:12px;padding:24px;text-align:center;margin-bottom:16px;">
        <p style="margin:0 0 8px 0;font-size:12px;color:#8aa;letter-spacing:2px;text-transform:uppercase;">Código</p>
        <p style="margin:0;font-size:32px;font-weight:900;letter-spacing:8px;color:#fbbf24;">${code}</p>
      </div>
      <p style="color:#aac;font-size:13px;line-height:1.5;margin:0 0 8px 0;">Vence en <strong>5 minutos</strong>.</p>
      <p style="color:#789;font-size:12px;line-height:1.5;margin:0;">Si no fuiste vos, ignorá este mensaje.</p>
    </div>
  `;

  await t.sendMail({ from, to, subject, text, html });
}
