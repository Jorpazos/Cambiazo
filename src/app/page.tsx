import Hero from "@/components/landing/Hero";
import FeaturedListings from "@/components/landing/FeaturedListings";
import HowItWorks from "@/components/landing/HowItWorks";
import SafetySection from "@/components/landing/SafetySection";
import StoreSection from "@/components/landing/StoreSection";
import FAQ from "@/components/landing/FAQ";
import ContactSection from "@/components/landing/ContactSection";
import { FEATURED_LISTINGS, STORE_PRODUCTS, FAQ_ITEMS } from "@/lib/mockData";

export default function HomePage() {
  return (
    <>
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
