"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Preload, Edges } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";


// --- DYNAMIC CANVAS: Mounts only when near screen to prevent WebGL context limits ---
function LazyCanvas({ children, camera, gl }: any) {
  const ref = useRef<HTMLDivElement>(null);

  // Unmount canvas when off-screen to prevent hitting the browser's max WebGL context limit (usually 8-16)
  const isVisible = useInView(ref, { margin: "500px" });

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full pointer-events-none">
      {isVisible && (
        <Canvas
          camera={camera}
          gl={{
            ...gl,
            // Recover automatically from context loss
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={[1, 1.2]}
          frameloop="always"
          onCreated={({ gl: renderer }) => {
            // Handle context lost — tell browser we want to restore it
            const canvas = renderer.domElement;
            canvas.addEventListener("webglcontextlost", (e) => {
              e.preventDefault(); // Prevents browser from permanently losing context
            });
          }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}

// --- LOADING SKELETON FOR 3D ---
function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
    </div>
  );
}

// --- PROCEDURAL CLEAN BRUSHED NORMAL MAP ---
function createScratchNormalMap(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base neutral normal (128,128,255)
  ctx.fillStyle = "rgb(128,128,255)";
  ctx.fillRect(0, 0, size, size);

  // Micro-brushing for new rolled steel
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const angle = (Math.random() - 0.5) * 0.1;
    const len = 50 + Math.random() * 150;

    // Very subtle normal perturbation
    if (Math.random() > 0.5) {
      ctx.strokeStyle = `rgb(127,129,255)`;
    } else {
      ctx.strokeStyle = `rgb(129,127,255)`;
    }

    ctx.lineWidth = 0.5 + Math.random() * 1.0;
    ctx.globalAlpha = 0.1 + Math.random() * 0.15;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// --- PROCEDURAL CLEAN ROUGHNESS MAP ---
function createRoughnessMap(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base smooth roughness (lower value = smoother) - perfect for new steel
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.fillRect(0, 0, size, size);

  // Micro-variation (anisotropic streaks)
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const val = 40 + Math.random() * 30; // 40 to 70
    ctx.fillStyle = `rgb(${val},${val},${val})`;
    ctx.globalAlpha = 0.05;
    ctx.fillRect(x, y, 10 + Math.random() * 40, 1 + Math.random() * 2);
  }

  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// --- ENHANCED PREMIUM MATERIALS (NEW STEEL) ---
let globalNormalMap: THREE.CanvasTexture | null = null;
let globalRoughnessMap: THREE.CanvasTexture | null = null;
let globalMaterials: any = null;

function usePremiumMaterials() {
  return useMemo(() => {
    if (globalMaterials) return globalMaterials;

    if (!globalNormalMap && typeof document !== "undefined") {
      try {
        globalNormalMap = createScratchNormalMap(128);
        globalRoughnessMap = createRoughnessMap(128);
      } catch {
        // SSR fallback
      }
    }

    const baseMaterialProps = {
      normalMap: globalNormalMap,
      normalScale: globalNormalMap ? new THREE.Vector2(0.1, 0.1) : undefined,
      roughnessMap: globalRoughnessMap || undefined,
    };

    globalMaterials = {
      // Clean, new steel
      scuffedMetal: new THREE.MeshPhysicalMaterial({
        color: "#A8B0B8",
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
        ...baseMaterialProps,
      }),
      // Clean gunmetal / dark forged metal
      darkMetal: new THREE.MeshPhysicalMaterial({
        color: "#5A5E65",
        metalness: 0.8,
        roughness: 0.35,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        ...baseMaterialProps,
      }),
      // Flawless blue powder coat
      blueMetal: new THREE.MeshPhysicalMaterial({
        color: "#00479A",
        metalness: 0.5,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        ...baseMaterialProps,
        normalScale: globalNormalMap ? new THREE.Vector2(0.05, 0.05) : undefined,
      }),
      // Flawless cyan powder coat
      cyanMetal: new THREE.MeshPhysicalMaterial({
        color: "#5DB0E5",
        metalness: 0.5,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        ...baseMaterialProps,
        normalScale: globalNormalMap ? new THREE.Vector2(0.05, 0.05) : undefined,
      }),
      // Chrome / Polished Aluminum
      silver: new THREE.MeshPhysicalMaterial({
        color: "#E2E8F0",
        metalness: 0.8,
        roughness: 0.35,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        reflectivity: 0.8,
        ...baseMaterialProps,
        normalScale: globalNormalMap ? new THREE.Vector2(0.05, 0.05) : undefined,
      }),
      // Flawless Gold
      gold: new THREE.MeshPhysicalMaterial({
        color: "#FFD700",
        metalness: 1,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        reflectivity: 1,
        ...baseMaterialProps,
        normalScale: globalNormalMap ? new THREE.Vector2(0.05, 0.05) : undefined,
      }),
      // Inner pipe wall (clean, smooth dark metal)
      innerWall: new THREE.MeshPhysicalMaterial({
        color: "#4A4D52",
        metalness: 0.8,
        roughness: 0.3,
        side: THREE.BackSide,
        ...baseMaterialProps,
      }),
      // Weld seam material (clean TIG weld)
      weldSeam: new THREE.MeshPhysicalMaterial({
        color: "#C0C5CB",
        metalness: 0.95,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        ...baseMaterialProps,
        normalScale: globalNormalMap ? new THREE.Vector2(0.2, 0.2) : undefined,
      }),
      // Void Black for deep holes
      void: new THREE.MeshBasicMaterial({ color: "#050505" }),
    };
    return globalMaterials;
  }, []);
}

// --- REALISTIC PIPE COMPONENT ---
function RealisticPipe({
  outerRadius,
  innerRadius,
  length,
  material,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  segments = 64,
}: {
  outerRadius: number;
  innerRadius: number;
  length: number;
  material: THREE.Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
  segments?: number;
}) {
  // Guarantee the inner material is perfectly identical but has BackSide to render lighting
  const innerMat = useMemo(() => {
    const m = material.clone();
    m.side = THREE.BackSide;
    return m;
  }, [material]);

  return (
    <group position={position} rotation={rotation}>
      {/* Outer shell */}
      <mesh material={material}>
        <cylinderGeometry args={[outerRadius, outerRadius, length, segments, 1, true]} />
      </mesh>

      {/* Interior wall perfectly shaded to match */}
      <mesh material={innerMat}>
        <cylinderGeometry args={[innerRadius, innerRadius, length, segments, 1, true]} />
      </mesh>

      {/* Top ring (thickness perfectly matches base material) */}
      <mesh material={material} position={[0, length / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, segments]} />
      </mesh>

      {/* Bottom ring */}
      <mesh material={material} position={[0, -length / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, segments]} />
      </mesh>
    </group>
  );
}

// --- REALISTIC SQUARE PIPE COMPONENT ---
function RealisticSquarePipe({
  size,
  wallThickness,
  length,
  material,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}: {
  size: number;
  wallThickness: number;
  length: number;
  material: THREE.Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const innerSize = size - wallThickness * 2;

  return (
    <group position={position} rotation={rotation}>
      {/* Outer shell - 4 walls */}
      {/* Top wall */}
      <mesh material={material} position={[0, size / 2 - wallThickness / 2, 0]}>
        <boxGeometry args={[size, wallThickness, length]} />
      </mesh>
      {/* Bottom wall */}
      <mesh material={material} position={[0, -size / 2 + wallThickness / 2, 0]}>
        <boxGeometry args={[size, wallThickness, length]} />
      </mesh>
      {/* Left wall */}
      <mesh material={material} position={[-size / 2 + wallThickness / 2, 0, 0]}>
        <boxGeometry args={[wallThickness, innerSize, length]} />
      </mesh>
      {/* Right wall */}
      <mesh material={material} position={[size / 2 - wallThickness / 2, 0, 0]}>
        <boxGeometry args={[wallThickness, innerSize, length]} />
      </mesh>

      {/* Inner darkness */}
      <mesh>
        <boxGeometry args={[innerSize * 0.99, innerSize * 0.99, length + 0.1]} />
        <meshBasicMaterial color="#050505" />
      </mesh>

      {/* Edge chamfers (tiny bevels at corners) */}
      {[
        [size / 2, size / 2, Math.PI / 4],
        [-size / 2, size / 2, (3 * Math.PI) / 4],
        [-size / 2, -size / 2, (5 * Math.PI) / 4],
        [size / 2, -size / 2, (7 * Math.PI) / 4],
      ].map(([x, y, r], i) => (
        <mesh key={i} position={[x as number, y as number, 0]} rotation={[0, 0, r as number]}>
          <boxGeometry args={[wallThickness * 0.3, wallThickness * 0.3, length]} />
          <meshPhysicalMaterial
            color="#A8B0B8"
            metalness={0.95}
            roughness={0.15}
            clearcoat={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- HERO SCENE: REALISTIC ROUND AND SQUARE PIPES ---
function HeroRealisticPipes() {
  const group = useRef<THREE.Group>(null);
  const materials = usePremiumMaterials();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.05}>

        {/* Massive Staggered Long Pipe Bundle */}
        <group position={[9, -5, -6]} scale={0.8} rotation={[Math.PI / 3, -Math.PI / 6, Math.PI / 4]}>

          {/* 1. Longest Round Pipe */}
          <RealisticPipe
            outerRadius={2.5}
            innerRadius={2.2}
            length={40}
            material={materials.scuffedMetal}
            position={[0, 0, 0]}
          />

          {/* 2. Medium Square Pipe */}
          <RealisticSquarePipe
            size={4}
            wallThickness={0.4}
            length={24}
            material={materials.scuffedMetal}
            position={[-5, 4, 2]}
          />

          {/* 3. Short Round Pipe (blue Accent) */}
          <RealisticPipe
            outerRadius={1.5}
            innerRadius={1.2}
            length={16}
            material={materials.blueMetal}
            position={[4, 5, 5]}
          />

          {/* 4. Medium Round Pipe */}
          <RealisticPipe
            outerRadius={1.8}
            innerRadius={1.5}
            length={28}
            material={materials.scuffedMetal}
            position={[-1.5, -4.5, -3]}
          />

        </group>

      </Float>

      {/* Floating metallic sparks */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Spark key={i} />
      ))}
    </group>
  );
}

// --- BRIGHT NEW SPARKS ---
function Spark() {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * 100, []);
  const speed = useMemo(() => 0.1 + Math.random() * 0.3, []);
  const radius = useMemo(() => 4 + Math.random() * 6, []);
  const sparkColor = useMemo(() => {
    const roll = Math.random();
    if (roll > 0.7) return "#FFFFFF"; // Pure white core
    if (roll > 0.4) return "#5DB0E5"; // Bright yellow
    return "#00479A"; // Bright blue
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.sin(t) * radius;
    ref.current.position.y = Math.cos(t * 1.2) * (radius * 0.5);
    ref.current.position.z = Math.sin(t * 0.8) * radius;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 1.5;
    // Spark flicker
    const flicker = 0.5 + Math.sin(t * 10) * 0.5;
    ref.current.scale.setScalar(flicker * 0.8 + 0.2);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={sparkColor} transparent opacity={0.9} toneMapped={false} />
    </mesh>
  );
}

export function GlassHexagon({ position, scale = 1, floatOffset = 0, color = "#5DB0E5" }: any) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.4 + floatOffset;
    // Individual realistic floating and slight tilting
    ref.current.position.y = position[1] + Math.sin(t) * 0.4;
    ref.current.position.z = position[2] + Math.cos(t * 0.8) * 0.2;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.6) * 0.05;
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1, 1, 0.25, 6]} />
      {/* Hyper-realistic glass material without artificial glowing edges */}
      <meshPhysicalMaterial 
        color={color}
        transmission={1.0}
        opacity={1}
        transparent
        roughness={0.02}
        thickness={2.5}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={3.0}
      />
    </mesh>
  );
}

const HEX_RADIUS = 1.0;
const HEX_DX = 1.5 * HEX_RADIUS;
const HEX_DY = 1.73205 * HEX_RADIUS;

// Generate procedural dense cluster outside component (runs once)
const CLUSTER_HEXES = (() => {
  const items = [];
  const brandColors = ["#00479A", "#5DB0E5", "#8BE9FD", "#ffffff"];
  
  // Smaller, more elegant cluster occupying the right side
  for (let row = -6; row <= 10; row++) {
    for (let col = -2; col <= 12; col++) {
      // Shape it so it hugs the Top-Right and crawls down/left
      const distFromTopRight = Math.sqrt(Math.pow(row - 10, 2) + Math.pow(col - 12, 2));
      
      // Significantly reduced quantity
      if (distFromTopRight > 14) continue;
      
      // Randomly scatter outer edges
      if (Math.random() > 0.5 && distFromTopRight > 8) continue;
      if (Math.random() > 0.8) continue; // Random holes
      
      const x = col * HEX_DX;
      const y = row * HEX_DY + (Math.abs(col) % 2 === 1 ? HEX_DY / 2 : 0);
      
      // Vary Z slightly for realism
      const z = (Math.random() - 0.5) * 3.0; 
      
      // Pick a random brand color (mostly lighter ones, with some deep blue accents)
      const colorIndex = Math.random() > 0.8 ? 0 : Math.floor(Math.random() * 3) + 1;
      
      items.push({
        position: [x, y, z],
        // Scale down at the edges
        scale: Math.max(0.3, 1.0 - (distFromTopRight / 18)),
        floatOffset: Math.random() * 10,
        color: brandColors[colorIndex],
      });
    }
  }
  return items;
})();

const CLUSTER_SPARKS = Array.from({ length: 40 }).map(() => ({
  position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10],
  color: Math.random() > 0.5 ? "#FFFFFF" : "#8BE9FD",
  scale: 0.5 + Math.random() * 1.5
}));

function FloatingHexagons() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    // Positioned slightly off-center to fit the right side, angled so it recedes into the top right
    <group ref={groupRef} position={[-2, -6, -14]} rotation={[-0.1, -0.3, -0.05]} scale={1.2}>
      {CLUSTER_HEXES.map((hex, i) => (
        <GlassHexagon key={`hex-${i}`} position={hex.position} scale={hex.scale} floatOffset={hex.floatOffset} color={hex.color} />
      ))}
      {CLUSTER_SPARKS.map((spark, i) => (
        <mesh key={`spark-${i}`} position={spark.position as [number, number, number]} scale={spark.scale}>
           <sphereGeometry args={[0.05, 8, 8]} />
           <meshBasicMaterial color={spark.color} toneMapped={false} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroLive3D() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!loaded) return <LoadingSkeleton />;

  return (
    <LazyCanvas camera={{ position: [0, 0, 22], fov: 45 }} gl={{ alpha: true, antialias: false, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false, dpr: [1, 1.2] }}>
      <ambientLight intensity={0.5} />
      {/* Dramatic Studio Lighting for metal reflections */}
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#5BC8F0" />
      {/* Rim light from behind for edge highlights */}
      <directionalLight position={[-5, 0, -15]} intensity={2} color="#ffffff" />
      {/* Fill light to prevent pure-black shadows */}
      <pointLight position={[0, -10, 5]} intensity={0.5} color="#334455" />

      {/* Environment map provides the 'iron/steel' reflections */}
      <Environment preset="city" />

      <HeroRealisticPipes />

      <Preload all />
    </LazyCanvas>
  );
}

// ==============================================
// B2B INFRASTRUCTURE 3D MODELS (REALISTIC)
// ==============================================

// 1. Logistics (Real 3D Truck with Pipes abstraction)
function Logistics3D() {
  const materials = usePremiumMaterials();
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group rotation={[Math.PI / 8, -Math.PI / 4, 0]} scale={1.1}>
        {/* Truck Cabin */}
        <mesh material={materials.blueMetal} position={[-2, -0.2, 0]}>
          <boxGeometry args={[1, 1.4, 1.4]} />
        </mesh>
        {/* Truck Hood */}
        <mesh material={materials.blueMetal} position={[-2.8, -0.5, 0]}>
          <boxGeometry args={[0.8, 0.8, 1.4]} />
        </mesh>

        {/* Trailer Flatbed */}
        <mesh material={materials.darkMetal} position={[0.5, -0.6, 0]}>
          <boxGeometry args={[4, 0.2, 1.4]} />
        </mesh>

        {/* Wheels */}
        {[-2.5, -1.8, -0.5, 0.5, 1.5, 2.3].map((x, i) => (
          <group key={i}>
            <mesh material={materials.scuffedMetal} position={[x, -1.1, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 24]} />
            </mesh>
            <mesh material={materials.scuffedMetal} position={[x, -1.1, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 24]} />
            </mesh>
          </group>
        ))}

        {/* Cargo: Pile of Pipes on Trailer */}
        <group position={[0.5, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <RealisticPipe outerRadius={0.4} innerRadius={0.3} length={3.8} material={materials.silver} position={[0.4, 0, 0.4]} />
          <RealisticPipe outerRadius={0.4} innerRadius={0.3} length={3.8} material={materials.darkMetal} position={[0.4, 0, -0.4]} />
          <RealisticPipe outerRadius={0.4} innerRadius={0.3} length={3.8} material={materials.scuffedMetal} position={[-0.2, 0, 0]} />
        </group>
      </group>
    </Float>
  );
}

// 2. Certificate (Paper Document with Round Stamp/Seal)
function Certificate3D() {
  const materials = usePremiumMaterials();

  // White paper material
  const paperMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f5f5f0', roughness: 0.9, metalness: 0.0
  }), []);

  // Blue stamp ink material
  const stampMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a3a8a', roughness: 0.6, metalness: 0.1, transparent: true, opacity: 0.9
  }), []);

  // Red wax seal material
  const sealMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#b71c1c', roughness: 0.4, metalness: 0.3
  }), []);

  // Dark text lines material
  const textMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#333333', roughness: 0.8, metalness: 0.0
  }), []);

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group rotation={[Math.PI / 7, -Math.PI / 5, 0.05]} scale={1.2}>
        {/* Main paper sheet */}
        <mesh material={paperMat} position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 4.2, 0.04]} />
        </mesh>

        {/* Second paper behind, slightly rotated */}
        <mesh material={paperMat} position={[0.15, -0.1, -0.06]} rotation={[0, 0, 0.04]}>
          <boxGeometry args={[3.2, 4.2, 0.04]} />
        </mesh>

        {/* Text lines on paper */}
        {[1.4, 1.0, 0.6, 0.2, -0.2].map((y, i) => (
          <mesh key={i} material={textMat} position={[0, y, 0.025]}>
            <boxGeometry args={[i === 0 ? 1.8 : 2.4, 0.08, 0.005]} />
          </mesh>
        ))}

        {/* Round stamp outline (torus = ring) */}
        <mesh material={stampMat} position={[0.6, -1.0, 0.03]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.55, 0.06, 12, 32]} />
        </mesh>

        {/* Stamp inner circle */}
        <mesh material={stampMat} position={[0.6, -1.0, 0.03]}>
          <torusGeometry args={[0.35, 0.03, 12, 32]} />
        </mesh>

        {/* Stamp center star */}
        <mesh material={stampMat} position={[0.6, -1.0, 0.035]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.01, 6]} />
        </mesh>

        {/* Red wax seal (bottom-left) */}
        <mesh material={sealMat} position={[-0.8, -1.5, 0.05]}>
          <cylinderGeometry args={[0.35, 0.38, 0.12, 32]} />
        </mesh>

        {/* Seal embossed center */}
        <mesh material={materials.blueMetal} position={[-0.8, -1.5, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.03, 5]} />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Finance (Stack of Documents / Papers)
