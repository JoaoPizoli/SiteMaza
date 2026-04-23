import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const displayFont = localFont({
  src: [{ path: "./fonts/bahnschrift.ttf", weight: "400 800", style: "normal" }],
  variable: "--font-sora",
  display: "swap",
});

const bodyFont = localFont({
  src: [
    { path: "./fonts/segoeui.ttf", weight: "400", style: "normal" },
    { path: "./fonts/segoeuib.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

const monoFont = localFont({
  src: [{ path: "./fonts/segoeui.ttf", weight: "400", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tintas Maza | Solucoes profissionais em tintas e revestimentos",
  description:
    "Tintas Maza desenvolve solucoes imobiliarias, automotivas, industriais e impermeabilizantes com foco em desempenho, acabamento e confianca comercial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
