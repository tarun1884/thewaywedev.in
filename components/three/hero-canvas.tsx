"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Animated particles (spherical shell) ─── */
function Particles({ count = 500 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.015;
  });

  const material = React.useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#a78bfa",
        size: 0.045,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    []
  );

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ─── Main wireframe icosahedron ─── */
function MainIcosahedron() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.18;
    ref.current.rotation.y = clock.elapsedTime * 0.14;
    ref.current.rotation.z = clock.elapsedTime * 0.08;
  });
  return (
    <mesh ref={ref} position={[1.8, 0, -1]}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

/* ─── Inner glowing sphere ─── */
function GlowCore() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 0.9) * 0.06;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y = clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={ref} position={[1.8, 0, -1]}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial
        color="#c084fc"
        emissive="#7c3aed"
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/* ─── Floating torus ─── */
function FloatingTorus() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.4;
    ref.current.rotation.z = clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh ref={ref} position={[-2.6, -1.4, 0.5]}>
        <torusGeometry args={[0.7, 0.28, 20, 40]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#9d174d"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ─── Floating octahedron ─── */
function FloatingOcta() {
  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={0.9}>
      <mesh position={[-3, 2.2, -0.8]}>
        <octahedronGeometry args={[0.55]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0369a1"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
}

/* ─── Floating wireframe box ─── */
function FloatingBox() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.3;
    ref.current.rotation.y = clock.elapsedTime * 0.4;
  });
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <mesh ref={ref} position={[3.5, 2.2, -1.5]}>
        <boxGeometry args={[0.65, 0.65, 0.65]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#b45309"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ─── Small floating sphere ─── */
function FloatingSphere() {
  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh position={[4, -1.8, 0.2]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#065f46"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ─── Ring of dots around the icosahedron ─── */
function Ring() {
  const ref = React.useRef<THREE.Points>(null);

  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[i * 3] = 1.8 + Math.cos(angle) * 3.2;
      positions[i * 3 + 1] = Math.sin(angle) * 3.2;
      positions[i * 3 + 2] = -1;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.1;
  });

  const material = React.useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#818cf8",
        size: 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    []
  );

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ─── Scene ─── */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={2.5} color="#a78bfa" />
      <pointLight position={[-6, -4, 4]} intensity={1.5} color="#ec4899" />
      <pointLight position={[0, 0, 8]} intensity={1} color="#38bdf8" />

      {/* Objects */}
      <Particles count={500} />
      <Ring />
      <MainIcosahedron />
      <GlowCore />
      <FloatingTorus />
      <FloatingOcta />
      <FloatingBox />
      <FloatingSphere />
    </>
  );
}

/* ─── Exported canvas ─── */
export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Scene />
    </Canvas>
  );
}
