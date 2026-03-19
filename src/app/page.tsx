"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import CalculatorSection from "@/components/CalculatorSection";
import UploadSection from "@/components/UploadSection";
import B2BSection from "@/components/B2BSection";
import Footer from "@/components/Footer";
import PriceModal from "@/components/PriceModal";

export default function Home() {
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  return (
    <>
      <Header onOpenPriceModal={() => setPriceModalOpen(true)} />
      <main>
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
