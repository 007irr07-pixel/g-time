"use client";

import { motion } from "framer-motion";

interface IllustrationProps {
  isHovered: boolean;
  color?: "orange" | "green";
}

const getColors = (color: "orange" | "green") => {
  return color === "orange"
    ? { primary: "#FF5722", bg: "rgba(255, 87, 34, 0.15)", glow: "rgba(255, 87, 34, 0.4)" }
    : { primary: "#00E676", bg: "rgba(0, 230, 118, 0.15)", glow: "rgba(0, 230, 118, 0.4)" };
};

// ==========================================
// Трубный прокат (Pipes) - 3 Stacked Pipes
// ==========================================
export const PipeIllustration = ({ isHovered, color = "orange" }: IllustrationProps) => {
  const { primary, bg, glow } = getColors(color);
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-100 transition-opacity duration-500">
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.2 : [1, 1.05, 1], 
          opacity: isHovered ? 1 : [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] right-0 mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${bg} 0%, transparent 70%)` }}
      />
      <svg width="240" height="240" viewBox="0 0 200 200" fill="none" className="relative z-10" style={{ transform: "rotate(-15deg)" }}>
        {/* Pipe 1 (Back left) */}
        <g stroke="#4A4D52" strokeWidth="2" fill="#2C2F33">
          <path d="M50 80 L150 50 V110 L50 140 Z" />
          <ellipse cx="50" cy="110" rx="15" ry="30" stroke={primary} />
          <ellipse cx="150" cy="80" rx="15" ry="30" />
        </g>
        {/* Pipe 2 (Back right) */}
        <g stroke="#4A4D52" strokeWidth="2" fill="#3A3D42">
          <path d="M100 120 L180 90 V150 L100 180 Z" />
          <ellipse cx="100" cy="150" rx="15" ry="30" stroke={primary} />
          <ellipse cx="180" cy="120" rx="15" ry="30" />
        </g>
        {/* Pipe 3 (Front center) */}
        <motion.g 
          stroke={isHovered ? primary : "#6A6D72"} 
          strokeWidth="3" 
          fill="#1A1A1A"
          animate={{ x: isHovered ? -10 : 0, y: isHovered ? -10 : [0, -5, 0], filter: isHovered ? `drop-shadow(0 0 15px ${glow})` : "none" }}
          transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, default: { type: "spring" } }}
        >
          <path d="M40 130 L160 90 V160 L40 200 Z" fill="url(#pipeGrad)" />
          {/* Front opening */}
          <ellipse cx="40" cy="165" rx="20" ry="35" fill="#111" stroke={primary} />
          <ellipse cx="40" cy="165" rx="15" ry="25" fill="#000" stroke={primary} />
          <ellipse cx="160" cy="125" rx="20" ry="35" />
        </motion.g>

        <defs>
          <linearGradient id="pipeGrad" x1="40" y1="165" x2="160" y2="125">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="50%" stopColor="#3A3D42" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// Сортовой прокат (Beam) - I-Beam
// ==========================================
export const BeamIllustration = ({ isHovered, color = "green" }: IllustrationProps) => {
  const { primary, bg, glow } = getColors(color);
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-100 transition-opacity duration-500">
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.2 : [1, 1.05, 1], 
          opacity: isHovered ? 1 : [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] right-0 mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${bg} 0%, transparent 70%)` }}
      />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="relative z-10" style={{ transform: "rotate(10deg)" }}>
        <motion.g
          stroke={isHovered ? primary : "#6A6D72"}
          strokeWidth="2"
          strokeLinejoin="round"
          animate={{ y: isHovered ? -15 : [0, -6, 0], filter: isHovered ? `drop-shadow(0 0 15px ${glow})` : "none" }}
          transition={{ y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, default: { type: "spring" } }}
        >
          {/* Bottom flange */}
          <path d="M40 160 L140 130 L170 150 L70 180 Z" fill="#2C2F33" />
          {/* Top flange */}
          <path d="M40 50 L140 20 L170 40 L70 70 Z" fill="#3A3D42" />
          {/* Web (middle part) */}
          <path d="M90 60 L120 50 V140 L90 150 Z" fill="#1A1A1A" />
          
          {/* Front face highlights */}
          <path d="M40 50 L70 70 V180 L40 160 Z" fill="url(#beamGrad)" stroke={primary} strokeWidth="3" />
          <path d="M70 70 L90 60 V150 L70 180 Z" fill="#1A1A1A" stroke={primary} strokeWidth="1" />
        </motion.g>

        <defs>
          <linearGradient id="beamGrad" x1="40" y1="50" x2="70" y2="180">
            <stop offset="0%" stopColor="#3A3D42" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// Листовой прокат (Sheets) - Stacked metal sheets
