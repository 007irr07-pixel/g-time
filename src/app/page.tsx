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
      <main className="overflow-x-hidden relative bg-graphite">
        <div className="absolute inset-0 steel-mesh opacity-20 pointer-events-none z-0" />
        <HeroSection />
        <div className="relative overflow-hidden">
          {/* Seamless steel-mesh grid is globally applied to main */}
          <BlueprintBackground />
          
          <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center"><div className="w-12 h-12 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div></div>}>
            <CatalogSection />
          </Suspense>
          <RulesSection />
        </div>
        <CalculatorSection />
        <PartnersMarquee />
        <UploadSection />
        <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center"><div className="w-12 h-12 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div></div>}>
          <B2BSection />
        </Suspense>
        <CertificatesSection />
      </main>
      <Footer />
      <PriceModal />
    </>
  );
}
