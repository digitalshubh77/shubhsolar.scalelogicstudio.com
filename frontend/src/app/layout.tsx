import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./site-chrome.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shubh Solar — Rooftop Solar in Sangli & Maharashtra",
  description:
    "Cut your electricity bill by up to 90% with Shubh Solar. 750+ homes & businesses powered across Sangli. PM Surya Ghar subsidy assistance. Free site visit.",
  keywords: "solar panels Sangli, rooftop solar Maharashtra, PM Surya Ghar subsidy, solar installation Sangli",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen flex flex-col`} style={{ margin: 0 }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