function Finance3D() {
  const materials = usePremiumMaterials();

  const Paper = ({ material, position, rotation = [0, 0, 0] as any, size = [2.4, 0.04, 3.2] as any }: any) => (
    <mesh material={material} position={position} rotation={rotation}>
      <boxGeometry args={size} />
    </mesh>
  );

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group rotation={[Math.PI / 6, -Math.PI / 4, 0]} scale={1.3}>
        {/* Bottom sheets (steel colored, messy stack) */}
        <Paper material={materials.scuffedMetal} position={[0.1, -0.8, 0]} rotation={[0, 0.05, 0]} />
        <Paper material={materials.darkMetal} position={[-0.05, -0.7, 0.05]} rotation={[0, -0.03, 0.01]} />
        <Paper material={materials.scuffedMetal} position={[0.08, -0.6, -0.03]} rotation={[0, 0.02, -0.01]} />

        {/* Middle sheets (blue accent) */}
        <Paper material={materials.blueMetal} position={[-0.1, -0.5, 0.02]} rotation={[0, -0.04, 0.02]} />
        <Paper material={materials.scuffedMetal} position={[0.05, -0.4, -0.01]} rotation={[0, 0.06, 0]} />
        <Paper material={materials.darkMetal} position={[-0.02, -0.3, 0.04]} rotation={[0, -0.02, -0.01]} />

        {/* Top sheets */}
        <Paper material={materials.scuffedMetal} position={[0.06, -0.2, -0.02]} rotation={[0, 0.03, 0.01]} />
        <Paper material={materials.blueMetal} position={[-0.04, -0.1, 0.01]} rotation={[0, -0.05, 0]} />
        <Paper material={materials.scuffedMetal} position={[0, 0, 0]} rotation={[0, 0.01, 0]} />

        {/* Slightly open top document, tilted */}
        <Paper material={materials.darkMetal} position={[0.3, 0.15, 0.1]} rotation={[0, 0.1, 0.08]} />
      </group>
    </Float>
  );
}

