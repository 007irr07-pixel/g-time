"use client";

import { motion } from "framer-motion";

// Placeholder partners for the B2B sector in Kazakhstan
const partners = [
  "BI GROUP", 
  "BAZIS-A", 
  "RAMS QAZAQSTAN", 
  "KAZMINERALS", 
  "KAZAKHMYS", 
  "TENGIZCHEVROIL", 
  "KAZATOMPROM", 
  "QAZAQ STROY"
];

export default function PartnersMarquee() {
  return (
    <section className="py-10 bg-surface border-y border-white/5 overflow-hidden flex flex-col relative w-full">
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="flex w-max items-center"
      >
        {/* We map twice to create the infinite seamless loop effect */}
        {[1, 2].map((group) => (
          <div key={group} className="flex gap-16 sm:gap-24 px-8 sm:px-12 items-center">
            {partners.map((partner, idx) => (
              <div 
                key={`${partner}-${idx}`} 
                className="flex items-center text-zinc-600 font-heading font-900 text-3xl sm:text-4xl tracking-[0.15em] uppercase hover:text-white transition-colors duration-500 cursor-default select-none opacity-50 hover:opacity-100"
              >
                {partner}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
