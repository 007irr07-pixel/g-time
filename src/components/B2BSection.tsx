"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";
import dynamic from "next/dynamic";

const B2BLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.B2BLive3D), { ssr: false });

function AnimatedCounter({ target, suffix = "", duration = 2.5 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref} className="tabular-nums">{count.toLocaleString("ru-RU")}{suffix}</span>;
}

/* Removed legacy B2B SVGs in favor of B2BLive3D WebGL scenes */

const pillars = [
  { type: "logistics" as const, title: "Собственный автопарк", value: 50, suffix: "+", unit: "тягачей на линии", desc: "Оперативная мультимодальная доставка длинномерами по всему РК. Комплектуем сложные сборные грузы день в день.", color: "orange" },
  { type: "certificate" as const, title: "Безупречная документация", value: 100, suffix: "%", unit: "чистота сделок", desc: "Полная юридическая прозрачность: паспорта качества завода-изготовителя, сертификаты ГОСТ и СТ-KZ для каждой тонны металла.", color: "green" },
  { type: "finance" as const, title: "Гибкое финансирование", value: 60, suffix: "", unit: "дней отсрочки", desc: "Эксклюзивные условия кредитования и товарные отсрочки для генподрядчиков, а также поддержка в государственном секторе.", color: "orange" },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0], index: number }) {
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
        className={`relative group bg-graphite/25 backdrop-blur-xl rounded-3xl p-10 border border-white/5 hover:border-${pillar.color === 'orange' ? 'accent-orange/30' : 'accent-green/30'} flex flex-col justify-between overflow-hidden cursor-pointer h-full min-h-[400px]`}
      >
        {/* Giant Background 3D WebGL scene */}
        <B2BLive3D type={pillar.type} />
  
        {/* Background glow radial */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${pillar.color === 'orange' ? 'bg-accent-orange/10' : 'bg-accent-green/10'}`} />
  
        {/* Foreground Content with 3D Float */}
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10 flex flex-col h-full pointer-events-none drop-shadow-2xl">
          <div className="mb-auto">
            <div className="text-5xl sm:text-7xl font-heading font-900 text-white leading-none tracking-tighter mb-2">
              <AnimatedCounter target={pillar.value} suffix={pillar.suffix} />
            </div>
            <div className={`text-sm font-bold uppercase tracking-widest ${pillar.color === 'orange' ? 'text-accent-orange' : 'text-accent-green'} drop-shadow-md`}>
              {pillar.unit}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-heading font-800 text-white mb-4 tracking-tight drop-shadow-lg">{pillar.title}</h3>
            <p className="text-base text-zinc-100 leading-relaxed font-light drop-shadow-md">{pillar.desc}</p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function B2BSection() {
  const containerRef = useRef(null);

  return (
    <section id="b2b" ref={containerRef} className="relative py-32 sm:py-48 overflow-hidden bg-graphite">
      {/* Heavy mesh background */}
      <div className="absolute inset-0 steel-mesh opacity-20" />
      <div className="absolute inset-0 noise-bg mix-blend-overlay" />

      {/* Cinematic Marquee Text Background (Pure CSS for zero scroll lag) */}
      <style>{`
        @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee-left { animation: marquee-left 40s linear infinite; }
        .animate-marquee-right { animation: marquee-right 40s linear infinite; }
      `}</style>
      <div className="absolute top-[20%] w-[200vw] opacity-[0.03] select-none pointer-events-none flex flex-col gap-10 overflow-hidden">
        <div className="animate-marquee-left flex whitespace-nowrap text-[12rem] font-heading font-900 uppercase">
          МЕТАЛЛОПРОКАТ ПРЕМИУМ КЛАССА • G-TIME • МЕТАЛЛОПРОКАТ ПРЕМИУМ КЛАССА • G-TIME • МЕТАЛЛОПРОКАТ ПРЕМИУМ КЛАССА • G-TIME • МЕТАЛЛОПРОКАТ ПРЕМИУМ КЛАССА • G-TIME
        </div>
        <div 
          className="animate-marquee-right flex whitespace-nowrap text-[12rem] font-heading font-900 uppercase text-transparent" 
          style={{ WebkitTextStroke: "2px white" }}
        >
          ТОНН МЕТАЛЛА • СЕРТИФИКАТЫ КАЧЕСТВА • ТОНН МЕТАЛЛА • СЕРТИФИКАТЫ КАЧЕСТВА • ТОНН МЕТАЛЛА • СЕРТИФИКАТЫ КАЧЕСТВА • ТОНН МЕТАЛЛА • СЕРТИФИКАТЫ КАЧЕСТВА
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-900 mt-2 mb-6 tracking-tight text-white leading-tight">
            Бесперебойное снабжение <br className="hidden lg:block"/><span className="gradient-text-orange">ваших строительных объектов.</span>
          </h2>
          <p className="text-zinc-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">Мы берем на себя всю логистику, маркировку и документальное сопровождение, гарантируя поставку металла без риска срыва сроков.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
