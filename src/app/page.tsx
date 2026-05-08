import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import FeaturedListings from "@/components/landing/FeaturedListings";
import HowItWorks from "@/components/landing/HowItWorks";
import SafetySection from "@/components/landing/SafetySection";
import StoreSection from "@/components/landing/StoreSection";
import FAQ from "@/components/landing/FAQ";
import ContactSection from "@/components/landing/ContactSection";
import { FEATURED_LISTINGS, STORE_PRODUCTS, FAQ_ITEMS } from "@/lib/mockData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cambiamundial2026.vercel.app";

export const metadata: Metadata = {
  title: "Cambiazo – Intercambiá Figuritas del Mundial 2026 | Panini Argentina",
  description:
    "¿Buscás figuritas del Mundial 2026? En Cambiazo intercambiás tus dobles, comprás las que te faltan y vendés lo que sobra. El álbum Panini oficial tiene 980 figuritas. ¡Completalo gratis!",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Cambiazo – Intercambiá Figuritas del Mundial 2026",
    description:
      "¿Buscás figuritas del Mundial 2026? Intercambiá dobles, comprá las que te faltan y completá el álbum Panini oficial. ¡Gratis!",
    url: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Cambiazo",
      description:
        "Plataforma argentina para intercambiar, comprar y vender figuritas Panini del álbum oficial del Mundial 2026.",
      inLanguage: "es-AR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/marketplace?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Cambiazo",
      url: siteUrl,
      description: "La plataforma argentina para intercambio de figuritas del Mundial 2026.",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Intercambiá Figuritas del Mundial 2026 – Cambiazo",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      description:
        "Intercambiá, comprá y vendé figuritas Panini del álbum oficial del Mundial 2026. Más de 980 figuritas, 48 selecciones y 3 países sede.",
      inLanguage: "es-AR",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <FeaturedListings listings={FEATURED_LISTINGS} />
      <HowItWorks />
      <SafetySection />
      <StoreSection products={STORE_PRODUCTS} />
      <FAQ items={FAQ_ITEMS} />
      <ContactSection />
    </>
  );
}
