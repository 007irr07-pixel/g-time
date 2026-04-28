"use client";
import React from "react";

export default function BlueprintBackground() {
  const hexPts = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");

  const hexes = [
    // Foreground — large
    { cx: 670, cy: 720, r: 130 }, { cx: 855, cy: 610, r: 118 },
    { cx: 530, cy: 685, r: 108 }, { cx: 755, cy: 475, r: 100 },
    { cx: 615, cy: 555, r: 96  }, { cx: 870, cy: 800, r: 90  },
    // Midground
    { cx: 440, cy: 565, r: 82 }, { cx: 680, cy: 375, r: 80 },
    { cx: 810, cy: 330, r: 76 }, { cx: 525, cy: 450, r: 78 },
    { cx: 880, cy: 430, r: 70 }, { cx: 370, cy: 455, r: 74 },
    { cx: 640, cy: 255, r: 72 }, { cx: 765, cy: 215, r: 67 },
    { cx: 880, cy: 265, r: 64 }, { cx: 490, cy: 335, r: 70 },
    { cx: 355, cy: 345, r: 64 }, { cx: 580, cy: 160, r: 64 },
    // Background — small
    { cx: 700, cy: 140, r: 56 }, { cx: 840, cy: 145, r: 52 },
    { cx: 450, cy: 235, r: 55 }, { cx: 310, cy: 250, r: 50 },
    { cx: 750, cy: 65,  r: 49 }, { cx: 600, cy: 68,  r: 45 },
    { cx: 450, cy: 120, r: 50 }, { cx: 880, cy: 75,  r: 42 },
    { cx: 200, cy: 185, r: 45 }, { cx: 230, cy: 325, r: 48 },
    { cx: 160, cy: 255, r: 40 }, { cx: 310, cy: 140, r: 45 },
    { cx: 150, cy: 160, r: 37 }, { cx: 260, cy: 430, r: 36 },
    { cx: 180, cy: 375, r: 33 }, { cx: 880, cy: 170, r: 34 },
  ];

  const depth = (r: number) => r >= 110 ? 1.0 : r >= 80 ? 0.75 : r >= 55 ? 0.5 : 0.28;

  return (
    <div className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0"
      style={{ width: "62%", height: "100vh" }}>

      {/* Ambient radial glow */}
      <div className="absolute" style={{
        right: "8%", top: "20%", width: "65%", height: "65%",
        background: "radial-gradient(ellipse, rgba(93,176,229,0.07) 0%, rgba(0,71,154,0.04) 45%, transparent 70%)",
        filter: "blur(50px)",
      }} />

      {/* Edge fade masks */}
      <div className="absolute inset-0 z-10" style={{
        background:
          "linear-gradient(to right, var(--color-graphite) 0%, transparent 18%)," +
          "linear-gradient(to top, var(--color-graphite) 0%, transparent 12%)",
      }} />

      <svg viewBox="0 0 960 900" preserveAspectRatio="xMaxYMin slice"
        xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <filter id="hglow-lg" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8"  result="b1"/>
            <feGaussianBlur stdDeviation="3"  result="b2"/>
            <feMerge><feMergeNode in="b1"/><feMergeNode in="b2"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hglow-md" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hglow-sm" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <linearGradient id="hface-a" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%"   stopColor="#1E4080" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#040C20" stopOpacity="0.85"/>
          </linearGradient>
          <linearGradient id="hface-b" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%"   stopColor="#142E60" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#030915" stopOpacity="0.88"/>
          </linearGradient>

          <radialGradient id="hmask-fade" cx="72%" cy="22%" r="70%">
            <stop offset="0%"   stopColor="white" stopOpacity="1"/>
            <stop offset="55%"  stopColor="white" stopOpacity="0.75"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <mask id="hscene-mask">
            <rect width="100%" height="100%" fill="url(#hmask-fade)"/>
          </mask>
        </defs>

        <g mask="url(#hscene-mask)">
          {hexes.map(({ cx, cy, r }, i) => {
            const d   = depth(r);
            const big = r >= 95;
            const mid = r >= 65 && r < 95;
            const flt = big ? "hglow-lg" : mid ? "hglow-md" : "hglow-sm";
            const ec  = "#5DB0E5";
            const eo  = 0.3 + d * 0.65;
            const sw  = big ? 2.0 : mid ? 1.5 : 1.0;

            return (
              <g key={i} opacity={d * 0.85 + 0.15}>
                {/* Dark glass face */}
                <polygon points={hexPts(cx, cy, r)}
                  fill={i % 2 === 0 ? "url(#hface-a)" : "url(#hface-b)"}
                  fillOpacity={0.6 + d * 0.2} stroke="none"/>

                {/* Glowing edge — wide soft */}
                <polygon points={hexPts(cx, cy, r)} fill="none"
                  stroke={ec} strokeWidth={sw * 4} strokeOpacity={eo * 0.18}
                  filter={`url(#${flt})`}/>
                {/* Glowing edge — tight bright */}
                <polygon points={hexPts(cx, cy, r)} fill="none"
                  stroke={ec} strokeWidth={sw} strokeOpacity={eo}
                  filter={`url(#${flt})`}/>

                {/* Top-left edge highlight (premium glass feel) */}
                <polygon points={hexPts(cx, cy, r * 0.995)} fill="none"
                  stroke="#A8DFFF" strokeWidth={sw * 0.6} strokeOpacity={eo * 0.5}
                  strokeDasharray={`${r * 1.2} ${r * 4}`} strokeDashoffset={`${r * 0.3}`}/>

                {/* Inner ring 1 */}
                <polygon points={hexPts(cx, cy, r * 0.62)} fill="none"
                  stroke={ec} strokeWidth={big ? 0.9 : 0.7} strokeOpacity={eo * 0.4}/>

                {/* Inner ring 2 (large hexes only) */}
                {big && (
                  <polygon points={hexPts(cx, cy, r * 0.35)} fill="none"
                    stroke={ec} strokeWidth={0.6} strokeOpacity={eo * 0.22}/>
                )}

                {/* Centre dot (foreground hexes) */}
                {big && (
                  <circle cx={cx} cy={cy} r={3} fill={ec} fillOpacity={0.5}
                    filter="url(#hglow-md)"/>
                )}
              </g>
            );
          })}

          {/* Ambient particles */}
          {([
            [740,400,2.5],[620,300,1.8],[850,500,2],[550,600,1.5],
            [700,200,2],[800,700,1.8],[480,500,1.5],[680,640,2],
            [730,550,1.5],[580,400,1.8],[820,380,2],[660,180,1.5],
            [760,310,1],[450,360,1.2],[880,540,1.8],
          ] as [number,number,number][]).map(([px,py,pr],i) => (
            <circle key={`p${i}`} cx={px} cy={py} r={pr}
              fill="#5DB0E5" fillOpacity={0.25 + (i%4)*0.08}
              filter="url(#hglow-md)"/>
          ))}
        </g>
      </svg>
    </div>
  );
}
