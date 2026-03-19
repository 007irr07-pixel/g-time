"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Preload } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";


// --- LAZY CANVAS WRAPPER TO PREVENT WEBGL CONTEXT LIMIT CRASH ---
function LazyCanvas({ children, camera, gl }: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  // 1. isMounted keeps the Canvas alive 1500px off-screen (prevents visual reloading on scroll)
  const isMounted = useInView(ref, { margin: "1500px" });
  
  // 2. isVisible stops the 3D rendering loop EXACTLY when it leaves the screen (saves battery)
  const isVisible = useInView(ref, { margin: "0px" });

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full pointer-events-none">
      {isMounted && (
        <Canvas 
          camera={camera} 
          gl={gl} 
          dpr={[1, 1.5]} 
          frameloop={isVisible ? "always" : "never"}
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
      <div className="w-16 h-16 border-2 border-accent-orange/30 border-t-accent-orange rounded-full animate-spin" />
    </div>
  );
}

// --- PROCEDURAL CLEAN BRUSHED NORMAL MAP ---
function createScratchNormalMap(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  
  // Base neutral normal (128,128,255)
  ctx.fillStyle = "rgb(128,128,255)";
  ctx.fillRect(0, 0, size, size);
  
  // Micro-brushing for new rolled steel
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const angle = (Math.random() - 0.5) * 0.1; 
    const len = 50 + Math.random() * 150;
    
    // Very subtle normal perturbation
    if(Math.random() > 0.5) {
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
function createRoughnessMap(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  
  // Base smooth roughness (lower value = smoother) - perfect for new steel
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.fillRect(0, 0, size, size);
  
  // Micro-variation (anisotropic streaks)
  for (let i = 0; i < 2000; i++) {
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

function usePremiumMaterials() {
  return useMemo(() => {
    if (!globalNormalMap && typeof document !== "undefined") {
      try {
        globalNormalMap = createScratchNormalMap(256);
        globalRoughnessMap = createRoughnessMap(512);
      } catch {
        // SSR fallback
      }
    }
    
    const baseMaterialProps = {
      normalMap: globalNormalMap,
      normalScale: globalNormalMap ? new THREE.Vector2(0.1, 0.1) : undefined,
      roughnessMap: globalRoughnessMap || undefined,
    };

    return {
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
      // Flawless orange powder coat
      orangeMetal: new THREE.MeshPhysicalMaterial({
        color: "#FF6D00",
        metalness: 0.5,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        ...baseMaterialProps,
        normalScale: globalNormalMap ? new THREE.Vector2(0.05, 0.05) : undefined,
      }),
      // Flawless green powder coat
      greenMetal: new THREE.MeshPhysicalMaterial({
        color: "#00E676",
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

          {/* 3. Short Round Pipe (Orange Accent) */}
          <RealisticPipe
            outerRadius={1.5}
            innerRadius={1.2}
            length={16}
            material={materials.orangeMetal}
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
    if (roll > 0.4) return "#FFCC00"; // Bright yellow
    return "#FF6D00"; // Bright orange
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

export function HeroLive3D() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!loaded) return <LoadingSkeleton />;

  return (
    <LazyCanvas camera={{ position: [0, 0, 22], fov: 45 }} gl={{ alpha: true, antialias: true, powerPreference: "default", dpr: [1, 1.5] }}>
      <ambientLight intensity={0.5} />
      {/* Dramatic Studio Lighting for metal reflections */}
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FF5722" />
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
        <mesh material={materials.orangeMetal} position={[-2, -0.2, 0]}>
          <boxGeometry args={[1, 1.4, 1.4]} />
        </mesh>
        {/* Truck Hood */}
        <mesh material={materials.orangeMetal} position={[-2.8, -0.5, 0]}>
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
        <group position={[0.5, -0.1, 0]} rotation={[0, 0, Math.PI/2]}>
          <RealisticPipe outerRadius={0.4} innerRadius={0.3} length={3.8} material={materials.silver} position={[0.4, 0, 0.4]} />
          <RealisticPipe outerRadius={0.4} innerRadius={0.3} length={3.8} material={materials.darkMetal} position={[0.4, 0, -0.4]} />
          <RealisticPipe outerRadius={0.4} innerRadius={0.3} length={3.8} material={materials.scuffedMetal} position={[-0.2, 0, 0]} />
        </group>
      </group>
    </Float>
  );
}

// 2. Certificate (Quality Award Trophy)
function Certificate3D() {
  const materials = usePremiumMaterials();

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
      <group rotation={[Math.PI / 10, Math.PI / 5, 0]} scale={1.1}>
        {/* Base platform */}
        <mesh material={materials.darkMetal} position={[0, -2, 0]}>
          <boxGeometry args={[1.8, 0.3, 1.2]} />
        </mesh>
        <mesh material={materials.scuffedMetal} position={[0, -1.7, 0]}>
          <boxGeometry args={[1.4, 0.2, 0.9]} />
        </mesh>
        
        {/* Pillar / stem */}
        <mesh material={materials.scuffedMetal} position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 1.6, 16]} />
        </mesh>
        
        {/* Cup body */}
        <mesh material={materials.orangeMetal} position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.9, 0.4, 1.4, 32]} />
        </mesh>
        
        {/* Cup rim ring */}
        <mesh material={materials.scuffedMetal} position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.08, 12, 32]} />
        </mesh>

        {/* Star on top */}
        <mesh material={materials.orangeMetal} position={[0, 1.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.1, 5]} />
        </mesh>
        
        {/* Left handle */}
        <mesh material={materials.scuffedMetal} position={[-1.1, 0.4, 0]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.35, 0.06, 8, 16, Math.PI]} />
        </mesh>
        
        {/* Right handle */}
        <mesh material={materials.scuffedMetal} position={[1.1, 0.4, 0]} rotation={[0, Math.PI, Math.PI / 6]}>
          <torusGeometry args={[0.35, 0.06, 8, 16, Math.PI]} />
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
        
        {/* Middle sheets (orange accent) */}
        <Paper material={materials.orangeMetal} position={[-0.1, -0.5, 0.02]} rotation={[0, -0.04, 0.02]} />
        <Paper material={materials.scuffedMetal} position={[0.05, -0.4, -0.01]} rotation={[0, 0.06, 0]} />
        <Paper material={materials.darkMetal} position={[-0.02, -0.3, 0.04]} rotation={[0, -0.02, -0.01]} />
        
        {/* Top sheets */}
        <Paper material={materials.scuffedMetal} position={[0.06, -0.2, -0.02]} rotation={[0, 0.03, 0.01]} />
        <Paper material={materials.orangeMetal} position={[-0.04, -0.1, 0.01]} rotation={[0, -0.05, 0]} />
        <Paper material={materials.scuffedMetal} position={[0, 0, 0]} rotation={[0, 0.01, 0]} />
        
        {/* Slightly open top document, tilted */}
        <Paper material={materials.darkMetal} position={[0.3, 0.15, 0.1]} rotation={[0, 0.1, 0.08]} />
      </group>
    </Float>
  );
}

export function B2BLive3D({ type }: { type: 'logistics' | 'certificate' | 'finance' }) {
  const color = type === 'certificate' ? 'green' : 'orange';
  const envColor = color === "orange" ? "#FF5722" : "#00E676";
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full blur-[60px] mix-blend-screen transition-all duration-500 opacity-30 group-hover:opacity-60"
        style={{ background: color === "orange" ? "radial-gradient(circle, rgba(255,87,34,0.3) 0%, transparent 70%)" : "radial-gradient(circle, rgba(0,230,118,0.3) 0%, transparent 70%)" }}
      />
      <LazyCanvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true, antialias: true, dpr: [1, 1.5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={4} color="#ffffff" />
        <Environment preset="city" />
        <directionalLight position={[-5, -5, -5]} intensity={2.5} color={color === "orange" ? "#FF5722" : "#00E676"} />
        <directionalLight position={[0, 0, -10]} intensity={3} color="#ffffff" />
        <pointLight position={[0, 0, 6]} intensity={3} color="#ffffff" distance={20} />

        <group position={[0.6, 0, 0]}>
          {type === 'logistics' && <Logistics3D />}
          {type === 'certificate' && <Certificate3D />}
          {type === 'finance' && <Finance3D />}
        </group>
      </LazyCanvas>
    </div>
  );
}

// ==============================================
// CATALOG SCENES — REALISTIC ROLLED METAL PROFILES
// ==============================================

function ProfilePipes({ color = "orange" }) {
  const materials = usePremiumMaterials();
  const mat = color === "orange" ? materials.orangeMetal : materials.greenMetal;
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[Math.PI / 6, -Math.PI / 6, Math.PI / 4]} scale={1.1}>
        <RealisticPipe outerRadius={1.2} innerRadius={1.05} length={5} material={materials.scuffedMetal} position={[0, 0, 0]} />
        <RealisticPipe outerRadius={0.6} innerRadius={0.5} length={5} material={mat} position={[1.4, 0, 0.6]} />
      </group>
    </Float>
  );
}

