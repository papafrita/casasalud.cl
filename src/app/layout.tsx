import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBanner from "@/components/TopBanner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CasaSalud",
  description: "Plataforma Integral de Salud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopBanner />
        <div className="pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
