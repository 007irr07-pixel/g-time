"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  priceModalOpen: boolean;
  openPriceModal: () => void;
  closePriceModal: () => void;
  estimateModalOpen: boolean;
  openEstimateModal: () => void;
  closeEstimateModal: () => void;
  ventmarketModalOpen: boolean;
  openVentmarketModal: () => void;
  closeVentmarketModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [ventmarketModalOpen, setVentmarketModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        priceModalOpen,
        openPriceModal: () => setPriceModalOpen(true),
        closePriceModal: () => setPriceModalOpen(false),
        estimateModalOpen,
        openEstimateModal: () => setEstimateModalOpen(true),
        closeEstimateModal: () => setEstimateModalOpen(false),
        ventmarketModalOpen,
        openVentmarketModal: () => setVentmarketModalOpen(true),
        closeVentmarketModal: () => setVentmarketModalOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