function ProfileBeam({ color = "green" }) {
  const materials = usePremiumMaterials();

  // 1. I-Beam (двутавр)
  const iBeamShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.2, h = 1.6, t = 0.15;
    s.moveTo(-w/2, h/2);
    s.lineTo(w/2, h/2);
    s.lineTo(w/2, h/2 - t);
    s.lineTo(t/2, h/2 - t);
    s.lineTo(t/2, -h/2 + t);
    s.lineTo(w/2, -h/2 + t);
    s.lineTo(w/2, -h/2);
    s.lineTo(-w/2, -h/2);
    s.lineTo(-w/2, -h/2 + t);
    s.lineTo(-t/2, -h/2 + t);
    s.lineTo(-t/2, h/2 - t);
    s.lineTo(-w/2, h/2 - t);
    s.lineTo(-w/2, h/2);
    return s;
  }, []);

  // 2. Швеллер (Channel)
  const channelShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.0, h = 1.4, t = 0.15;
    s.moveTo(-w/2, h/2);
    s.lineTo(w/2, h/2);
    s.lineTo(w/2, h/2 - t);
    s.lineTo(-w/2 + t, h/2 - t);
    s.lineTo(-w/2 + t, -h/2 + t);
    s.lineTo(w/2, -h/2 + t);
    s.lineTo(w/2, -h/2);
    s.lineTo(-w/2, -h/2);
    s.lineTo(-w/2, h/2);
    return s;
  }, []);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 6]} scale={1.35} position={[0, 0.5, 0]}>
        {/* 1. I-Beam — scuffedMetal */}
        <mesh material={materials.scuffedMetal} position={[0, -0.8, -2]}>
          <extrudeGeometry args={[iBeamShape, { depth: 4, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }]} />
        </mesh>
        
        {/* 2. Channel — orange */}
        <mesh material={materials.orangeMetal} position={[1.6, 0.4, -1.5]} rotation={[0, 0, Math.PI/2]}>
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

