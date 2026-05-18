"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import dynamic from "next/dynamic";
import ProductsModal from "./ProductsModal";
import { useModal } from "./ModalContext";
import { MessageCircle, Loader2 } from "lucide-react";
import { formatPhoneNumber } from "@/utils/formatPhone";

const CardLive3D = dynamic(() => import("./LiveIlls").then(mod => mod.CardLive3D), { ssr: false });

interface CatalogItem {
  id: string;
  illustration: React.FC<{ isHovered: boolean; color?: "blue" | "cyan" }>;
  title: string;
  subtitle: string;
  items: string[];
  accentColor: "blue" | "cyan";
  borderColor: string;
  glowColor: string;
}

const catalogItems: CatalogItem[] = [
  {
    id: "pipes",
    illustration: (props: any) => <CardLive3D type="pipe" color={props.color || "blue"} />,
    title: "Трубный прокат",
    subtitle: "Профильные и круглые трубы",
    items: ["Труба ВГП", "Труба э/с", "Труба профильная", "Труба бесшовная"],
    accentColor: "blue",
    borderColor: "hover:border-accent-blue/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(0,71,154,0.15)]",
  },
  {
    id: "beams",
    illustration: (props: any) => <CardLive3D type="beam" color={props.color || "cyan"} />,
    title: "Сортовой прокат",
    subtitle: "Швеллеры, балки, уголки",
    items: ["Швеллер", "Балка двутавровая", "Уголок", "Полоса"],
    accentColor: "cyan",
    borderColor: "hover:border-accent-cyan/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(93,176,229,0.15)]",
  },
  {
    id: "sheets",
    illustration: (props: any) => <CardLive3D type="sheet" color={props.color || "blue"} />,
    title: "Листовой прокат",
    subtitle: "Горячекатаный и оцинкованный",
    items: ["Лист г/к", "Лист х/к", "Лист оцинкованный", "Лист рифленый"],
    accentColor: "blue",
    borderColor: "hover:border-accent-blue/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(0,71,154,0.15)]",
  },
  {
    id: "angles",
    illustration: (props: any) => <CardLive3D type="angle" color={props.color || "cyan"} />,
    title: "Фасонный прокат",
    subtitle: "Специальные профили",
    items: ["Швеллер гнутый", "Профиль Z-образный", "Уголок неравнополочный", "Профлист"],
    accentColor: "cyan",
    borderColor: "hover:border-accent-cyan/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(93,176,229,0.15)]",
  },
  {
    id: "rebar",
    illustration: (props: any) => <CardLive3D type="rebar" color={props.color || "blue"} />,
    title: "Арматура",
    subtitle: "Строительная арматура и проволока",
    items: ["Арматура А500С", "Арматура А400", "Проволока ВР-1", "Катанка"],
    accentColor: "blue",
    borderColor: "hover:border-accent-blue/50",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(0,71,154,0.15)]",
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

function CatalogCard({ item, index, onOpen }: { item: CatalogItem; index: number; onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const { openVentmarketModal } = useModal();
  const Illustration = item.illustration;

  return (
    <motion.div variants={itemVariants} className={index >= 3 ? "lg:col-span-3" : "lg:col-span-2"}>
      <TiltCard
        className={`group relative h-full w-full min-h-[440px] bg-gradient-to-br from-silver/10 to-graphite/25 backdrop-blur-xl rounded-3xl p-8 sm:p-10 cursor-default overflow-hidden transition-all duration-500 border border-silver/20 ${item.borderColor}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative z-0 h-full flex flex-col transition-all duration-700 ease-out">
          {/* Massive Background Custom SVG Illustration */}
          <Illustration isHovered={isHovered} color={item.accentColor} />
          {/* Dark gradient overlay to ensure text is ALWAYS readable regardless of 3D animation behind it */}
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-graphite/95 via-graphite/50 to-transparent pointer-events-none mix-blend-multiply" />

          {/* Floating 3D Foreground Content */}
          <div style={{ transform: "translateZ(60px)" }} className="relative z-10 h-full flex flex-col pointer-events-none drop-shadow-2xl">
            <div className="mt-auto pt-32 pb-[190px]">
              {/* Title */}
              <h3 className="text-3xl sm:text-4xl font-heading font-900 text-white mb-2 tracking-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                {item.title}
              </h3>
              <p className="text-base text-zinc-100 mb-8 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{item.subtitle}</p>

              {/* Items list */}
              <ul className="space-y-3 relative z-10">
                {item.items.map((prod) => (
                  <li
                    key={prod}
                    className="flex flex-wrap items-center gap-4 text-sm font-medium text-white group-hover:text-zinc-100 transition-colors drop-shadow"
                  >
                    <span
                      className={`w-1.5 h-1.5 shrink-0 rounded-full ${
                        item.accentColor === "blue"
                          ? "bg-accent-blue shadow-[0_0_12px_#00479A]"
                          : "bg-accent-cyan shadow-[0_0_12px_#5DB0E5]"
                      } transition-all duration-300 group-hover:scale-[2]`}
                    />
                    {prod}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons - Static */}
        <div 
          style={{ transform: "translateZ(40px)" }}
          className="absolute bottom-6 right-6 left-6 z-20 flex flex-col gap-3"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="w-full flex items-center justify-center py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer backdrop-blur-md"
          >
            Подробнее
          </button>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openVentmarketModal();
              }}
              className="flex items-center justify-center py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 bg-[#1e88e5] hover:bg-[#1565c0] shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-none cursor-pointer"
            >
              Узнать стоимость
            </button>
            <a
              href="https://wa.me/77478390605"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 bg-[#25D366] hover:bg-[#20bd5a] shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-none cursor-pointer"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function CatalogSection() {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, type: 'price' }),
      });

      if (!res.ok) throw new Error("Ошибка сервера");

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setPhone("");
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при отправке заявки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="catalog" className="relative py-16 sm:py-24 perspective-[2000px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-xs font-bold text-accent-blue uppercase tracking-[0.2em] mb-4">
            Каталог продукции
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-900 mt-2 mb-6 tracking-tight text-white">
            Металлопрокат строго по ГОСТ <br className="hidden sm:block" />
            <span className="gradient-text-blue">Без ожидания и перебоев</span>
          </h2>
          <p className="text-zinc-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            50 000 тонн металла уже на складе. От труб до арматуры — скомплектуем заказ любой сложности за 1 час
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
            <CatalogCard key={item.id} item={item} index={i} onOpen={() => setOpenCategoryId(item.id)} />
          ))}
        </motion.div>

        {/* Lead Form - Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-br from-graphite/80 to-gunmetal/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/recommendations/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <h3 className="text-3xl sm:text-4xl font-heading font-800 text-white text-center lg:text-left leading-tight lg:max-w-md drop-shadow-md">
              Оставьте заявку и мы отправим вам <span className="text-accent-blue">прайс-лист</span>
            </h3>
            
            <form className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1 justify-end" onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите имя" 
                required
                className="w-full sm:w-64 px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent text-lg backdrop-blur-sm transition-all"
              />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                placeholder="+7 700 000 00 00" 
                required
                maxLength={16}
                className="w-full sm:w-64 px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent text-lg backdrop-blur-sm transition-all"
              />
              <button 
                type="submit"
                disabled={loading || success}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white transition-all whitespace-nowrap text-lg flex items-center justify-center gap-2 ${
                  success 
                    ? "bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                    : "bg-accent-blue hover:bg-accent-blue-dark shadow-[0_0_20px_rgba(0,71,154,0.4)] hover:shadow-[0_0_30px_rgba(0,71,154,0.6)] hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : null}
                {success ? "ЗАЯВКА ОТПРАВЛЕНА" : loading ? "ОТПРАВКА..." : "ПОЛУЧИТЬ ПРАЙС"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
      <ProductsModal isOpen={openCategoryId !== null} onClose={() => setOpenCategoryId(null)} categoryId={openCategoryId} />
    </>
  );
}



