import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

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
    <html lang="ru" className={`scroll-smooth ${inter.variable} ${manrope.variable}`}>
      <body className="bg-graphite text-white antialiased">
        {children}
      </body>
    </html>
  );
}
