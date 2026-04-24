import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tintasmaza.com.br"),
  title: {
    default: "Tintas Maza — Paixão por Qualidade",
    template: "%s | Tintas Maza",
  },
  description:
    "Há 27 anos no mercado, a Tintas Maza se destaca na fabricação de tintas imobiliárias, automotivas, industriais e solventes.",
  applicationName: "Tintas Maza",
  keywords: [
    "tintas",
    "tintas imobiliárias",
    "tintas automotivas",
    "tintas industriais",
    "solventes",
    "Maza",
  ],
  authors: [{ name: "Tintas Maza" }],
  creator: "Tintas Maza",
  publisher: "Tintas Maza",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Tintas Maza",
    title: "Tintas Maza — Paixão por Qualidade",
    description:
      "Tintas imobiliárias, automotivas, industriais e solventes com tecnologia e qualidade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tintas Maza — Paixão por Qualidade",
    description:
      "Tintas imobiliárias, automotivas, industriais e solventes com tecnologia e qualidade.",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1C1C" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
      <body className="antialiased font-roboto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[#B11116] focus:text-white focus:shadow-lg"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