// --- ANIMATED 3D FOLDER FOR AGSK ---
function Folder3D() {
  const materials = usePremiumMaterials();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 8, -Math.PI / 6, 0]} scale={1.6}>
      {/* Folder back wall */}
      <mesh material={materials.blueMetal} position={[0, 0.2, -0.1]}>
        <boxGeometry args={[2.2, 1.6, 0.05]} />
      </mesh>
      {/* Folder tab */}
      <mesh material={materials.blueMetal} position={[-0.55, 1.1, -0.1]}>
        <boxGeometry args={[0.8, 0.3, 0.05]} />
      </mesh>
      {/* Folder front (slightly open) */}
      <mesh material={materials.scuffedMetal} position={[0, -0.05, 0.15]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.04]} />
      </mesh>
      {/* Documents peeking out */}
      <mesh material={materials.silver} position={[0.1, 0.35, 0.02]}>
        <boxGeometry args={[1.8, 1.2, 0.02]} />
      </mesh>
      <mesh material={materials.darkMetal} position={[-0.05, 0.3, 0.05]}>
        <boxGeometry args={[1.8, 1.2, 0.02]} />
      </mesh>
      {/* GOST stamp accent */}
      <mesh material={materials.cyanMetal} position={[0.5, 0.1, 0.08]}>
        <boxGeometry args={[0.6, 0.4, 0.015]} />
      </mesh>
    </group>
  );
}

