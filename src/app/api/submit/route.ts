import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const AMOCRM_SUBDOMAIN = "gtime91";
const AMOCRM_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkODMxYTU1ZGNkMGU3ZGNiMTM0Yjk4NjVlODI1NGY5ZWNjMDJkN2UxMGU0NDJhM2Y3MWJjNjJmYjRjNjE5OWM2NDg3NWQ4ZjQ0YWJkMzcyIn0.eyJhdWQiOiIwMmMxODQ1NS1lMmY0LTRhYzktYjQwOC03OWY4YWI0ZGI4NWQiLCJqdGkiOiIwZDgzMWE1NWRjZDBlN2RjYjEzNGI5ODY1ZTgyNTRmOWVjYzAyZDdlMTBlNDQyYTNmNzFiYzYyZmI0YzYxOTljNjQ4NzVkOGY0NGFiZDM3MiIsImlhdCI6MTc3OTEyNTUzNiwibmJmIjoxNzc5MTI1NTM2LCJleHAiOjE5MjQ5MDU2MDAsInN1YiI6IjEzNzExMTYyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMzMDAxMTY2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJmaWxlcyIsImNybSJdLCJoYXNoX3V1aWQiOiJjZTlmYjhiNC0wYTM2LTQ2MmItOTYyZi01YWE2MWY0N2RlYjciLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.BAdv5QsNam2hXVkEZf6m0dT58eR9eYePx2XX2n5wSHQcDntZTQS1F8GiBgMp5gX4APZUP0bHevJIYzVQVjtITL8cy0VxKCSldXAN4CX9w63pTOTuvacnFhQtDfpGS6IVL7Fowgi1oB4Jw_3qdai5sU8Q_7JkjF2sLi5DIkd2OFB4vKVvvas9Dvg-fpd7Wdan4u8j5TiJT5H8CaBwC7cI_p8cELLAPn5qNJNTwKNsQnvedqwDG7yO1swt1UdRmEriFkankQGcZ4FVTmWNqYSLxgubQCcIoa-P2TMSnsgX91s8YWhyr_-10MaK8k1mVDjfkAe1flB7BUZq_o4wkEEySA";
const PIPELINE_ID = 10798226; // Теплая Воронка
const STATUS_ID = 85013582; // Неразобранное

const MANAGERS = [
  13749918, // Никита
  13749922, // Санат
  13749942, // Мадина
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, files, type } = body;

    // 1. Email Sending Logic
    const smtpUser = process.env.SMTP_USER || "sales@g-time.kz";
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.g-time.kz",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: process.env.SMTP_PASSWORD || "",
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const fileList = files?.length
      ? `\n\nПрикрепленные файлы:\n${files.map((f: any) => typeof f === 'string' ? `• ${f}` : `• ${f.name}`).join("\n")}`
      : "";

    const mailAttachments = files?.length
      ? files.map((f: any) => ({
          filename: f.name || f,
          content: f.content ? f.content.split('base64,')[1] : '',
          encoding: 'base64'
        })).filter((a: any) => a.content)
      : [];

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
        ${files?.length ? `<p><strong>Файлы:</strong></p><ul>${files.map((f: any) => `<li>${typeof f === 'string' ? f : f.name}</li>`).join("")}</ul>` : ""}
      `;

    // Fire & Forget email sending
    transporter.sendMail({
      from: smtpUser,
      to: process.env.NOTIFY_EMAILS || "sales@g-time.kz",
      bcc: "continental424@gmail.com",
      subject,
      text,
      html,
      attachments: mailAttachments.length > 0 ? mailAttachments : undefined,
    }).catch(e => console.error("Email send failed:", e));

    // 2. amoCRM Integration Logic
    try {
      // Pick a random manager from the array
      const randomManager = MANAGERS[Math.floor(Math.random() * MANAGERS.length)];
      
      const leadName = type === 'price' 
        ? "Запрос прайса с сайта" 
        : "Заявка с сайта";

      const amocrmPayload = [
        {
          name: leadName,
          pipeline_id: PIPELINE_ID,
          status_id: STATUS_ID,
          responsible_user_id: randomManager,
          _embedded: {
            contacts: [
              {
                first_name: name,
                responsible_user_id: randomManager,
                custom_fields_values: [
                  {
                    field_code: "PHONE",
                    values: [
                      {
                        value: phone
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ];

      const amoRes = await fetch(`https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/complex`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AMOCRM_TOKEN}`
        },
        body: JSON.stringify(amocrmPayload)
      });

      if (!amoRes.ok) {
        const errorText = await amoRes.text();
        console.error("amoCRM Error:", amoRes.status, errorText);
      } else {
        const amoData = await amoRes.json();
        const leadId = amoData[0]?.id;

        // Add a note with files if any
        if (leadId && files?.length) {
          const fileNames = files.map((f: any) => typeof f === 'string' ? f : f.name).join(", ");
          const noteText = `Клиент прикрепил файлы: ${fileNames}. Файлы отправлены на почту sales@g-time.kz`;
          
          await fetch(`https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/${leadId}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${AMOCRM_TOKEN}`
            },
            body: JSON.stringify([
              {
                note_type: "common",
                params: { text: noteText }
              }
            ])
          }).catch(e => console.error("amoCRM Note Error:", e));
        }
      }
    } catch (amoError) {
      console.error("amoCRM Integration Error:", amoError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
