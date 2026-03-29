import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, files, type } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "002ydy02@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD || "",
      },
    });

    const fileList = files?.length
      ? `\n\nПрикрепленные файлы:\n${files.map((f: string) => `• ${f}`).join("\n")}`
      : "";

    const subject = type === 'price'
      ? `Запрос прайс-листа от ${name}`
      : `Новая заявка на расчет сметы от ${name}`;

    const text = type === 'price'
      ? `Имя: ${name}\nТелефон: ${phone}\n(Запрошен прайс-лист)`
      : `Имя: ${name}\nТелефон: ${phone}${fileList}`;

    const html = type === 'price'
      ? `
        <h2>Запрос на получение прайс-листа</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
      `
      : `
        <h2>Новая заявка на расчет сметы</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        ${files?.length ? `<p><strong>Файлы:</strong></p><ul>${files.map((f: string) => `<li>${f}</li>`).join("")}</ul>` : ""}
      `;

    await transporter.sendMail({
      from: "002ydy02@gmail.com",
      to: "info@g-time.kz",
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
