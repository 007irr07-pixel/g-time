"use client";

import React from "react";

/**
 * HexagonBackground — beautiful static 3D hexagon grid in site colours.
 * Rendered entirely in SVG, positioned to the top-right corner.
 */
export default function BlueprintBackground() {
  // Hex geometry helpers
  const HEX_R = 44;        // outer radius
  const HEX_COLS = 9;
  const HEX_ROWS = 12;
  const W = HEX_R * Math.sqrt(3);   // flat-to-flat width
  const H = HEX_R * 2;              // height

  // Build one flat-top hexagon path centered at (cx, cy)
  const hexPath = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  };

  // Build hex top-face (parallelogram-ish) for 3D illusion
  const hexTopPath = (cx: number, cy: number, r: number, dz: number) => {
    // Shift the top face slightly up by dz
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle) - dz}`;
    });
    return `M ${pts.join(" L ")} Z`;
  };

  // Left side (darker) and right side (lighter) paths for the 3D side walls
  const hexLeftWall = (cx: number, cy: number, r: number, dz: number) => {
    const angles = [150, 210, 270].map(d => (Math.PI / 180) * (d - 30));
    const bottom = angles.map(a => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    const top = angles.map(a => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a) - dz}`);
    return `M ${top[0]} L ${top[1]} L ${top[2]} L ${bottom[2]} L ${bottom[1]} L ${bottom[0]} Z`;
  };

  const hexRightWall = (cx: number, cy: number, r: number, dz: number) => {
    const angles = [270, 330, 30].map(d => (Math.PI / 180) * (d - 30));
    const bottom = angles.map(a => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    const top = angles.map(a => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a) - dz}`);
    return `M ${top[0]} L ${top[1]} L ${top[2]} L ${bottom[2]} L ${bottom[1]} L ${bottom[0]} Z`;
  };

  const hexes: { cx: number; cy: number; dz: number }[] = [];

  for (let row = 0; row < HEX_ROWS; row++) {
    for (let col = 0; col < HEX_COLS; col++) {
      const cx = col * W + (row % 2 === 1 ? W / 2 : 0);
      const cy = row * (H * 0.75);
      // Vary the 3D depth based on position — deeper in the centre
      const distFromCentre = Math.sqrt(
        Math.pow(col - HEX_COLS / 2, 2) + Math.pow(row - HEX_ROWS / 2, 2)
      );
      const dz = Math.max(4, 20 - distFromCentre * 2);
      hexes.push({ cx, cy, dz });
    }
  }

  const viewW = HEX_COLS * W + W / 2;
  const viewH = HEX_ROWS * (H * 0.75) + H * 0.25 + 30;

  return (
    <div
      className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0"
      style={{ width: "62%", height: "100vh" }}
    >
      {/* Fade gradient masks — left and bottom */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-graphite) 0%, transparent 28%), " +
            "linear-gradient(to top, var(--color-graphite) 0%, transparent 28%)",
        }}
      />

      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMaxYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          {/* Blue glow filter */}
          <filter id="hex-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial fade so edges dissolve */}
          <radialGradient id="hex-fade" cx="75%" cy="25%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="hex-mask">
            <rect width="100%" height="100%" fill="url(#hex-fade)" />
          </mask>

          {/* Top-face gradient */}
          <linearGradient id="top-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A3A6E" />
            <stop offset="100%" stopColor="#0A2050" />
          </linearGradient>

          {/* Left-wall gradient (darker) */}
          <linearGradient id="left-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#07163A" />
            <stop offset="100%" stopColor="#040D25" />
          </linearGradient>

          {/* Right-wall gradient (medium) */}
          <linearGradient id="right-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F2858" />
            <stop offset="100%" stopColor="#071840" />
          </linearGradient>
        </defs>

        {/* All hexes clipped by the radial mask */}
        <g mask="url(#hex-mask)">
          {hexes.map(({ cx, cy, dz }, i) => (
            <g key={i}>
              {/* Bottom border face */}
              <path
                d={hexPath(cx, cy, HEX_R)}
                fill="none"
                stroke="#5DB0E5"
                strokeWidth="0.4"
                strokeOpacity="0.18"
              />
              {/* Right side wall */}
              <path
                d={hexRightWall(cx, cy, HEX_R - 1, dz)}
                fill="url(#right-grad)"
                stroke="#00479A"
                strokeWidth="0.5"
                strokeOpacity="0.35"
                fillOpacity="0.55"
              />
              {/* Left side wall */}
              <path
                d={hexLeftWall(cx, cy, HEX_R - 1, dz)}
                fill="url(#left-grad)"
                stroke="#00479A"
                strokeWidth="0.5"
                strokeOpacity="0.25"
                fillOpacity="0.55"
              />
              {/* Top face */}
              <path
                d={hexTopPath(cx, cy, HEX_R - 1, dz)}
                fill="url(#top-grad)"
                stroke="#5DB0E5"
                strokeWidth="0.7"
                strokeOpacity="0.45"
                fillOpacity="0.7"
                filter="url(#hex-glow)"
              />
              {/* Inner highlight ring on top face */}
              <path
                d={hexTopPath(cx, cy, HEX_R * 0.55, dz)}
                fill="none"
                stroke="#5DB0E5"
                strokeWidth="0.4"
                strokeOpacity="0.2"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