export function B2BLive3D({ type }: { type: 'logistics' | 'certificate' | 'finance' | 'folder' }) {
  const color = type === 'certificate' || type === 'folder' ? (type === 'folder' ? 'blue' : 'cyan') : 'blue';
  const envColor = color === "blue" ? "#00479A" : "#5DB0E5";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full blur-[60px] mix-blend-screen transition-all duration-500 opacity-30 group-hover:opacity-60"
        style={{ background: color === "blue" ? "radial-gradient(circle, rgba(0,71,154,0.3) 0%, transparent 70%)" : "radial-gradient(circle, rgba(93,176,229,0.3) 0%, transparent 70%)" }}
      />
      <LazyCanvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true, antialias: true, dpr: [1, 1.5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={4} color="#ffffff" />
        <Environment preset="city" />
        <directionalLight position={[-5, -5, -5]} intensity={2.5} color={color === "blue" ? "#00479A" : "#5DB0E5"} />
        <directionalLight position={[0, 0, -10]} intensity={3} color="#ffffff" />
        <pointLight position={[0, 0, 6]} intensity={3} color="#ffffff" distance={20} />

        <group position={[0.6, 0, 0]}>
          {type === 'logistics' && <Logistics3D />}
          {type === 'certificate' && <Certificate3D />}
          {type === 'finance' && <Finance3D />}
          {type === 'folder' && <Folder3D />}
        </group>
      </LazyCanvas>
    </div>
  );
}

