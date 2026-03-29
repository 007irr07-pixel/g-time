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
const BlueprintBackground = dynamic(() => import("@/components/BlueprintBackground"));

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <Suspense fallback={<div className="min-h-screen bg-graphite flex items-center justify-center"><div className="w-16 h-16 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div></div>}>
          <div className="relative bg-graphite overflow-hidden">
            {/* Seamless steel-mesh grid, same as Hero, continues across both blocks */}
            <div className="absolute inset-0 steel-mesh opacity-20 pointer-events-none z-0" />
            {/* Smooth transition from Hero */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none" />
            <BlueprintBackground />
            
            <CatalogSection />
            <RulesSection />
          </div>
          <CalculatorSection />
          <PartnersMarquee />
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
