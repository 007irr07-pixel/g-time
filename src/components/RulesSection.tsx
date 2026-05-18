"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import dynamic from "next/dynamic";

const RulesLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.RulesLive3D), { ssr: false });

const rules = [
  {
    type: "weight" as const,
    title: "1. Гарантия точного веса",
    desc: "Если при приемке вес не сойдется — вернем разницу.",
    color: "cyan"
  },
  {
    type: "search" as const,
    title: "2. Сервис «Найдем всё»",
    desc: "Если позиции нет у нас — найдем у партнеров по своей спеццене.",
    color: "blue"
  },
  {
    type: "transparency" as const,
    title: "3. Высокое качество",
    desc: "Качественный металл без коррозии и дефектов.",
    color: "blue"
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
        className={`relative group bg-graphite/40 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 hover:border-${rule.color === 'blue' ? 'accent-blue/40' : 'accent-cyan/40'} flex flex-col justify-center items-center text-center overflow-hidden cursor-pointer h-full min-h-[450px]`}
      >
        {/* Giant Background 3D WebGL scene */}
        <RulesLive3D type={rule.type} />
        
        {/* Readability dark vignette for text */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-graphite/95 via-graphite/60 to-transparent pointer-events-none" />
  
        {/* Background glow radial */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${rule.color === 'blue' ? 'bg-accent-blue/20' : 'bg-accent-cyan/20'}`} />
  
        {/* Foreground Content with 3D Float */}
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10 pointer-events-none">
          <h3 style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8)" }} className="text-3xl font-heading font-800 text-white mb-4 tracking-tight">{rule.title}</h3>
          <p style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }} className="text-lg text-zinc-100 leading-relaxed font-medium">{rule.desc}</p>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function RulesSection() {
  const containerRef = useRef(null);

  return (
    <section id="rules" ref={containerRef} className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-900 tracking-tight text-white leading-tight">
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