// ==============================================
// CATALOG SCENES — REALISTIC ROLLED METAL PROFILES
// ==============================================

function ProfilePipes({ color = "blue" }) {
  const materials = usePremiumMaterials();
  const mat = color === "blue" ? materials.blueMetal : materials.cyanMetal;
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[Math.PI / 6, -Math.PI / 6, Math.PI / 4]} scale={1.1}>
        <RealisticPipe outerRadius={1.2} innerRadius={1.05} length={5} material={materials.scuffedMetal} position={[0, 0, 0]} />
        <RealisticPipe outerRadius={0.6} innerRadius={0.5} length={5} material={mat} position={[1.4, 0, 0.6]} />
      </group>
    </Float>
  );
}

function ProfileBeam({ color = "cyan" }) {
  const materials = usePremiumMaterials();

  // 1. I-Beam (двутавр)
  const iBeamShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.2, h = 1.6, t = 0.15;
    s.moveTo(-w / 2, h / 2);
    s.lineTo(w / 2, h / 2);
    s.lineTo(w / 2, h / 2 - t);
    s.lineTo(t / 2, h / 2 - t);
    s.lineTo(t / 2, -h / 2 + t);
    s.lineTo(w / 2, -h / 2 + t);
    s.lineTo(w / 2, -h / 2);
    s.lineTo(-w / 2, -h / 2);
    s.lineTo(-w / 2, -h / 2 + t);
    s.lineTo(-t / 2, -h / 2 + t);
    s.lineTo(-t / 2, h / 2 - t);
    s.lineTo(-w / 2, h / 2 - t);
    s.lineTo(-w / 2, h / 2);
    return s;
  }, []);

  // 2. Швеллер (Channel)
  const channelShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.0, h = 1.4, t = 0.15;
    s.moveTo(-w / 2, h / 2);
    s.lineTo(w / 2, h / 2);
    s.lineTo(w / 2, h / 2 - t);
    s.lineTo(-w / 2 + t, h / 2 - t);
    s.lineTo(-w / 2 + t, -h / 2 + t);
    s.lineTo(w / 2, -h / 2 + t);
    s.lineTo(w / 2, -h / 2);
    s.lineTo(-w / 2, -h / 2);
    s.lineTo(-w / 2, h / 2);
    return s;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 6]} scale={1.35} position={[0, 0.5, 0]}>
        {/* 1. I-Beam — scuffedMetal */}
        <mesh material={materials.scuffedMetal} position={[0, -0.8, -2]}>
          <extrudeGeometry args={[iBeamShape, { depth: 4, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }]} />
        </mesh>

        {/* 2. Channel — blue */}
        <mesh material={materials.blueMetal} position={[1.6, 0.4, -1.5]} rotation={[0, 0, Math.PI / 2]}>
          <extrudeGeometry args={[channelShape, { depth: 3.5, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }]} />
        </mesh>

        {/* 3. Flat Strip — darkMetal */}
        <mesh material={materials.darkMetal} position={[-1.2, 0.8, -2]}>
          <boxGeometry args={[0.6, 0.15, 4]} />
        </mesh>
      </group>
    </Float>
  );
}

