"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRightLeft, Info } from "lucide-react";

interface ProductType {
  id: string;
  name: string;
  fields: { label: string; key: string; unit: string; placeholder: string }[];
  calc: (params: Record<string, number>) => number;
  formula: string;
}

const STEEL_DENSITY = 7850; // kg/m³

const productTypes: ProductType[] = [
  {
    id: "round_pipe",
    name: "Труба круглая",
    fields: [
      { label: "Наружный диаметр", key: "d", unit: "мм", placeholder: "89" },
      { label: "Толщина стенки", key: "t", unit: "мм", placeholder: "3.5" },
      { label: "Длина", key: "l", unit: "м", placeholder: "6" },
    ],
    calc: ({ d, t, l }) => {
      if (!d || !t || !l) return 0;
      return ((Math.PI * (d - t) * t * l) / 1_000_000) * STEEL_DENSITY;
    },
    formula: "π × (D − t) × t × L × ρ",
  },
  {
    id: "profile_pipe",
    name: "Труба профильная",
    fields: [
      { label: "Ширина (A)", key: "a", unit: "мм", placeholder: "80" },
      { label: "Высота (B)", key: "b", unit: "мм", placeholder: "40" },
      { label: "Толщина стенки", key: "t", unit: "мм", placeholder: "3" },
      { label: "Длина", key: "l", unit: "м", placeholder: "6" },
    ],
    calc: ({ a, b, t, l }) => {
      if (!a || !b || !t || !l) return 0;
      return ((2 * (a + b - 2 * t) * t * l) / 1_000_000) * STEEL_DENSITY;
    },
    formula: "2 × (A + B − 2t) × t × L × ρ",
  },
  {
    id: "rebar",
    name: "Арматура",
    fields: [
      { label: "Диаметр", key: "d", unit: "мм", placeholder: "12" },
      { label: "Длина", key: "l", unit: "м", placeholder: "11.7" },
    ],
    calc: ({ d, l }) => {
      if (!d || !l) return 0;
      return ((Math.PI * (d / 2) ** 2 * l) / 1_000_000) * STEEL_DENSITY;
    },
    formula: "π × (d/2)² × L × ρ",
  },
  {
    id: "sheet",
    name: "Лист",
    fields: [
      { label: "Толщина", key: "t", unit: "мм", placeholder: "5" },
      { label: "Ширина", key: "w", unit: "мм", placeholder: "1500" },
      { label: "Длина", key: "l", unit: "мм", placeholder: "6000" },
    ],
    calc: ({ t, w, l }) => {
      if (!t || !w || !l) return 0;
      return (t * w * l * STEEL_DENSITY) / 1_000_000_000;
    },
    formula: "t × W × L × ρ",
  },
  {
    id: "angle",
    name: "Уголок равнополочный",
    fields: [
      { label: "Ширина полки", key: "a", unit: "мм", placeholder: "63" },
      { label: "Толщина", key: "t", unit: "мм", placeholder: "5" },
      { label: "Длина", key: "l", unit: "м", placeholder: "6" },
    ],
    calc: ({ a, t, l }) => {
      if (!a || !t || !l) return 0;
      return ((2 * a - t) * t * l * STEEL_DENSITY) / 1_000_000;
    },
    formula: "(2A − t) × t × L × ρ",
  },
];

