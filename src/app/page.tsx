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
        <Suspense fallback={<div className="min-h-screen bg-graphite flex items-center justify-center"><div className="w-16 h-16 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></div></div>}>
          <div className="relative bg-graphite border-y border-white/5 overflow-hidden">
            {/* Seamless Metallurgical Schematic Grid across both sections */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />
            <div className="absolute inset-0 steel-mesh opacity-[0.15] mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 noise-bg mix-blend-overlay opacity-50 pointer-events-none" />
            
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
