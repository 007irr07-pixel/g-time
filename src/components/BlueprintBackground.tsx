"use client";
import React from "react";

/**
 * Continuous honeycomb surface with pressed-in depth effect and beautiful blue/teal gradient.
 * Rendered as pure SVG — zero dependencies, fully static.
 */
export default function BlueprintBackground() {
  // Pointy-top hex: circumradius R
  const R = 52;
  const W = R * Math.sqrt(3);   // hex width
  const H = R * 2;              // hex height
  const rows = 16;
  const cols = 12;

  // Build hex center positions for a honeycomb grid
  const hexes: { cx: number; cy: number; col: number; row: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * W + (row % 2 === 1 ? W / 2 : 0);
      const cy = row * (H * 0.75);
      hexes.push({ cx, cy, col, row });
    }
  }

  // Pointy-top hex points
  const hexPts = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
    }).join(" ");

  // Determine if hex is "pressed" based on position pattern
  const isPressed = (col: number, row: number) => {
    // Create an organic pressed pattern
    const val = Math.sin(col * 1.3 + row * 0.9) * Math.cos(col * 0.7 - row * 1.1);
    return val > 0.45;
  };

  // Depth-based color from position — gradient from cyan (top-right) to deep blue (bottom-left)
  const getFaceId = (col: number, row: number) => {
    const pressed = isPressed(col, row);
    const pos = (col / cols + row / rows) / 2;
    if (pressed) return pos > 0.5 ? "face-pressed-deep" : "face-pressed-mid";
    return pos > 0.6 ? "face-normal-deep" : pos > 0.3 ? "face-normal-mid" : "face-normal-bright";
  };

  const viewW = cols * W + W / 2;
  const viewH = rows * H * 0.75 + H * 0.25;

  return (
    <div
      className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0"
      style={{ width: "60%", height: "110vh" }}
    >
      {/* Fade masks: left + bottom */}
      <div className="absolute inset-0 z-10" style={{
        background:
          "linear-gradient(to right, var(--color-graphite) 0%, rgba(13,24,41,0.6) 22%, transparent 45%)," +
          "linear-gradient(to top, var(--color-graphite) 0%, transparent 18%)," +
          "linear-gradient(to bottom, var(--color-graphite) 0%, transparent 12%)",
      }} />

      {/* Soft ambient blue glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 75% 40%, rgba(0,120,220,0.08) 0%, transparent 65%)",
      }} />

      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMaxYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          {/* ── Face fill gradients ── */}
          {/* Normal bright (top-left area) */}
          <linearGradient id="face-normal-bright" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#1B4E8A" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0A2248" stopOpacity="0.95"/>
          </linearGradient>
          {/* Normal mid */}
          <linearGradient id="face-normal-mid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#143866" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#071830" stopOpacity="0.95"/>
          </linearGradient>
          {/* Normal deep (bottom-right) */}
          <linearGradient id="face-normal-deep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#0E2A4E" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#040E1E" stopOpacity="1"/>
          </linearGradient>
          {/* Pressed mid — slightly lighter centre for "inset" feel */}
          <radialGradient id="face-pressed-mid" cx="50%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="#0A1E3A" stopOpacity="0.98"/>
            <stop offset="100%" stopColor="#091828" stopOpacity="1"/>
          </radialGradient>
          {/* Pressed deep */}
          <radialGradient id="face-pressed-deep" cx="50%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="#060F20" stopOpacity="1"/>
            <stop offset="100%" stopColor="#030810" stopOpacity="1"/>
          </radialGradient>

          {/* ── Edge / bevel stroke gradients ── */}
          {/* Top-light bevel (lighter top-left edge) */}
          <linearGradient id="bevel-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#5DB0E5" stopOpacity="0.7"/>
            <stop offset="50%"  stopColor="#2A7AC0" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#0D3060" stopOpacity="0.15"/>
          </linearGradient>
          {/* Pressed inner shadow (bottom-right edge) */}
          <linearGradient id="bevel-shadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#030810" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#1A4070" stopOpacity="0.4"/>
          </linearGradient>

          {/* Soft edge glow filter */}
          <filter id="edge-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Inner glow for pressed hexes */}
          <filter id="inner-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="blur" in2="SourceGraphic" operator="in" result="shadow"/>
            <feMerge>
              <feMergeNode in="shadow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Scene radial mask — fade out at left and corners */}
          <radialGradient id="scene-fade" cx="80%" cy="45%" r="75%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="white" stopOpacity="1"/>
            <stop offset="50%"  stopColor="white" stopOpacity="0.9"/>
            <stop offset="80%"  stopColor="white" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <mask id="scene-mask">
            <rect width="100%" height="100%" fill="url(#scene-fade)"/>
          </mask>
        </defs>

        <g mask="url(#scene-mask)">
          {hexes.map(({ cx, cy, col, row }, i) => {
            const pressed = isPressed(col, row);
            const faceId  = getFaceId(col, row);
            const rOuter  = R - 1.5;
            const rInner  = R - 4.5;

            return (
              <g key={i}>
                {/* Main face fill */}
                <polygon
                  points={hexPts(cx, cy, rOuter)}
                  fill={`url(#${faceId})`}
                  stroke="none"
                />

                {pressed ? (
                  <>
                    {/* Pressed: dark inner bevel shadow */}
                    <polygon
                      points={hexPts(cx, cy, rOuter)}
                      fill="none"
                      stroke="url(#bevel-shadow)"
                      strokeWidth="3"
                      filter="url(#inner-shadow)"
                    />
                    {/* Pressed: subtle inner highlight ring at bottom */}
                    <polygon
                      points={hexPts(cx, cy, rInner - 2)}
                      fill="none"
                      stroke="#5DB0E5"
                      strokeWidth="0.6"
                      strokeOpacity="0.18"
                    />
                  </>
                ) : (
                  <>
                    {/* Normal: bright top-left bevel */}
                    <polygon
                      points={hexPts(cx, cy, rOuter)}
                      fill="none"
                      stroke="url(#bevel-light)"
                      strokeWidth="1.5"
                      filter="url(#edge-glow)"
                    />
                    {/* Normal: sharp bright top edge */}
                    <polygon
                      points={hexPts(cx, cy, rOuter)}
                      fill="none"
                      stroke="#5DB0E5"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                    />
                  </>
                )}

                {/* Shared thin gap between hexes */}
                <polygon
                  points={hexPts(cx, cy, rOuter)}
                  fill="none"
                  stroke="#030810"
                  strokeWidth="1.5"
                  strokeOpacity="0.95"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
