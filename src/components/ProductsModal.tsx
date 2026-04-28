"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, AlertTriangle, Search, Info, Download } from "lucide-react";
import { catalogData, type SubCategory, type ProductRow } from "@/data/catalogData";

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string | null;
}

function ProductTable({ sub, searchQuery }: { sub: SubCategory; searchQuery: string }) {
  const filteredRows = useMemo(() => {
    if (!searchQuery) return sub.rows;
    const s = searchQuery.toLowerCase();
    return sub.rows.filter(
      (row) =>
        row.size.toLowerCase().includes(s) ||
        (row.steel && row.steel.toLowerCase().includes(s)) ||
        (row.thickness && row.thickness.toLowerCase().includes(s))
    );
  }, [sub.rows, searchQuery]);

  if (sub.note) {
    return (
      <div className="bg-graphite/30 border border-border/50 rounded-3xl p-10 flex flex-col items-center justify-center min-h-[300px] text-center backdrop-blur-md">
        <div className="p-4 bg-accent-blue/10 rounded-full mb-6">
          <AlertTriangle size={48} className="text-accent-blue" />
        </div>
        <h4 className="text-xl font-heading font-700 text-white mb-3">Информация уточняется</h4>
        <p className="text-silver text-base max-w-lg leading-relaxed">{sub.note}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="tel:+77081692017"
            className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-dark text-white text-sm font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(0,71,154,0.2)]"
          >
            <Phone size={16} />
            Позвонить
          </a>
          <button
            onClick={() => window.open("https://wa.me/77081692017", "_blank")}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(8,145,178,0.2)]"
          >
            WhatsApp
          </button>
        </div>
      </div>
    );
  }

  if (filteredRows.length === 0 && searchQuery) {
    return (
      <div className="py-20 text-center">
        <Search size={40} className="text-steel mx-auto mb-4 opacity-30" />
        <p className="text-silver">Ничего не найдено по запросу «{searchQuery}»</p>
      </div>
    );
  }

  const isMesh = sub.id === "mesh";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-graphite/20 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-graphite/50 border-b border-border">
              {sub.columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-bold text-accent-blue uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, i) => (
              <tr
                key={`${row.size}-${i}`}
                className="border-b border-border/30 hover:bg-white/[0.03] transition-colors group"
              >
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-white font-bold whitespace-nowrap group-hover:text-accent-blue transition-colors">
                  {row.size}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-silver/90 whitespace-nowrap">
                  {row.steel || row.thickness || "—"}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-silver/90 whitespace-nowrap">{row.weight}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-white font-bold whitespace-nowrap bg-white/[0.02]">
                  {row.pricePerUnit}
                </td>
                {!isMesh && (
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-silver/90 whitespace-nowrap">{row.pricePerTon}</td>
                )}
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-silver/90 whitespace-nowrap">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProductsModal({ isOpen, onClose, categoryId }: ProductsModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);
  
  const category = categoryId ? catalogData[categoryId] : null;

  const handleClose = () => {
    setSearchQuery("");
    setActiveTab(0);
    onClose();
  };

  if (!category) return null;

  const subs = category.subcategories;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-gunmetal border-t sm:border border-border rounded-t-3xl sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] h-[90vh] sm:h-auto sm:max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* Top Bar (Site Logo & Close) */}
            <div className="flex items-center justify-between gap-4 p-5 sm:px-8 border-b border-border shrink-0 bg-graphite/40">
              <div className="flex items-center gap-5">
                <Image
                  src="/logo.png"
                  alt="G-Time Logo"
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <div className="hidden md:block w-px h-10 bg-border/50" />
                <div className="hidden md:block">
                  <h3 className="text-xl font-heading font-900 text-white tracking-tight uppercase">
                    {category.title}
                  </h3>
                  <p className="text-[10px] text-silver font-bold uppercase tracking-[0.2em] opacity-60">
                    Прайс-лист • Январь 2026
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-steel hover:text-white transition-all p-2 rounded-xl hover:bg-white/10 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Sub-header (Categories & Search) */}
            <div className="shrink-0 px-5 sm:px-8 pt-6 pb-2 border-b border-border/30 bg-gunmetal/50">
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-2">
                  {/* Category Tabs */}
                  <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    {subs.map((sub, i) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActiveTab(i);
                          setSearchQuery("");
                        }}
                        className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                          activeTab === i
                            ? "bg-accent-blue text-white shadow-[0_8px_20px_rgba(0,71,154,0.3)]"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  {!subs[activeTab].note && (
                    <div className="relative w-full lg:w-72">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel" size={16} />
                      <input
                        type="text"
                        placeholder="Поиск по размеру..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-graphite/40 border border-border/50 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-steel focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all font-medium"
                      />
                    </div>
                  )}
               </div>
            </div>

            {/* Scrollable Section Header (Mobile only) */}
            <div className="md:hidden px-8 pt-4">
               <h3 className="text-lg font-heading font-700 text-accent-blue uppercase">{category.title}</h3>
            </div>

            {/* Table content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category.id}-${activeTab}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ProductTable sub={subs[activeTab]} searchQuery={searchQuery} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <div className="shrink-0 px-8 py-5 border-t border-border bg-graphite/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-silver">
                <div className="p-1.5 bg-silver/10 rounded-lg">
                  <Info size={14} className="text-silver" />
                </div>
                <span>Цены указаны в тенге (₸) с учетом НДС и могут меняться.</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="/g-time-price.pdf"
                  download="G-Time-Прайс-лист.pdf"
                  className="flex items-center gap-2 bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue text-xs font-bold px-4 py-2 rounded-xl transition-all border border-accent-blue/30 hover:scale-105 active:scale-95"
                >
                  <Download size={14} />
                  Скачать прайс-лист PDF
                </a>
                <a
                  href="tel:+77070500964"
                  className="flex items-center gap-2 text-sm font-bold text-white hover:text-accent-blue transition-colors"
                >
                  <Phone size={14} className="text-accent-blue" />
                  +7 (707) 050 09 64
                </a>
                <a
                  href="https://wa.me/77081692017"
                  target="_blank"
                  className="hidden sm:flex items-center gap-2 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-500 text-xs font-bold px-4 py-2 rounded-xl transition-all border border-cyan-600/20"
                >
                  Отправить в WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


