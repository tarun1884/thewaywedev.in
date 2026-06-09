"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MagneticNode } from "./magnetic-node";
import { NODE_SERVICES } from "@/lib/node-services";

/* Module-level temporaries — never recreated per frame */
const _unproj = new THREE.Vector3();
const _dir = new THREE.Vector3();

interface Props {
  activeId: number | null;
  isMobile: boolean;
  onSelect: (id: number) => void;
}

export function NodesGroup({ activeId, isMobile, onSelect }: Props) {
  const { camera, mouse } = useThree();

  /* Mouse 3D position on the z=0 plane — written every frame */
  const mouse3D = useRef(new THREE.Vector3(999, 999, 0));

  /* Camera animation targets (mutated in useEffect, read in useFrame) */
  const camTarget = useRef(new THREE.Vector3(0, 0, 8));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const lookCurrent = useRef(new THREE.Vector3(0, 0, 0));

  /* Colored point lights orbiting behind the nodes */
  const pinkLight = useRef<THREE.PointLight>(null!);
  const cyanLight = useRef<THREE.PointLight>(null!);

  /* Update camera target when selected node changes */
  useEffect(() => {
    if (activeId !== null) {
      const p = NODE_SERVICES[activeId].pos;
      camTarget.current.set(p[0] * 0.18, p[1] * 0.14, 6.8);
      lookTarget.current.set(p[0] * 0.28, p[1] * 0.2, 0);
    } else {
      camTarget.current.set(0, 0, 8);
      lookTarget.current.set(0, 0, 0);
    }
  }, [activeId]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cam = camera as THREE.PerspectiveCamera;

    /* ── Unproject mouse to world-space z=0 plane ──────── */
    if (!isMobile) {
      _unproj.set(mouse.x, mouse.y, 0.5).unproject(cam);
      _dir.copy(_unproj).sub(cam.position).normalize();
      const dist = -cam.position.z / _dir.z;
      if (isFinite(dist) && dist > 0) {
        mouse3D.current.copy(cam.position).addScaledVector(_dir, dist);
      }
    }

    /* ── Smooth camera pan toward target ───────────────── */
    cam.position.lerp(camTarget.current, 0.05);
    lookCurrent.current.lerp(lookTarget.current, 0.05);
    cam.lookAt(lookCurrent.current);

    /*
      ── Orbit two colored PointLights behind the nodes ───
      Negative z places them behind (further from camera).
      Pink and cyan provide iridescent edge-lighting for the glass.
    */
    if (pinkLight.current) {
      pinkLight.current.position.set(
        Math.cos(t * 0.28) * 5.5,
        Math.sin(t * 0.22) * 4.2,
        Math.sin(t * 0.17) * 2.5 - 3.5
      );
    }
    if (cyanLight.current) {
      cyanLight.current.position.set(
        Math.cos(t * 0.21 + Math.PI) * 6,
        Math.sin(t * 0.19 + 1.1) * 3.8,
        Math.sin(t * 0.25) * 2 - 3
      );
    }
  });

  return (
    <>
      {/* Soft pastel-pink PointLight — behind the nodes */}
      <pointLight
        ref={pinkLight}
        color="#f9a8d4"
        intensity={isMobile ? 2.5 : 5}
        distance={22}
        decay={2}
      />

      {/* Sky-blue PointLight — behind the nodes */}
      <pointLight
        ref={cyanLight}
        color="#7dd3fc"
        intensity={isMobile ? 2.5 : 5}
        distance={22}
        decay={2}
      />

      {/* Warm peach fill from above-front */}
      <pointLight
        color="#fcd9b7"
        intensity={2.8}
        position={[0, 4, 1]}
        distance={18}
        decay={2}
      />

      {NODE_SERVICES.map((s) => (
        <MagneticNode
          key={s.id}
          service={s}
          mouse3D={mouse3D}
          isActive={activeId === s.id}
          hasActive={activeId !== null}
          isMobile={isMobile}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
