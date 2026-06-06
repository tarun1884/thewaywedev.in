"use client";

import * as React from "react";
import * as THREE from "three";

/* ─── Types ─────────────────────────────────────────────────── */
type GlassObj = {
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  vel: THREE.Vector3;
  floatPhase: number;
  floatSpeed: number;
};

/* ─── Exported component ─────────────────────────────────────── */
export function GlassScene() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const mouseNDC = React.useRef(new THREE.Vector2(0, 0));
  const scrollY = React.useRef(0);

  React.useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const SEG = isMobile ? 32 : 64;

    /* ── Renderer ─────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    /* ── Scene & Camera ───────────────────────────────────────── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    scene.fog = new THREE.Fog(0xfafafa, 12, 28);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 8;

    /* ── Materials ────────────────────────────────────────────── */
    const clearGlass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.05,
      transmission: 0.96,
      thickness: 1.8,
      ior: 1.78,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const frostedGlass = new THREE.MeshPhysicalMaterial({
      color: 0xf8f8ff,
      metalness: 0,
      roughness: 0.18,
      transmission: 0.88,
      thickness: 1.2,
      ior: 1.52,
      iridescence: 0.7,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [80, 380],
      transparent: true,
      side: THREE.DoubleSide,
    });

    /* ── Glass object cluster ─────────────────────────────────── */
    const objects: GlassObj[] = [];

    const add = (
      geo: THREE.BufferGeometry,
      mat: THREE.MeshPhysicalMaterial,
      pos: [number, number, number],
      phase: number,
      speed: number
    ) => {
      const mesh = new THREE.Mesh(geo, mat.clone());
      mesh.position.set(...pos);
      scene.add(mesh);
      objects.push({
        mesh,
        home: new THREE.Vector3(...pos),
        vel: new THREE.Vector3(),
        floatPhase: phase,
        floatSpeed: speed,
      });
    };

    // Main cluster
    add(new THREE.SphereGeometry(1.25, SEG, SEG), clearGlass, [0, 0.3, 0], 0, 0.7);
    add(new THREE.SphereGeometry(0.78, SEG, SEG), frostedGlass, [-2.4, 0.2, -0.6], 1.6, 1.0);
    add(new THREE.SphereGeometry(0.52, SEG, SEG), clearGlass, [2.5, -0.5, 0.3], 3.1, 0.9);

    if (!isMobile) {
      add(new THREE.CapsuleGeometry(0.32, 1.3, 8, SEG / 2), frostedGlass, [1.7, 1.9, -1.0], 0.9, 1.2);
      add(new THREE.CapsuleGeometry(0.28, 1.0, 8, SEG / 2), clearGlass, [-1.7, -1.6, 0.4], 2.3, 1.1);
      add(new THREE.SphereGeometry(0.35, SEG / 2, SEG / 2), frostedGlass, [-3.2, -0.6, -0.2], 4.5, 1.4);
    }

    /* ── Lighting ─────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(4, 6, 5);
    scene.add(sun);

    const lightDefs = [
      { color: 0x8b5cf6, r: 3.8, speed: 0.38, phase: 0,           tiltY: 0,    tiltZ: 0 },
      { color: 0xfb923c, r: 3.0, speed: 0.55, phase: Math.PI * 0.67, tiltY: 0.3,  tiltZ: 0.2 },
      { color: 0x38bdf8, r: 4.2, speed: 0.27, phase: Math.PI * 1.35, tiltY: -0.2, tiltZ: -0.1 },
    ].slice(0, isMobile ? 2 : 3);

    const orbitLights = lightDefs.map(({ color, r, speed, phase, tiltY, tiltZ }) => {
      const light = new THREE.PointLight(color, isMobile ? 2.5 : 4.0, 14);
      scene.add(light);
      return { light, r, speed, phase, tiltY, tiltZ };
    });

    /* ── Card-hover color shift ───────────────────────────────── */
    const hoverTarget = new THREE.Color(1, 1, 1);
    const onHover = (e: Event) => {
      hoverTarget.set((e as CustomEvent<{ color: string }>).detail.color);
    };
    const onLeave = () => hoverTarget.set(0xffffff);
    window.addEventListener("card-hover", onHover);
    window.addEventListener("card-leave", onLeave);

    /* ── Input listeners ──────────────────────────────────────── */
    const onMouse = (e: MouseEvent) => {
      mouseNDC.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    /* ── Helper: mouse → world at z=0 ────────────────────────── */
    const mouseWorld = new THREE.Vector3();
    const getMouseWorld = () => {
      const v = new THREE.Vector3(mouseNDC.current.x, mouseNDC.current.y, 0.5);
      v.unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      mouseWorld.copy(camera.position).addScaledVector(dir, dist);
    };

    /* ── Temp vector pool (avoid GC pressure) ─────────────────── */
    const tmpDiff = new THREE.Vector3();
    const tmpTarget = new THREE.Vector3();
    const tmpRepel = new THREE.Vector3();

    /* ── Animation loop ───────────────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Scroll progress (0 → 1 over first 80vh)
      const sp = Math.min(scrollY.current / (window.innerHeight * 0.8), 1);

      // Orbiting lights
      orbitLights.forEach(({ light, r, speed, phase, tiltY, tiltZ }) => {
        const a = t * speed + phase;
        light.position.set(
          Math.cos(a) * r,
          Math.sin(a * 0.6 + tiltY) * r * 0.55,
          Math.sin(a + tiltZ) * r * 0.45 - 1.5
        );
        light.color.lerp(hoverTarget, 0.025);
      });

      // Mouse world
      getMouseWorld();
      const REPEL_R = 2.8;
      const REPEL_F = 0.085;

      // Glass objects
      objects.forEach((o) => {
        // Float oscillation
        const fy = Math.sin(t * o.floatSpeed + o.floatPhase) * 0.16;
        const fx = Math.cos(t * o.floatSpeed * 0.65 + o.floatPhase) * 0.09;

        // Scroll morph: objects rise and spread apart
        const riseY  = sp * 4.5;
        const spreadX = o.home.x * (1 + sp * 0.6);

        tmpTarget.set(spreadX + fx, o.home.y + fy + riseY, o.home.z);

        // Spring toward target
        tmpDiff.copy(tmpTarget).sub(o.mesh.position);
        o.vel.addScaledVector(tmpDiff, 0.04);

        // Mouse repel
        tmpRepel.copy(o.mesh.position).sub(mouseWorld);
        const d = tmpRepel.length();
        if (d < REPEL_R && d > 0.001) {
          o.vel.addScaledVector(
            tmpRepel.normalize(),
            ((REPEL_R - d) / REPEL_R) * REPEL_F
          );
        }

        // Damping
        o.vel.multiplyScalar(0.87);
        o.mesh.position.add(o.vel);

        // Slow drift rotation
        o.mesh.rotation.x = Math.sin(t * 0.07 + o.floatPhase) * 0.15;
        o.mesh.rotation.y = t * 0.06 + o.floatPhase * 0.1;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ──────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("card-hover", onHover);
      window.removeEventListener("card-leave", onLeave);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
