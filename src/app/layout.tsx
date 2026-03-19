import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G-Time.kz — Металлопрокат по всему Казахстану | Трубы, арматура, листовой прокат",
  description:
    "G-Time — национальный дистрибьютор металлопроката в Казахстане. Трубный, сортовой, листовой, фасонный прокат и арматура. Собственная логистика, сертификация СТ-KZ, ГОСТ. Мгновенный расчет веса и стоимости.",
  keywords: "металлопрокат, Казахстан, трубы, арматура, листовой прокат, швеллер, уголок, g-time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-graphite text-white antialiased">
        {children}
      </body>
    </html>
  );
}
