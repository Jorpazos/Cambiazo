import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cambiazo - Intercambio de Figuritas Mundial 2026",
  description:
    "La plataforma argentina para intercambiar, comprar y vender figuritas del álbum oficial del Mundial 2026. Unite a la comunidad.",
  keywords: "figuritas, mundial 2026, intercambio, panini, album, cambio, venta",
  openGraph: {
    title: "Cambiazo - Figuritas del Mundial 2026",
    description: "Intercambiá, comprá y vendé figuritas del Mundial 2026",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-brand-dark">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