function ProfileSheets({ color = "orange" }) {
  const materials = usePremiumMaterials();
  const mat = color === "orange" ? materials.orangeMetal : materials.scuffedMetal;
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
  
  // 1. L-Angle (Уголок)
  const lShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.8, h = 1.8, t = 0.2;
    const cx = -w / 4, cy = -h / 4;
    s.moveTo(cx, cy + h);
    s.lineTo(cx + t, cy + h);
    s.lineTo(cx + t, cy + t);
    s.lineTo(cx + w, cy + t);
    s.lineTo(cx + w, cy);
    s.lineTo(cx, cy);
    s.lineTo(cx, cy + h);
    return s;
  }, []);

  // 2. C-Channel (Швеллер)
  const cShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.4, h = 2.2, t = 0.2;
    s.moveTo(-w/2, h/2);
    s.lineTo(w/2, h/2);
    s.lineTo(w/2, h/2 - t);
    s.lineTo(-w/2 + t, h/2 - t);
    s.lineTo(-w/2 + t, -h/2 + t);
    s.lineTo(w/2, -h/2 + t);
    s.lineTo(w/2, -h/2);
    s.lineTo(-w/2, -h/2);
    s.lineTo(-w/2, h/2);
    return s;
  }, []);

  // 3. Z-Profile (Z-Образный)
  const zShape = useMemo(() => {
    const s = new THREE.Shape();
    const wTop = 1.4, wBot = 1.4, h = 2.2, t = 0.2;
    s.moveTo(-wTop/2, h/2);
    s.lineTo(wTop/2 + t/2, h/2);
    s.lineTo(wTop/2 + t/2, h/2 - t);
    s.lineTo(t/2, h/2 - t);
    s.lineTo(t/2, -h/2);
    s.lineTo(-wBot/2 - t/2, -h/2);
    s.lineTo(-wBot/2 - t/2, -h/2 + t);
    s.lineTo(-t/2, -h/2 + t);
    s.lineTo(-t/2, h/2);
    s.lineTo(-wTop/2, h/2);
    return s;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <group rotation={[Math.PI / 5, Math.PI / 4, 0]} scale={1.4} position={[0.5, -0.2, 0]}>
        {/* 1. L-Angle - Orange */}
        <mesh material={materials.orangeMetal} position={[-1.2, 0.5, -1]}>
          <extrudeGeometry args={[lShape, { depth: 3.5, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 }]} />
        </mesh>
        
        {/* 2. C-Channel - Dark */}
        <mesh material={materials.darkMetal} position={[0, -0.5, 0.5]} rotation={[0, 0, Math.PI/2]}>
          <extrudeGeometry args={[cShape, { depth: 3.0, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 }]} />
        </mesh>
        
        {/* 3. Z-Profile - Silver */}
        <mesh material={materials.silver} position={[1.5, 0.8, -2]} rotation={[0, 0, Math.PI]}>
          <extrudeGeometry args={[zShape, { depth: 3.2, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.03, bevelThickness: 0.03 }]} />
        </mesh>
      </group>
    </Float>
  );
}

function ProfileRebar({ color = "orange" }) {
  const materials = usePremiumMaterials();
  const mat = color === "orange" ? materials.orangeMetal : materials.darkMetal;
  
  const SingleRebar = ({ length, material, position }: any) => {
    const ribCount = Math.floor(length / 0.15);
    return (
      <group position={position}>
        <mesh material={material}>
          <cylinderGeometry args={[0.2, 0.2, length, 16]} />
        </mesh>
        {Array.from({ length: ribCount }).map((_, i) => (
          <mesh key={i} material={material} position={[0, -length/2 + i * 0.15 + 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
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

export function CardLive3D({ type, color }: { type: string, color: "orange" | "green" }) {
  const envColor = color === "orange" ? "#FF5722" : "#00E676";

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
