"use client";

import React from "react";

export default function BlueprintSVG() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg 
        viewBox="0 0 1000 1000"
        width="100%" 
        height="100%" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.1]"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
          <pattern id="diagonal-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* ОСНОВНЫЕ ВЕРТИКАЛЬНЫЕ КОЛОННЫ (ДВУТАВРЫ) */}
        <rect x="35%" y="0" width="24" height="100%" fill="url(#beam-grad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <rect x="65%" y="0" width="24" height="100%" fill="url(#beam-grad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        
        {/* Боковые колонны */}
        <rect x="15%" y="0" width="12" height="100%" fill="url(#diagonal-hatch)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <rect x="85%" y="0" width="12" height="100%" fill="url(#diagonal-hatch)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* ГОРИЗОНТАЛЬНЫЕ БАЛКИ */}
        <rect x="0" y="20%" width="100%" height="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        <rect x="0" y="50%" width="100%" height="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        <rect x="0" y="80%" width="100%" height="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

        {/* ДИАГОНАЛЬНЫЕ РАСКОСЫ */}
        <line x1="35%" y1="20%" x2="65%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
        <line x1="65%" y1="20%" x2="35%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
        <line x1="35%" y1="50%" x2="65%" y2="80%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
        <line x1="65%" y1="50%" x2="35%" y2="80%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />

        {/* ИНЖЕНЕРНЫЕ ОТМЕТКИ */}
        <g stroke="#1A8CC8" strokeWidth="2" fill="none">
          <circle cx="850" cy="200" r="20" />
          <line x1="800" y1="200" x2="900" y2="200" />
          <line x1="850" y1="150" x2="850" y2="250" />
        </g>
        <text x="730" y="190" fill="#1A8CC8" fontSize="24" fontFamily="monospace" fontWeight="bold" letterSpacing="2">A-1 КОЛОННА</text>
        
        <g stroke="#1A8CC8" strokeWidth="2" fill="none">
          <line x1="800" y1="800" x2="850" y2="800" />
          <polygon points="825,760 835,800 815,800" fill="#5BC8F0" />
        </g>
        <text x="640" y="790" fill="#5BC8F0" fontSize="20" fontFamily="monospace" fontWeight="bold">УРОВЕНЬ +14.5m</text>
      </svg>

      {/* Подсветка по центру */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-transparent via-graphite/90 to-graphite pointer-events-none mix-blend-multiply" />
      
      {/* Растворение снизу */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-graphite to-transparent pointer-events-none" />
    </div>
  );
}
