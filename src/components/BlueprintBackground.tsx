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
        className="opacity-[0.15]"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
          <pattern id="diagonal-hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Base Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Structural Main Columns (I-Beams) */}
        <rect x="15%" y="0" width="12" height="100%" fill="url(#diagonal-hatch)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <rect x="50%" y="0" width="20" height="100%" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <rect x="85%" y="0" width="12" height="100%" fill="url(#diagonal-hatch)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* Horizontal Girders */}
        <rect x="0" y="25%" width="100%" height="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <rect x="0" y="55%" width="100%" height="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="0" y="80%" width="100%" height="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

        {/* Diagonal Cross-Bracings */}
        {/* Top Section */}
        <line x1="15%" y1="5%" x2="50%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <line x1="50%" y1="5%" x2="15%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <line x1="50%" y1="5%" x2="85%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <line x1="85%" y1="5%" x2="50%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />

        {/* Middle Section */}
        <line x1="15%" y1="25%" x2="50%" y2="55%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="15 5" />
        <line x1="50%" y1="25%" x2="15%" y2="55%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="15 5" />
        <line x1="50%" y1="25%" x2="85%" y2="55%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="15 5" />
        <line x1="85%" y1="25%" x2="50%" y2="55%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="15 5" />

        {/* Bottom Section */}
        <line x1="15%" y1="55%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <line x1="50%" y1="55%" x2="15%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <line x1="50%" y1="55%" x2="85%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <line x1="85%" y1="55%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />

        {/* Technical measuring indicators and blueprint details */}
        <g stroke="#FF5722" strokeWidth="1" fill="none">
          <circle cx="50%" cy="25%" r="12" />
          <circle cx="50%" cy="80%" r="12" />
        </g>
        
        <text x="16%" y="22%" fill="#FF5722" fontSize="24" fontFamily="monospace" fontWeight="bold">BEAM K-12</text>
        <text x="86%" y="78%" fill="#00E676" fontSize="24" fontFamily="monospace" fontWeight="bold">STRUCT-9X</text>
      </svg>

      {/* Massive radial spotlight behind the blueprint to give depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-transparent via-graphite/80 to-graphite pointer-events-none mix-blend-multiply" />
      {/* Top and Bottom fade masks to blend seamlessly with surrounding sections */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-graphite to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite to-transparent pointer-events-none" />
    </div>
  );
}
