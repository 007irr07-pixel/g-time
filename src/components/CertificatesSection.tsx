"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ZoomIn, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const certificateImages = [
  "/certificates/sert1_big.jpg",
  "/certificates/sert2_big.jpg",
  "/certificates/sert3_big.jpg",
  "/certificates/sert4_big.jpg",
  "/certificates/sert10_big.png",
  "/certificates/sert11_big.jpg",
  "/certificates/sert12_big.jpg",
  "/certificates/sert13_big.jpg",
  "/certificates/sert14_big.jpg",
  "/certificates/sert15_big.jpg",
  "/certificates/sert16_big.jpg",
  "/certificates/sert17_big.jpg",
  "/certificates/sert18_big.jpg",
  "/certificates/sert19_big.jpg",
];

const recommendationImages = [
  "/recommendations/letter1_big.jpg",
  "/recommendations/letter2_big.jpg",
  "/recommendations/letter3_big.jpg",
  "/recommendations/letter4_big.jpg",
  "/recommendations/letter5_big.jpg",
  "/recommendations/letter6_big.jpg",
  "/recommendations/letter7_big.jpg",
];

export default function CertificatesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Background Marquee effect linked to scroll
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const [activeTab, setActiveTab] = useState<"certificates" | "recommendations">("certificates");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentArray = activeTab === "certificates" ? certificateImages : recommendationImages;

  const lightboxIndex = lightboxImage ? currentArray.indexOf(lightboxImage) : -1;
  const hasMultiple = currentArray.length > 1;

  // Function to navigate without causing hooks closure issues
  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (lightboxIndex === -1) return;
    let newIndex;
    if (direction === 'next') {
      newIndex = lightboxIndex === currentArray.length - 1 ? 0 : lightboxIndex + 1;
    } else {
      newIndex = lightboxIndex === 0 ? currentArray.length - 1 : lightboxIndex - 1;
    }
    setLightboxImage(currentArray[newIndex]);
  };

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [lightboxImage]);

  // Handle ESC and Arrow keys for Lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { 
      if (!lightboxImage) return;
      if (e.key === 'Escape') setLightboxImage(null); 
      else if (e.key === 'ArrowRight') navigateLightbox('next');
      else if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxImage, lightboxIndex, currentArray]);

  return (
    <section id="certificates" ref={containerRef} className="relative py-32 sm:py-48 overflow-hidden bg-graphite">
      {/* Heavy mesh background */}
      <div className="absolute inset-0 steel-mesh opacity-20" />
      <div className="absolute inset-0 noise-bg mix-blend-overlay" />

      {/* Cinematic Marquee Text Background */}
      <div className="absolute top-[20%] w-full whitespace-nowrap opacity-[0.03] select-none pointer-events-none flex flex-col gap-10 overflow-hidden">
        <motion.div style={{ x: x1 }} className="text-[12rem] font-heading font-900 uppercase">
          ЛИЦЕНЗИИ • СЕРТИФИКАТЫ КАЧЕСТВА ГОСТ • ЛИЦЕНЗИИ • СЕРТИФИКАТЫ КАЧЕСТВА ГОСТ
        </motion.div>
        <motion.div 
          className="text-[12rem] font-heading font-900 uppercase text-transparent" 
          style={{ WebkitTextStroke: "2px white", x: x2 }}
        >
          ПОДТВЕРЖДЕНИЕ КАЧЕСТВА • НАДЕЖНОСТЬ • ПОДТВЕРЖДЕНИЕ КАЧЕСТВА • НАДЕЖНОСТЬ
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-900 mt-2 mb-6 tracking-tight text-white">
            Наши <span className="gradient-text-orange">сертификаты</span> и <br className="hidden sm:block" />рекомендательные письма.
          </h2>
          <p className="text-zinc-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">Мы гордимся прозрачностью нашей работы. Каждая партия металла имеет паспорт качества, а наш профессионализм подтвержден официальными письмами от крупнейших партнеров.</p>
        </motion.div>

        {/* Tab Switcher & Gallery Interactive Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8"
        >

          {/* Centralized Tab Switcher */}
          <div className="flex justify-center w-full z-20">
            <div className="flex bg-graphite/40 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl relative">
              <button 
                onClick={() => setActiveTab("certificates")} 
                className={`relative z-10 px-6 sm:px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === 'certificates' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Сертификаты
                {activeTab === 'certificates' && (
                  <motion.div layoutId="tabMarker" className="absolute inset-0 bg-gradient-to-r from-accent-orange/80 to-accent-orange/40 rounded-full -z-10 shadow-[0_0_20px_rgba(255,87,34,0.3)]" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab("recommendations")} 
                className={`relative z-10 px-6 sm:px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === 'recommendations' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Отзывы клиентов
                {activeTab === 'recommendations' && (
                  <motion.div layoutId="tabMarker" className="absolute inset-0 bg-gradient-to-r from-accent-green/80 to-accent-green/40 rounded-full -z-10 shadow-[0_0_20px_rgba(0,230,118,0.3)]" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {currentArray.length === 0 ? (
                // EMPTY STATE
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-20 bg-graphite/20 backdrop-blur-xl border border-white/5 rounded-[2rem]"
                >
                  <div className="bg-white/5 p-6 rounded-full mb-6">
                    <FileText className="w-12 h-12 text-zinc-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-medium text-white mb-2">Отзывы загружаются</h3>
                  <p className="text-zinc-400 text-center max-w-sm">Здесь скоро появятся официальные благодарственные письма от наших крупных партнеров.</p>
                </motion.div>
              ) : (
                // PREMIUM STRICT GRID GALLERY
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 w-full"
                >
                  {currentArray.map((src, i) => (
                    <motion.div
                      key={src}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLightboxImage(src)}
                      className="relative aspect-square w-full cursor-zoom-in rounded-2xl overflow-hidden shadow-xl group border border-white/10 bg-graphite/40 transform-gpu z-10 hover:z-20 hover:shadow-2xl hover:border-white/30"
                    >
                      <Image 
                        src={src} 
                        alt="Документ" 
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                          <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 sm:p-8 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setLightboxImage(null)} 
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white bg-white/10 p-3 rounded-full hover:bg-white/25 hover:rotate-90 transition-all z-10 border border-white/20"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-5xl h-full flex items-center justify-center"
            >
              <img 
                src={lightboxImage} 
                alt="Увеличенный сертификат"
                className="max-w-full max-h-full object-contain rounded-lg sm:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
              />
              
              {/* Navigation Controls */}
              {hasMultiple && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                    className="absolute left-4 sm:left-[-60px] top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/80 hover:scale-110 transition-all z-10 border border-white/20 backdrop-blur-md"
                  >
                    <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                    className="absolute right-4 sm:right-[-60px] top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/80 hover:scale-110 transition-all z-10 border border-white/20 backdrop-blur-md"
                  >
                    <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