// ==========================================
export const SheetIllustration = ({ isHovered, color = "orange" }: IllustrationProps) => {
  const { primary, bg, glow } = getColors(color);
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-100 transition-opacity duration-500">
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.2 : [1, 1.05, 1], 
          opacity: isHovered ? 1 : [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] right-0 mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${bg} 0%, transparent 70%)` }}
      />
      <svg width="240" height="240" viewBox="0 0 200 200" fill="none" className="relative z-10">
        {[20, 10, 0].map((offset, i) => (
          <motion.g
            key={i}
            stroke={i === 2 && isHovered ? primary : "#4A4D52"}
            strokeWidth={i === 2 ? "3" : "2"}
            strokeLinejoin="round"
            animate={{ 
              y: isHovered ? offset - 30 : [offset, offset - 5, offset],
              x: isHovered ? (i === 2 ? -10 : 0) : 0,
              filter: i === 2 && isHovered ? `drop-shadow(0 0 15px ${glow})` : "none"
            }}
            transition={{ y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }, default: { type: "spring" } }}
          >
            <path d={`M30 ${140 - offset} L100 ${100 - offset} L180 ${130 - offset} L110 ${170 - offset} Z`} fill={i === 2 ? "url(#sheetGrad)" : "#2C2F33"} />
            {/* Edge depth */}
            <path d={`M30 ${140 - offset} V${145 - offset} L110 ${175 - offset} L180 ${135 - offset} V${130 - offset} L110 ${170 - offset} Z`} fill="#1A1A1A" />
          </motion.g>
        ))}
        <defs>
          <linearGradient id="sheetGrad" x1="30" y1="140" x2="180" y2="130">
            <stop offset="0%" stopColor="#3A3D42" />
            <stop offset="50%" stopColor="#6A6D72" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// Фасонный прокат (Angles) - L-Profile
// ==========================================
export const AngleIllustration = ({ isHovered, color = "green" }: IllustrationProps) => {
  const { primary, bg, glow } = getColors(color);
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-100 transition-opacity duration-500">
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.2 : [1, 1.05, 1], 
          opacity: isHovered ? 1 : [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] right-0 mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${bg} 0%, transparent 70%)` }}
      />
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="relative z-10" style={{ transform: "rotate(-5deg)" }}>
        <motion.g
          stroke={isHovered ? primary : "#6A6D72"}
          strokeWidth="3"
          strokeLinejoin="round"
          animate={{ x: isHovered ? -15 : [0, -4, 0], y: isHovered ? -15 : [0, -4, 0], filter: isHovered ? `drop-shadow(0 0 15px ${glow})` : "none" }}
          transition={{ x: { duration: 4, repeat: Infinity, ease: "easeInOut" }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" }, default: { type: "spring" } }}
        >
          {/* L-Shape front face */}
          <path d="M60 40 L80 50 V140 L160 110 V130 L60 170 Z" fill="url(#angleGrad)" stroke={primary} />
          {/* L-Shape right extruded face */}
          <path d="M160 110 L180 90 V110 L160 130 Z" fill="#1A1A1A" />
          {/* L-Shape back extruded faces */}
          <path d="M80 50 L100 30 V120 L180 90 L160 110 V140 Z" fill="#2C2F33" stroke="#4A4D52" strokeWidth="2" />
          <path d="M60 40 L80 20 L100 30 L80 50 Z" fill="#3A3D42" />
        </motion.g>

        <defs>
          <linearGradient id="angleGrad" x1="60" y1="40" x2="160" y2="170">
            <stop offset="0%" stopColor="#4A4D52" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// Арматура (Rebar) - Ribbed cylindrical rod
// ==========================================
export const RebarIllustration = ({ isHovered, color = "orange" }: IllustrationProps) => {
  const { primary, bg, glow } = getColors(color);
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-100 transition-opacity duration-500">
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.2 : [1, 1.05, 1], 
          opacity: isHovered ? 1 : [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] right-0 mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${bg} 0%, transparent 70%)` }}
      />
      <svg width="240" height="240" viewBox="0 0 200 200" fill="none" className="relative z-10" style={{ transform: "rotate(35deg)" }}>
        <motion.g
          animate={{ x: isHovered ? -10 : [0, -5, 0], filter: isHovered ? `drop-shadow(0 0 15px ${glow})` : "none" }}
          transition={{ x: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* Main rod body */}
          <path d="M80 0 L120 0 V200 L80 200 Z" fill="url(#rebarGrad)" />
          {/* Rod borders */}
          <path d="M80 0 V200 M120 0 V200" stroke={isHovered ? primary : "#6A6D72"} strokeWidth="4" />
          
          {/* Ribs (Арматурные насечки) */}
          {[10, 40, 70, 100, 130, 160, 190].map((y, i) => (
            <motion.path 
              key={i}
              d={`M75 ${y} L125 ${y + 20}`} 
              stroke={isHovered ? primary : "#8A8D92"} 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ type: "spring", delay: i * 0.05 }}
            />
          ))}
          {[25, 55, 85, 115, 145, 175].map((y, i) => (
            <motion.path 
              key={i}
              d={`M75 ${y + 20} L125 ${y}`} 
              stroke={isHovered ? primary : "#4A4D52"} 
              strokeWidth="4" 
              strokeLinecap="round"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ type: "spring", delay: i * 0.05 }}
            />
          ))}
        </motion.g>

        <defs>
          <linearGradient id="rebarGrad" x1="80" y1="0" x2="120" y2="0">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="50%" stopColor="#4A4D52" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ==========================================
// Hero Section Dynamic Interactive Pipe SVG
// ==========================================
export const HeroPipeIllustration = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 mix-blend-screen overflow-visible">
      {/* Background massive glowing aura */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(255,87,34,0.1) 0%, rgba(0,230,118,0.05) 50%, transparent 80%)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 3D Massive Pipe Bundle */}
      <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" className="relative z-10 w-full max-w-[800px] h-auto drop-shadow-[0_0_50px_rgba(255,87,34,0.2)]">
        
        {/* Animated Background Sparks */}
        <motion.circle cx="400" cy="300" r="3" fill="#FF5722" animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
        <motion.circle cx="650" cy="500" r="4" fill="#00E676" animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.circle cx="300" cy="600" r="2" fill="#FFFFFF" animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />

        <g transform="translate(150, 100)">
          {/* Back Pipe (Green accent) */}
          <motion.g 
            animate={{ y: [0, -20, 0], rotate: [0, -1, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M400 600 L750 250 V330 L400 680 Z" fill="url(#heroPipeGreen)" stroke="#00E676" strokeWidth="2" opacity="0.8" />
            <ellipse cx="400" cy="640" rx="30" ry="40" fill="#111" stroke="#00E676" strokeWidth="2" />
            <ellipse cx="750" cy="290" rx="30" ry="40" fill="#222" />
          </motion.g>

          {/* Middle Silver Pipe */}
          <motion.g 
            animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 1, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <path d="M200 450 L650 100 V180 L200 530 Z" fill="url(#heroPipeSilver)" stroke="#8A8D92" strokeWidth="1" />
            <ellipse cx="200" cy="490" rx="35" ry="40" fill="#111" stroke="#8A8D92" strokeWidth="2" />
            <ellipse cx="200" cy="490" rx="25" ry="30" fill="#000" />
            <ellipse cx="650" cy="140" rx="35" ry="40" fill="#333" />
          </motion.g>

          {/* Front Giant Orange Pipe (Main) */}
          <motion.g 
            animate={{ y: [0, -30, 0], x: [0, -15, 0], filter: ["drop-shadow(0 0 20px rgba(255,87,34,0.3))", "drop-shadow(0 0 40px rgba(255,87,34,0.6))", "drop-shadow(0 0 20px rgba(255,87,34,0.3))"] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <path d="M100 650 L550 250 V350 L100 750 Z" fill="url(#heroPipeMain)" stroke="#FF5722" strokeWidth="4" />
            {/* Front glowing opening */}
            <ellipse cx="100" cy="700" rx="45" ry="50" fill="#1A1A1A" stroke="#FF5722" strokeWidth="4" />
            {/* Deep inner core */}
            <ellipse cx="100" cy="700" rx="30" ry="35" fill="#000" stroke="#FF5722" strokeOpacity="0.5" strokeWidth="2" />
            
            {/* Animated Liquid/Energy flowing out of the pipe */}
            <motion.path 
              d="M100 740 Q 150 800 200 750 T 300 800"
              stroke="url(#energyGlow)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>
        </g>

        <defs>
          <linearGradient id="heroPipeMain" x1="100" y1="650" x2="550" y2="350">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="30%" stopColor="#FF5722" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#3A3D42" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
          
          <linearGradient id="heroPipeSilver" x1="200" y1="450" x2="650" y2="100">
            <stop offset="0%" stopColor="#2A2D31" />
            <stop offset="50%" stopColor="#B0B3B8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>

          <linearGradient id="heroPipeGreen" x1="400" y1="600" x2="750" y2="250">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="40%" stopColor="#00E676" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2C2F33" />
          </linearGradient>

          <linearGradient id="energyGlow" x1="100" y1="740" x2="300" y2="800">
            <stop offset="0%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
