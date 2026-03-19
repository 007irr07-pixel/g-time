"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import dynamic from "next/dynamic";

const CardLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.CardLive3D), { ssr: false });

interface CatalogItem {
  id: string;
  illustration: React.FC<{ isHovered: boolean; color?: "orange" | "green" }>;
  title: string;
  subtitle: string;
  items: string[];
  accentColor: "orange" | "green";
  borderColor: string;
  glowColor: string;
}

const catalogItems: CatalogItem[] = [
  {
    id: "pipes",
    illustration: (props: any) => <CardLive3D type="pipe" color={props.color || "orange"} />,
    title: "Трубный прокат",
    subtitle: "Профильные и круглые трубы",
    items: ["Труба ВГП", "Труба э/с", "Труба профильная", "Труба бесшовная"],
    accentColor: "orange",
    borderColor: "hover:border-accent-orange/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(255,87,34,0.15)]",
  },
  {
    id: "beams",
    illustration: (props: any) => <CardLive3D type="beam" color={props.color || "green"} />,
    title: "Сортовой прокат",
    subtitle: "Швеллеры, балки, уголки",
    items: ["Швеллер", "Балка двутавровая", "Уголок", "Полоса"],
    accentColor: "green",
    borderColor: "hover:border-accent-green/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(0,230,118,0.15)]",
  },
  {
    id: "sheets",
    illustration: (props: any) => <CardLive3D type="sheet" color={props.color || "orange"} />,
    title: "Листовой прокат",
    subtitle: "Горячекатаный и оцинкованный",
    items: ["Лист г/к", "Лист х/к", "Лист оцинкованный", "Лист рифленый"],
    accentColor: "orange",
    borderColor: "hover:border-accent-orange/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(255,87,34,0.15)]",
  },
  {
    id: "angles",
    illustration: (props: any) => <CardLive3D type="angle" color={props.color || "green"} />,
    title: "Фасонный прокат",
    subtitle: "Специальные профили",
    items: ["Швеллер гнутый", "Профиль Z-образный", "Уголок неравнополочный", "Профлист"],
    accentColor: "green",
    borderColor: "hover:border-accent-green/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(0,230,118,0.15)]",
  },
  {
    id: "rebar",
    illustration: (props: any) => <CardLive3D type="rebar" color={props.color || "orange"} />,
    title: "Арматура",
    subtitle: "Строительная арматура и проволока",
    items: ["Арматура А500С", "Арматура А400", "Проволока ВР-1", "Катанка"],
    accentColor: "orange",
    borderColor: "hover:border-accent-orange/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(255,87,34,0.15)]",
  },
];

const containerVariants: import("framer-motion").Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

function CatalogCard({ item, index }: { item: CatalogItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Illustration = item.illustration;

  return (
    <motion.div variants={itemVariants} className={index >= 3 ? "lg:col-span-3" : "lg:col-span-2"}>
      <TiltCard
        className={`group relative h-full w-full min-h-[420px] bg-gradient-to-br from-silver/10 to-graphite/25 backdrop-blur-xl rounded-3xl p-8 sm:p-10 cursor-pointer overflow-hidden transition-all duration-500 border border-silver/20 ${item.borderColor}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Massive Background Custom SVG Illustration */}
        <Illustration isHovered={isHovered} color={item.accentColor} />

        {/* Floating 3D Foreground Content */}
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10 h-full flex flex-col pointer-events-none drop-shadow-2xl">
          <div className="mt-auto pt-32">
            {/* Title */}
            <h3 className="text-3xl sm:text-4xl font-heading font-900 text-white mb-2 tracking-tight">
              {item.title}
            </h3>
            <p className="text-base text-zinc-100 mb-8">{item.subtitle}</p>

            {/* Items list */}
            <ul className="space-y-3 relative z-10">
              {item.items.map((prod) => (
                <li
                  key={prod}
                  className="flex items-center gap-4 text-sm font-medium text-white group-hover:text-zinc-100 transition-colors"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.accentColor === "orange"
                        ? "bg-accent-orange shadow-[0_0_12px_#FF5722]"
                        : "bg-accent-green shadow-[0_0_12px_#00E676]"
                    } transition-all duration-300 group-hover:scale-[2]`}
                  />
                  {prod}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Open button */}
        <div 
          style={{ transform: "translateZ(40px)" }}
          className="absolute bottom-6 right-6 left-6 z-20 pointer-events-none"
        >
          <motion.div
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-base text-white border transition-all duration-500 ${
              item.accentColor === "orange"
                ? "bg-accent-orange/80 border-accent-orange/50 shadow-[0_0_20px_rgba(255,87,34,0.2)]"
                : "bg-accent-green/80 border-accent-green/50 shadow-[0_0_20px_rgba(0,230,118,0.2)]"
            } backdrop-blur-md`}
            initial={{ y: 10, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Открыть
            <span className="text-lg">→</span>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function CatalogSection() {
  return (
    <section id="catalog" className="relative py-24 sm:py-40 perspective-[2000px]">
      {/* Deep dark background matching Hero */}
      <div className="absolute inset-0 bg-graphite" />
      
      {/* Grid texture overlay matching Hero */}
      <div className="absolute inset-0 steel-mesh opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-accent-orange/30 bg-accent-orange/5 text-xs font-bold text-accent-orange uppercase tracking-[0.2em] mb-4">
            Каталог продукции
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-900 mt-2 mb-6 tracking-tight text-white">
            Металлопрокат строго по ГОСТ. <br className="hidden sm:block" />
            <span className="gradient-text-orange">Без ожидания и перебоев.</span>
          </h2>
          <p className="text-zinc-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            50 000 тонн металла уже на складе. От труб до арматуры — скомплектуем заказ любой сложности за 1 час.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8"
        >
          {catalogItems.map((item, i) => (
            <CatalogCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
