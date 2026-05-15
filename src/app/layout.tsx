import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ModalProvider } from "@/components/ModalContext";
import Script from "next/script";
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
      <body className="relative bg-graphite text-white antialiased">
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5SF8VRS2');
          `}
        </Script>
		<Script id="gtm2" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MP7SFVHW');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5SF8VRS2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
		  <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MP7SFVHW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