function ProfileSheets({ color = "blue" }) {
  const materials = usePremiumMaterials();
  const mat = color === "blue" ? materials.blueMetal : materials.scuffedMetal;
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group rotation={[Math.PI / 6, -Math.PI / 6, 0]} scale={1.23} position={[0, 0.5, 0]}>
        <mesh material={materials.darkMetal} position={[0.2, -0.3, -0.2]}>
          <boxGeometry args={[3, 0.05, 4]} />
        </mesh>
        <mesh material={materials.scuffedMetal} position={[0, -0.15, 0]}>
          <boxGeometry args={[3, 0.05, 4]} />
        </mesh>
        <mesh material={mat} position={[-0.2, 0, 0.2]}>
          <boxGeometry args={[3, 0.05, 4]} />
        </mesh>
      </group>
    </Float>
  );
}

function ProfileAngle() {
  const materials = usePremiumMaterials();

  // L-Angle shape — identical for all three
  const lShape = useMemo(() => {
    const s = new THREE.Shape();
    const leg = 1.0, t = 0.15;
    s.moveTo(0, 0);
    s.lineTo(leg, 0);
    s.lineTo(leg, t);
    s.lineTo(t, t);
    s.lineTo(t, leg);
    s.lineTo(0, leg);
    s.lineTo(0, 0);
    return s;
  }, []);

  const ext = { depth: 6, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[0.3, -0.6, 0.15]} scale={1.5} position={[1.8, 0.4, 2]}>
        {/* 1. blue L-angle */}
        <mesh material={materials.blueMetal} position={[-1.6, 1.2, 0]}>
          <extrudeGeometry args={[lShape, ext]} />
        </mesh>

        {/* 2. Dark / Black L-angle */}
        <mesh material={materials.darkMetal} position={[0, 0, 0.5]}>
          <extrudeGeometry args={[lShape, ext]} />
        </mesh>

        {/* 3. Silver / Chrome L-angle */}
        <mesh material={materials.scuffedMetal} position={[1.6, -1.2, 1.0]}>
          <extrudeGeometry args={[lShape, ext]} />
        </mesh>
      </group>
    </Float>
  );
}

