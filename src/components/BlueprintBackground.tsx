"use client";

import React from "react";

export default function BlueprintBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg 
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

        {/* --- ВАЖНО: Убран мелкий шум (grid), оставлены только четкие несущие конструкции --- */}

        {/* ОСНОВНЫЕ ВЕРТИКАЛЬНЫЕ КОЛОННЫ (ДВУТАВРЫ) */}
        {/* Центральная часть (самая мощная) */}
        <rect x="35%" y="0" width="24" height="100%" fill="url(#beam-grad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <rect x="65%" y="0" width="24" height="100%" fill="url(#beam-grad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        
        {/* Боковые колонны */}
        <rect x="15%" y="0" width="12" height="100%" fill="url(#diagonal-hatch)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <rect x="85%" y="0" width="12" height="100%" fill="url(#diagonal-hatch)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* ГОРИЗОНТАЛЬНЫЕ БАЛКИ (ПЕРЕКРЫТИЯ) */}
        {/* Уровень 1 */}
        <rect x="0" y="20%" width="100%" height="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        {/* Уровень 2 */}
        <rect x="0" y="50%" width="100%" height="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        {/* Уровень 3 */}
        <rect x="0" y="80%" width="100%" height="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

        {/* ДИАГОНАЛЬНЫЕ РАСКОСЫ (СВЯЗИ ЖЕСТКОСТИ) - ТОЛЬКО В ЦЕНТРЕ */}
        {/* Блок 1: От 20% до 50% */}
        <line x1="35%" y1="20%" x2="65%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
        <line x1="65%" y1="20%" x2="35%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
        
        {/* Блок 2: От 50% до 80% */}
        <line x1="35%" y1="50%" x2="65%" y2="80%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
        <line x1="65%" y1="50%" x2="35%" y2="80%" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />

        {/* ИНЖЕНЕРНЫЕ ОТМЕТКИ (КРАСИВЫЕ ЧЕРТЕЖНЫЕ СНОСКИ) */}
        <g stroke="#00479A" strokeWidth="2" fill="none">
          {/* Сноска 1 (Перемещена вправо) */}
          <circle cx="85%" cy="20%" r="20" />
          <line x1="80%" y1="20%" x2="90%" y2="20%" />
          <line x1="85%" y1="15%" x2="85%" y2="25%" />
        </g>
        
        <text x="73%" y="19%" fill="#00479A" fontSize="24" fontFamily="monospace" fontWeight="bold" letterSpacing="2">A-1 КОЛОННА</text>
        
        <g stroke="#5DB0E5" strokeWidth="2" fill="none">
          {/* Указатель высоты (Перемещен вправо) */}
          <line x1="80%" y1="80%" x2="85%" y2="80%" />
          <polygon points="82.5%,78% 83.5%,80% 81.5%,80%" fill="#5DB0E5" />
        </g>
        
        <text x="64%" y="79%" fill="#5DB0E5" fontSize="20" fontFamily="monospace" fontWeight="bold">УРОВЕНЬ +14.5m</text>
      </svg>

      {/* Мягкая подсветка чертежа по центру */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-transparent via-graphite/90 to-graphite pointer-events-none mix-blend-multiply" />
      
      {/* Плавное растворение снизу */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-graphite to-transparent pointer-events-none" />
    </div>
  );
}

