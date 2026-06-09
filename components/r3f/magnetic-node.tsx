"use client";

import * as React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import type { NodeService } from "@/lib/node-services";

/* ── Module-level constants — allocated once, never GC'd per frame ── */
const BG_COLOR = new THREE.Color("#f0ebfb");
const _toMouse = new THREE.Vector3();   // node → mouse delta
const _toTarget = new THREE.Vector3(); // node → spring target

/* ── Physics constants ─────────────────────────────────────────────── */
const REPEL_RADIUS = 2.4;  // world-units radius of cursor repulsion field
const REPEL_FORCE  = 0.055; // impulse magnitude at zero distance
const SPRING       = 0.042; // spring pull toward resting position
const DAMPING      = 0.876; // velocity dampening per frame
const NODE_RADIUS  = 0.72;  // sphere radius (world units)

interface Props {
  service: NodeService;
  /** World-space cursor position on the z=0 plane, updated each frame */
  mouse3D: React.MutableRefObject<THREE.Vector3>;
  isActive: boolean;
  hasActive: boolean;
  isMobile: boolean;
  onSelect: (id: number) => void;
}

export function MagneticNode({
  service,
  mouse3D,
  isActive,
  hasActive,
  isMobile,
  onSelect,
}: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const velocity = useRef(new THREE.Vector3());
  const Icon = service.icon;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();
    const id = service.id;

    /* ── Continuous sine-wave float ───────────────────── */
    const fx = Math.cos(t * 0.32 + id * 1.45) * 0.13;
    const fy = Math.sin(t * 0.44 + id * 1.12) * 0.19;

    /* ── Compute target position ─────────────────────── */
    let tx = service.pos[0] + fx;
    let ty = service.pos[1] + fy;
    const tz = service.pos[2];

    /* When a card is open, scatter inactive nodes to viewport edges */
    if (hasActive && !isActive) {
      const ox = service.pos[0];
      const oy = service.pos[1];
      const len = Math.sqrt(ox * ox + oy * oy) || 1;
      tx += (ox / len) * 2.6;
      ty += (oy / len) * 2.6;
    }

    /* ── Cursor repulsion (desktop only, only when no card is open) ── */
    if (!isMobile && !hasActive) {
      _toMouse.copy(mesh.position).sub(mouse3D.current);
      const dist = _toMouse.length();
      if (dist < REPEL_RADIUS && dist > 0.001) {
        /*
          Force is proportional to proximity: strongest at dist=0,
          zero at dist=REPEL_RADIUS. lerp-smoothed via velocity damping.
        */
        velocity.current.addScaledVector(
          _toMouse.normalize(),
          ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE
        );
      }
    }

    /* ── Spring back to resting position ─────────────── */
    _toTarget.set(tx, ty, tz).sub(mesh.position);
    velocity.current.addScaledVector(_toTarget, SPRING);
    velocity.current.multiplyScalar(DAMPING);
    mesh.position.add(velocity.current);

    /* ── Scale: shrink to 0 when this node's card is open ── */
    const targetScale = hasActive && isActive ? 0 : 1;
    mesh.scale.setScalar(
      THREE.MathUtils.lerp(mesh.scale.x, targetScale, 0.12)
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={service.pos as [number, number, number]}
      onClick={(e) => {
        e.stopPropagation();
        if (!hasActive) onSelect(service.id);
      }}
      onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { document.body.style.cursor = "default"; }}
    >
      <sphereGeometry args={[NODE_RADIUS, isMobile ? 24 : 48, isMobile ? 24 : 48]} />

      {/*
        MeshTransmissionMaterial requires an Environment cube map to render
        properly — <Environment preset="city" /> must be present in the scene.
        DO NOT use MeshPhysicalMaterial here; it lacks the render-target
        transmission pipeline that produces true glass refraction.
      */}
      <MeshTransmissionMaterial
        transmission={1}
        thickness={1.5}
        roughness={0.15}
        ior={1.5}
        chromaticAberration={0.04}
        distortion={0.2}
        color="#f4f0fe"
        background={BG_COLOR}
        temporalDistortion={0}
        distortionScale={0.3}
        /* ── Performance: share one low-res transmission buffer ── */
        transmissionSampler
        resolution={512}
        samples={4}
      />

      {/* ── Icon + label rendered INSIDE the glass node ──────── */}
      <Html
        center
        distanceFactor={6.5}
        position={[0, 0, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[1, 9]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: 130,
            textAlign: "center",
            opacity: hasActive && !isActive ? 0.2 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Tinted rounded-square icon chip */}
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: 48,
              height: 48,
              borderRadius: 16,
              background: `rgba(${service.rgb}, 0.16)`,
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <Icon size={24} color={service.accent} strokeWidth={2} />
          </div>

          {/* Label */}
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {service.label}
          </span>
        </div>
      </Html>
    </mesh>
  );
}