function ProfileRebar({ color = "blue" }) {
  const materials = usePremiumMaterials();
  const mat = color === "blue" ? materials.blueMetal : materials.darkMetal;

  const SingleRebar = ({ length, material, position }: any) => {
    const ribCount = Math.floor(length / 0.15);
    return (
      <group position={position}>
        <mesh material={material}>
          <cylinderGeometry args={[0.2, 0.2, length, 16]} />
        </mesh>
        {Array.from({ length: ribCount }).map((_, i) => (
          <mesh key={i} material={material} position={[0, -length / 2 + i * 0.15 + 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.04, 8, 16]} />
          </mesh>
        ))}
      </group>
    );
  };

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
      <group rotation={[Math.PI / 4, 0, Math.PI / 6]} scale={2.0} position={[1.4, -0.2, 0]}>
        <SingleRebar length={5} material={materials.scuffedMetal} position={[0, 0, 0]} />
        <SingleRebar length={5} material={mat} position={[0.4, 0, 0.5]} />
        <SingleRebar length={5} material={materials.darkMetal} position={[-0.4, 0, 0.5]} />
        <SingleRebar length={5} material={materials.scuffedMetal} position={[0, 0, -0.6]} />
      </group>
    </Float>
  );
}

export function CardLive3D({ type, color }: { type: string, color: "blue" | "cyan" }) {
  const envColor = color === "blue" ? "#00479A" : "#5DB0E5";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-3xl">
      <LazyCanvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true, antialias: true, dpr: [1, 1.5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={4.0} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={2.5} color={envColor} />
        <Environment preset="city" />
        <pointLight position={[0, 0, 6]} intensity={3} color="#ffffff" distance={20} />

        <group position={[0.6, 0, 0]}>
          {type === "pipe" && <ProfilePipes color={color} />}
          {type === "beam" && <ProfileBeam color={color} />}
          {type === "sheet" && <ProfileSheets color={color} />}
          {type === "angle" && <ProfileAngle />}
          {type === "rebar" && <ProfileRebar color={color} />}
        </group>
      </LazyCanvas>
    </div>
  );
}

