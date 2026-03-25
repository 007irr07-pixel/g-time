"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  priceModalOpen: boolean;
  openPriceModal: () => void;
  closePriceModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        priceModalOpen,
        openPriceModal: () => setPriceModalOpen(true),
        closePriceModal: () => setPriceModalOpen(false),
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
