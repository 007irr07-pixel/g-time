const nodemailer = require('nodemailer');

process.env.SMTP_HOST = "mail.g-time.kz";
process.env.SMTP_PORT = 465;
process.env.SMTP_USER = "info@g-time.kz";
process.env.SMTP_PASSWORD = "Gtime2026!";

async function test() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.g-time.kz", // Хост исходящей почты (SMTP)
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER || "info@g-time.kz",
      pass: process.env.SMTP_PASSWORD || "",
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || "info@g-time.kz",
      to: "info@g-time.kz",
      subject: "Test email",
      text: "Test email text",
    });
    console.log("Success:", info);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