// ==============================================
// REUSABLE HEXAGON CLUSTER FOR OTHER BLOCKS
// ==============================================
export function ReusableHexagonCluster({ count = 5, spread = 2, baseScale = 1 }: { count?: number, spread?: number, baseScale?: number }) {
  const brandColors = ["#00479A", "#5DB0E5", "#8BE9FD", "#ffffff"];
  const hexes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [(Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread],
      scale: baseScale * (0.6 + Math.random() * 0.8),
      floatOffset: Math.random() * 10,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
    }));
  }, [count, spread, baseScale]);

  const sparks = useMemo(() => {
    return Array.from({ length: Math.floor(count / 2) }).map(() => ({
      position: [(Math.random() - 0.5) * spread * 1.5, (Math.random() - 0.5) * spread * 1.5, (Math.random() - 0.5) * spread * 1.5] as [number, number, number],
      scale: 0.5 + Math.random(),
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
    }));
  }, [count, spread]);

  return (
    <group>
      {hexes.map((hex, i) => (
        <GlassHexagon key={i} position={hex.position} scale={hex.scale} floatOffset={hex.floatOffset} color={hex.color} />
      ))}
      {sparks.map((spark, i) => (
        <mesh key={`spark-${i}`} position={spark.position} scale={spark.scale}>
           <sphereGeometry args={[0.05, 8, 8]} />
           <meshBasicMaterial color={spark.color} toneMapped={false} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ==============================================
// RULES SECTION 3D MODELS
// ==============================================

function RulesScaleBeam() {
  const materials = usePremiumMaterials();
  const iBeamShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.0, h = 1.6, t = 0.15;
    s.moveTo(-w / 2, h / 2); s.lineTo(w / 2, h / 2); s.lineTo(w / 2, h / 2 - t); s.lineTo(t / 2, h / 2 - t); s.lineTo(t / 2, -h / 2 + t); s.lineTo(w / 2, -h / 2 + t); s.lineTo(w / 2, -h / 2); s.lineTo(-w / 2, -h / 2); s.lineTo(-w / 2, -h / 2 + t); s.lineTo(-t / 2, -h / 2 + t); s.lineTo(-t / 2, h / 2 - t); s.lineTo(-w / 2, h / 2 - t); s.lineTo(-w / 2, h / 2);
    return s;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group rotation={[Math.PI / 6, -Math.PI / 4, 0]} scale={1.2}>
        {/* Scale Platform */}
        <mesh material={materials.darkMetal} position={[0, -1, 0]}>
          <boxGeometry args={[4, 0.2, 3]} />
        </mesh>
        {/* Neon Display */}
        <mesh position={[1.5, -0.9, 1.5]}>
          <boxGeometry args={[0.8, 0.3, 0.4]} />
          <meshBasicMaterial color="#5DB0E5" />
        </mesh>

        {/* I-Beam */}
        <mesh material={materials.scuffedMetal} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <extrudeGeometry args={[iBeamShape, { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 }]} />
        </mesh>
      </group>
    </Float>
  );
}

function RulesFloatingCombo() {
  const materials = usePremiumMaterials();
  return (
    <group>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <group rotation={[Math.PI / 4, -Math.PI / 6, 0]} scale={1.2}>
          <RealisticPipe outerRadius={0.6} innerRadius={0.5} length={4} material={materials.silver} position={[-1, 0, 0]} />
          <RealisticSquarePipe size={1} wallThickness={0.1} length={3} material={materials.darkMetal} position={[1, 0.5, 0]} />
        </group>
      </Float>
      {Array.from({ length: 15 }).map((_, i) => (
        <Spark key={`rules-spark-${i}`} />
      ))}
    </group>
  );
}

function RulesHologramDoc() {
  const materials = usePremiumMaterials();
  const holoMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00479A", transparent: true, opacity: 0.6, wireframe: true }), []);
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group rotation={[Math.PI / 6, -Math.PI / 5, 0]} scale={1.2}>
        <RealisticPipe outerRadius={0.8} innerRadius={0.7} length={4} material={materials.silver} position={[0, -1, 0]} rotation={[0, 0, Math.PI / 2]} />
        <mesh material={holoMat} position={[0, 1, 0]} rotation={[-Math.PI / 8, 0, 0]}>
          <planeGeometry args={[2.5, 3.5, 10, 10]} />
        </mesh>
        {/* Glow center */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color="#00479A" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export function RulesLive3D({ type }: { type: 'weight' | 'search' | 'transparency' }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
      <LazyCanvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true, dpr: [1, 1.5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={4} color="#ffffff" />
        <Environment preset="city" />
        <directionalLight position={[-5, -5, -5]} intensity={2.5} color={type === 'weight' ? "#5DB0E5" : "#00479A"} />

        <group position={[0, 0, 0]}>
          {type === 'weight' && <RulesScaleBeam />}
          {type === 'search' && <RulesFloatingCombo />}
          {type === 'transparency' && <RulesHologramDoc />}
        </group>
      </LazyCanvas>
    </div>
  );
}

// ==============================================
// SCANNER DROPZONE 3D
// ==============================================

export function ScannerLive3D() {
  const holoMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#5DB0E5", transparent: true, opacity: 0.8, wireframe: true }), []);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
      <LazyCanvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ alpha: true }}>
        <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh material={holoMat} rotation={[-Math.PI / 4, 0, 0]}>
            <planeGeometry args={[2, 2.5, 8, 8]} />
          </mesh>
          <mesh position={[0, 0, 0.1]} rotation={[-Math.PI / 4, 0, 0]}>
            <planeGeometry args={[1.8, 2.3]} />
            <meshBasicMaterial color="#5DB0E5" transparent opacity={0.1} />
          </mesh>
        </Float>
      </LazyCanvas>
    </div>
  );
}

