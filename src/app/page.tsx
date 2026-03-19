"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PriceModal from "@/components/PriceModal";

const CatalogSection = dynamic(() => import("@/components/CatalogSection"));
const CalculatorSection = dynamic(() => import("@/components/CalculatorSection"));
const UploadSection = dynamic(() => import("@/components/UploadSection"));
const B2BSection = dynamic(() => import("@/components/B2BSection"));

export default function Home() {
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  return (
    <>
      <Header onOpenPriceModal={() => setPriceModalOpen(true)} />
      <main className="overflow-x-hidden">
        <HeroSection onOpenPriceModal={() => setPriceModalOpen(true)} />
        <CatalogSection />
        <CalculatorSection />
        <UploadSection />
        <B2BSection />
      </main>
      <Footer />
      <PriceModal
        isOpen={priceModalOpen}
        onClose={() => setPriceModalOpen(false)}
      />
    </>
  );
}
