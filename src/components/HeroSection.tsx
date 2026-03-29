"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const HeroLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.HeroLive3D), { ssr: false });

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
  const { openPriceModal: onOpenPriceModal } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  // Smoothed parallax for floating background elements
  const smoothY = useSpring(scrollY, { stiffness: 50, damping: 20 });
  const yBg1 = useTransform(smoothY, [0, 1000], [0, -200]);
  const yBg2 = useTransform(smoothY, [0, 1000], [0, -400]);
  const scaleBg = useTransform(smoothY, [0, 1000], [1, 0.4]);

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

      {/* Dynamic Parallax Hero Illustration (WebGL) */}
      <motion.div
        style={{ y: yBg1 }}
        className="absolute top-0 right-0 bottom-0 w-[150vw] sm:inset-0 sm:w-full pointer-events-none origin-center pt-32 sm:pt-20 opacity-25 sm:opacity-100 translate-x-[25%] sm:translate-x-0"
      >
        <HeroLive3D />
      </motion.div>

      {/* Grid texture overlay is handled globally */}



      {/* Main Content Area */}
      <motion.div
        style={{ y: yHero, opacity: opacityHero }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="max-w-5xl">


          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-semibold tracking-widest text-silver uppercase"
          >
            Алматы и весь Казахстан <span className="text-accent-orange mx-2">•</span> Снабжение объектов 24/7
          </motion.div>

          {/* Staggered Cinematic Headline */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-heading font-900 leading-[1.1] tracking-tight mb-8 px-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          >
            {renderStaggeredText("Арматура и металлопрокат с отгрузкой за 24 часа.")}
            <br className="hidden sm:block" />
            <motion.span variants={letterVariants} className="gradient-text-orange inline-block drop-shadow-[0_0_15px_rgba(255,87,34,0.4)] mt-2">
              Или оплатим простой вашей техники.
            </motion.span>
          </motion.h1>

          {/* Subtitle with fade up */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-white max-w-3xl mb-12 leading-[1.6] font-light drop-shadow-[0_4px_30px_rgba(0,0,0,1)]"
          >
            <strong className="text-white font-semibold">50 000 тонн металла</strong> на складах. Фиксируем цену в день счета, даем отсрочку платежа и гарантируем честный вес по ГОСТу.
          </motion.p>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a
              href="#calculator"
              className="group relative inline-flex items-center justify-center gap-4 bg-accent-orange text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden shadow-[0_0_30px_rgba(255,87,34,0.3)] hover:shadow-[0_0_40px_rgba(255,87,34,0.5)]"
            >
              {/* Button inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Рассчитать смету за 15 минут</span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover:translate-x-1.5 transition-transform"
              />
            </a>

            <button
              onClick={onOpenPriceModal}
              className="group relative inline-flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 hover:border-accent-orange/40 hover:bg-surface text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={20} className="text-silver group-hover:text-accent-orange transition-colors" />
              <span>Получить прайс в WhatsApp</span>
            </button>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="flex flex-wrap gap-10 sm:gap-16 mt-12 pt-10 border-t border-white/5"
          >
            {[
              { value: "12+", label: "лет доверия" },
              { value: "50К", label: "тонн металла" },
              { value: "5000+", label: "отгрузок/год" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 + (i * 0.1) }}
                className="relative"
              >
                <div className="text-3xl sm:text-4xl font-heading font-900 text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-silver uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#catalog" className="flex flex-col items-center gap-4 text-silver hover:text-white transition-colors group">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-white drop-shadow-md">
            Листайте вниз
          </span>
          <div className="w-10 h-16 rounded-full border-2 border-white/20 flex justify-center p-2 group-hover:border-accent-orange/80 bg-graphite/50 backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(255,87,34,0)] group-hover:shadow-[0_0_20px_rgba(255,87,34,0.3)]">
            <motion.div
              className="w-2 h-4 bg-accent-orange rounded-full"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div
            animate={{ y: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <ChevronDown size={24} className="text-accent-orange -mt-2" />
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
