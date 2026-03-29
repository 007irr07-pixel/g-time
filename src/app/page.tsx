import dynamic from "next/dynamic";
import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PriceModal from "@/components/PriceModal";

const RulesSection = dynamic(() => import("@/components/RulesSection"));
const PartnersMarquee = dynamic(() => import("@/components/PartnersMarquee"));
const CatalogSection = dynamic(() => import("@/components/CatalogSection"));
const CalculatorSection = dynamic(() => import("@/components/CalculatorSection"));
const UploadSection = dynamic(() => import("@/components/UploadSection"));
const B2BSection = dynamic(() => import("@/components/B2BSection"));
const CertificatesSection = dynamic(() => import("@/components/CertificatesSection"));

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <PartnersMarquee />
        <Suspense fallback={<div className="min-h-screen bg-graphite flex items-center justify-center"><div className="w-16 h-16 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div></div>}>
          <RulesSection />
          <CatalogSection />
          <CalculatorSection />
          <UploadSection />
          <B2BSection />
          <CertificatesSection />
        </Suspense>
      </main>
      <Footer />
      <PriceModal />
    </>
  );
}
