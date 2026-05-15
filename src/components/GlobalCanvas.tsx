"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

/**
 * GlobalCanvas — one single WebGL context for the entire site.
 * All <View> portals from LiveIlls.tsx render their scenes into this canvas.
 * This eliminates "WebGL Context Lost" errors caused by too many canvases.
 */
export default function GlobalCanvas() {
  return (
    <Canvas
      id="global-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <View.Port />
    </Canvas>
  );
}
