"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import dynamic from "next/dynamic";

const RulesLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.RulesLive3D), { ssr: false });

const rules = [
  {
    type: "weight" as const,
    title: "1. Вес в грамм",
    desc: "Если при приемке вес не сойдется — вернем разницу в двойном размере.",
    color: "green"
  },
  {
    type: "search" as const,
    title: "2. Сервис «Найдем всё»",
    desc: "Если позиции нет у нас — найдем у партнеров по своей спеццене.",
    color: "orange"
  },
  {
    type: "transparency" as const,
    title: "3. Прозрачность",
    desc: "ЭСФ день в день и только свежий металл без коррозии.",
    color: "orange"
  }
];

function RuleCard({ rule, index }: { rule: typeof rules[0], index: number }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="h-full"
    >
      <TiltCard
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`relative group bg-graphite/40 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 hover:border-${rule.color === 'orange' ? 'accent-orange/40' : 'accent-green/40'} flex flex-col justify-end overflow-hidden cursor-pointer h-full min-h-[450px]`}
      >
        {/* Giant Background 3D WebGL scene */}
        <RulesLive3D type={rule.type} />
        
        {/* Readability dark vignette for text */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-graphite/95 via-graphite/60 to-transparent pointer-events-none mix-blend-multiply" />
  
        {/* Background glow radial */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${rule.color === 'orange' ? 'bg-accent-orange/20' : 'bg-accent-green/20'}`} />
  
        {/* Foreground Content with 3D Float */}
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10 pointer-events-none drop-shadow-2xl">
          <h3 className="text-3xl font-heading font-800 text-white mb-4 tracking-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">{rule.title}</h3>
          <p className="text-lg text-zinc-100 leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{rule.desc}</p>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function RulesSection() {
  const containerRef = useRef(null);

  return (
    <section id="rules" ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden bg-graphite border-y border-white/5">
      {/* Texture background (Metallurgical Schematic Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 noise-bg mix-blend-overlay opacity-50" />
      <div className="absolute inset-0 steel-mesh opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-left mb-16 border-l-4 border-accent-orange pl-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-900 tracking-tight text-white leading-tight">
            3 железных правила G-Time
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rules.map((rule, i) => (
            <RuleCard key={rule.title} rule={rule} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
