import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nombre, email y mensaje son obligatorios." }, { status: 400 });
    }

    // In production, send email via nodemailer:
    // const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, ... });
    // await transporter.sendMail({ from: email, to: "info@cambiazo.ar", subject: `[Cambiazo] ${subject}`, text: message });
    // Also save to DB: await prisma.message.create({ data: { name, email, subject, body: message } });

    console.log("[Contact Form]", { name, email, subject, message });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al enviar el mensaje." }, { status: 500 });
  }
}
