"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Download,
} from "lucide-react";

const cities = ["Алматы", "Астана", "Шымкент", "Караганда", "Актау", "Атырау"];

const navLinks = [
  { label: "Каталог", href: "#catalog" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "О компании", href: "#b2b" },
  { label: "Контакты", href: "#contacts" },
];

interface HeaderProps {
  onOpenPriceModal: () => void;
}

export default function Header({ onOpenPriceModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [city, setCity] = useState("Алматы");
  const [cityOpen, setCityOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-graphite/95 backdrop-blur-xl border-b border-border shadow-2xl"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
              <Image 
              src="https://i.ibb.co.com/5xWvRC9R/logo.png" 
              alt="G-Time Logo" 
              width={160}
              height={48}
              priority
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-light-silver hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            {/* City selector */}
            <div className="relative">
              <button
                onClick={() => setCityOpen(!cityOpen)}
                className="flex items-center gap-1.5 text-sm text-silver hover:text-white transition-colors"
              >
                <MapPin size={14} className="text-accent-orange" />
                {city}
                <ChevronDown
                  size={12}
                  className={`transition-transform ${cityOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {cityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 bg-gunmetal border border-border rounded-xl py-2 min-w-[160px] shadow-2xl"
                  >
                    {cities.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCity(c);
                          setCityOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-surface-hover transition-colors ${
                          c === city ? "text-accent-orange" : "text-light-silver"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone */}
            <a
              href="tel:+77478393548"
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-orange transition-colors"
            >
              <Phone size={14} />
              +7 747 839-35-48
            </a>

            {/* CTA */}
            <button
              onClick={onOpenPriceModal}
              className="flex items-center gap-2 bg-accent-orange hover:bg-accent-orange-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 pulse-glow"
            >
              <Download size={14} />
              Скачать прайс
            </button>
          </div>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-gunmetal/98 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-light-silver hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <a
                  href="tel:+77478393548"
                  className="flex items-center gap-2 text-sm font-semibold text-white"
                >
                  <Phone size={14} className="text-accent-orange" />
                  +7 747 839-35-48
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPriceModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-accent-orange hover:bg-accent-orange-dark text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
                >
                  <Download size={14} />
                  Скачать прайс
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