export default function CalculatorSection() {
  const [selectedProduct, setSelectedProduct] = useState(productTypes[0]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState("1");

  const numParams = useMemo(() => {
    const result: Record<string, number> = {};
    for (const [key, val] of Object.entries(params)) {
      result[key] = parseFloat(val) || 0;
    }
    return result;
  }, [params]);

  const weightPerPiece = useMemo(
    () => selectedProduct.calc(numParams),
    [selectedProduct, numParams]
  );
  const totalWeight = weightPerPiece * (parseFloat(quantity) || 1);

  const handleProductChange = (id: string) => {
    const product = productTypes.find((p) => p.id === id)!;
    setSelectedProduct(product);
    setParams({});
  };

  return (
    <section id="calculator" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-graphite" />
      <div className="absolute inset-0 noise-bg mix-blend-overlay" />

      {/* Background Marquee Formulas */}
      <div className="absolute top-[30%] w-full whitespace-nowrap opacity-[0.03] select-none pointer-events-none flex flex-col gap-16 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="text-[10rem] font-heading font-900 text-white"
        >
          V = π × r² × h • m = ρ × V • P = F / A • M = q × l² / 8 • V = π × r² × h • m = ρ × V • P = F / A • M = q × l² / 8
        </motion.div>
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="text-[10rem] font-heading font-900 text-transparent"
          style={{ WebkitTextStroke: "2px white" }}
        >
          L = 2πr • S = a × b • ρ = 7850 кг/м³ • m = ρ × V • L = 2πr • S = a × b • ρ = 7850 кг/м³ • m = ρ × V
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-accent-cyan uppercase tracking-[0.2em]">
            Инструменты
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-800 mt-4 mb-6">
            Калькулятор{" "}
            <span className="gradient-text-cyan">металлопроката</span>
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            Мгновенный расчет веса. Введите параметры — результат обновляется на
            лету, без кнопки «Рассчитать».
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-border relative overflow-hidden">
            {/* Glow bg */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-cyan/5 rounded-full blur-3xl" />

            {/* Product selector */}
            <div className="mb-8">
              <label className="text-sm text-silver mb-3 block font-medium">
                Тип продукции
              </label>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProductChange(p.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedProduct.id === p.id
                        ? "bg-accent-cyan text-graphite"
                        : "bg-surface text-silver hover:text-white hover:bg-surface-hover border border-border"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {selectedProduct.fields.map((field) => (
                <div key={field.key}>
                  <label className="text-sm text-silver mb-2 block">
                    {field.label}{" "}
                    <span className="text-steel">({field.unit})</span>
                  </label>
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    value={params[field.key] || ""}
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-cyan/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all text-lg font-mono"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm text-silver mb-2 block">
                  Количество <span className="text-steel">(шт)</span>
                </label>
                <input
                  type="number"
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-graphite border border-border rounded-xl px-4 py-3 text-white placeholder:text-steel focus:border-accent-cyan/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all text-lg font-mono"
                />
              </div>
            </div>

            {/* Result */}
            <div className="bg-graphite rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-4 text-sm text-silver">
                <Calculator size={16} className="text-accent-cyan" />
                Результат расчета
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-silver mb-1">Вес 1 единицы</div>
                  <motion.div
                    key={weightPerPiece.toFixed(2)}
                    initial={{ scale: 1.1, color: "#5DB0E5" }}
                    animate={{ scale: 1, color: "#FFFFFF" }}
                    className="text-2xl sm:text-3xl font-heading font-800"
                  >
                    {weightPerPiece > 0 ? weightPerPiece.toFixed(2) : "—"}
                    <span className="text-sm text-silver ml-2 font-normal">
                      кг
                    </span>
                  </motion.div>
                </div>
                <div className="flex items-center justify-center text-steel hidden sm:flex">
                  <ArrowRightLeft size={20} />
                </div>
                <div>
                  <div className="text-sm text-silver mb-1">Общий вес</div>
                  <motion.div
                    key={totalWeight.toFixed(2)}
                    initial={{ scale: 1.1, color: "#5DB0E5" }}
                    animate={{ scale: 1, color: "#FFFFFF" }}
                    className="text-2xl sm:text-3xl font-heading font-800"
                  >
                    {totalWeight > 0
                      ? totalWeight >= 1000
                        ? (totalWeight / 1000).toFixed(3) + " т"
                        : totalWeight.toFixed(2) + " кг"
                      : "—"}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Formula hint */}
            <div className="flex items-start gap-2 mt-4 text-xs text-steel">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>
                Формула: {selectedProduct.formula} | Плотность стали: ρ ={" "}
                {STEEL_DENSITY} кг/м³
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


