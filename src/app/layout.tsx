import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cambiazomundial2026.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cambiazo – Figuritas Mundial 2026 | Intercambiá, Comprá y Vendé",
    template: "%s | Cambiazo – Figuritas Mundial 2026",
  },
  description:
    "La plataforma argentina para intercambiar, comprar y vender figuritas Panini del álbum oficial del Mundial 2026. Completá tu álbum gratis. ¡Más de 980 figuritas disponibles!",
  keywords: [
    "figuritas mundial 2026",
    "album mundial 2026",
    "intercambio figuritas mundial 2026",
    "comprar figuritas mundial 2026",
    "vender figuritas mundial 2026",
    "figuritas panini mundial 2026",
    "album panini 2026",
    "completar album mundial 2026",
    "figuritas dobles mundial",
    "cambio figuritas",
    "figuritas fifa world cup 2026",
    "figuritas futbol 2026",
    "intercambio figuritas argentina",
    "figuritas argentina mundial",
    "album figuritas 2026",
  ],
  authors: [{ name: "Cambiazo" }],
  creator: "Cambiazo",
  publisher: "Cambiazo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Cambiazo – Figuritas Mundial 2026 | Intercambiá, Comprá y Vendé",
    description:
      "La plataforma argentina para intercambiar, comprar y vender figuritas Panini del Mundial 2026. ¡Completá tu álbum gratis!",
    type: "website",
    url: siteUrl,
    siteName: "Cambiazo",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambiazo – Figuritas Mundial 2026",
    description:
      "Intercambiá, comprá y vendé figuritas Panini del álbum oficial del Mundial 2026. ¡Gratis para registrarse!",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body className="min-h-screen flex flex-col bg-brand-dark">
        <NextAuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
