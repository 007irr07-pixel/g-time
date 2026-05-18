"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Ожидается 8 логотипов в папке public/partners/ 
// Имена файлов: 1.png, 2.png, 3.png, 4.png, 5.png, 6.png, 7.png, 8.png
const partnerLogos = Array.from({ length: 8 }, (_, i) => `/partners/${i + 1}.png`);

export default function PartnersMarquee() {
  return (
    <section className="py-12 bg-graphite border-y border-white/5 overflow-hidden flex flex-col relative w-full">
		<h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-heading font-800 mt-4 mb-6">
            Наши{" "}
            <span className="gradient-text-cyan">партнеры</span>
          </h2>
	
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-graphite to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-graphite to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35, // Скорость прокрутки
        }}
        className="flex w-max items-center"
      >
        {/* We map twice to create the infinite seamless loop effect */}
        {[1, 2].map((group) => (
          <div key={group} className="flex gap-20 sm:gap-32 px-10 sm:px-16 items-center">
            {partnerLogos.map((src, idx) => (
              <div 
                key={`${src}-${idx}`} 
                className="relative w-40 h-20 sm:w-56 sm:h-24 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-500 select-none brightness-0 invert hover:brightness-100 hover:invert-0"
              >
                <Image 
                  src={src}
                  alt={`Partner ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 160px, 224px"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
