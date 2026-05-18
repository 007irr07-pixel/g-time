"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle, Check } from "lucide-react";
import dynamic from "next/dynamic";

const HeroHexBg = dynamic(() => import("./BlueprintBackground"), { ssr: false });

import { useModal } from "./ModalContext";

// Letter animation variants for staggered reveal
const titleVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const letterVariants: any = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 15, stiffness: 100 },
  },
};

export default function HeroSection() {
  const { openPriceModal: onOpenPriceModal, openEstimateModal: onOpenEstimateModal } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects (Removed as requested by user)
  const { scrollY } = useScroll();



  // Split text helper
  const renderStaggeredText = (text: string) => {
    return text.split(/(\s+)/).map((word, wordIdx) => {
      // Don't split spaces
      if (word.match(/\s+/)) return <span key={wordIdx}>{word}</span>;

      return (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((letter, letterIdx) => (
            <motion.span
              key={`${wordIdx}-${letterIdx}`}
              variants={letterVariants}
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      );
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden perspective-[1000px]"
    >
      {/* Deep dark background is now handled globally */}

      {/* Static 3D hex pattern — top-right, behind tubes 
      <div className="absolute top-0 right-0 bottom-0 w-full h-full pointer-events-none z-[1] opacity-70">
        <HeroHexBg />
      </div>
      */}

      {/* Hero Image Container */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-[0]"
      >
        <img 
          src="/hero-photo.png" 
          alt="Фото для баннера" 
          className="w-full h-full object-cover object-[75%_center] sm:object-right opacity-40 sm:opacity-80"
        />
        {/* Smooth gradient overlays to ensure text readability on mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/80 to-transparent sm:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/80 to-transparent sm:hidden" />
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="max-w-5xl">


          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-block text-sm font-semibold tracking-widest text-zinc-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Алматы и весь Казахстан <span className="text-accent-blue mx-2">•</span> Снабжение объектов 24/7
          </motion.div>

          {/* Staggered Cinematic Headline */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-heading font-900 leading-[1.1] tracking-tight mb-8 px-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          >
            {renderStaggeredText("Арматура и металлопрокат с отгрузкой за 24 часа")}
            <br className="hidden sm:block" />
          </motion.h1>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-12"
          >
            {[
              "50 000 тонн металла на складах",
              "Соответствие ГОСТу",
              "Фиксируем цену в день счета",
              "Даем отсрочку платежа",
              "Доставка по всему Казахстану",
              "Поставка точно в срок"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center border border-accent-blue/50">
                  <Check size={14} className="text-accent-blue" />
                </div>
                <span className="text-zinc-200 font-medium drop-shadow-md text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button
              onClick={onOpenEstimateModal}
              className="group relative inline-flex items-center justify-center gap-4 bg-accent-blue text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden shadow-[0_0_30px_rgba(0,71,154,0.3)] hover:shadow-[0_0_40px_rgba(0,71,154,0.5)] border-none cursor-pointer"
            >
              {/* Button inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Получить смету</span>
            </button>

            <a
              href="https://wa.me/77478390605"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] border-none"
            >
              {/* Note: In a real app we might use official WhatsApp SVG icon, but MessageCircle is fine here if it works. Let's make it look authentic. */}
              <MessageCircle size={24} className="text-white drop-shadow-md" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Написать на WhatsApp</span>
            </a>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-16 mt-12 pt-8 sm:pt-10 border-t border-white/5"
          >
            {[
              { value: "12+", label: "лет доверия" },
              { value: "50 000", label: "тонн металла" },
              { value: "5000+", label: "отгрузок/год" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 + (i * 0.1) }}
                className="relative flex flex-col"
              >
                <div className="text-2xl sm:text-4xl font-heading font-900 text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-silver uppercase tracking-wider sm:tracking-widest leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating scroll indicator */}
      <motion.div
        className="hidden absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#catalog" className="flex flex-col items-center gap-4 text-silver hover:text-white transition-colors group">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)] bg-graphite/50 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
            Листайте вниз
          </span>
          <div className="w-10 h-16 rounded-full border-2 border-white/20 flex justify-center p-2 group-hover:border-accent-blue/80 bg-graphite/50 backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(0,71,154,0)] group-hover:shadow-[0_0_20px_rgba(0,71,154,0.3)]">
            <motion.div
              className="w-2 h-4 bg-accent-blue rounded-full"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div
            animate={{ y: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <ChevronDown size={24} className="text-accent-blue -mt-2" />
          </motion.div>
        </a>
      </motion.div>

      {/* Global shimmer style definition */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}


