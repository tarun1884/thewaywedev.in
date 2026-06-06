"use client";

import * as React from "react";
import * as THREE from "three";

type Floater = {
  mesh: THREE.Mesh;
  baseY: number;
  floatSpeed: number;
  rotDelta: { x: number; y: number; z: number };
};

export function HeroCanvas() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ─────────────────────────────────── */
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene & Camera ───────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
    camera.position.z = 8;

    /* ── Lights ───────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const pl1 = new THREE.PointLight(0xa78bfa, 2.5, 30);
    pl1.position.set(6, 6, 6);
    scene.add(pl1);

    const pl2 = new THREE.PointLight(0xec4899, 1.5, 30);
    pl2.position.set(-6, -4, 4);
    scene.add(pl2);

    const pl3 = new THREE.PointLight(0x38bdf8, 1.0, 20);
    pl3.position.set(0, 0, 8);
    scene.add(pl3);

    /* ── Main wireframe icosahedron ───────────────── */
    const icosa = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.4, 1),
      new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      })
    );
    icosa.position.set(1.8, 0, -1);
    scene.add(icosa);

    /* ── Inner glowing sphere ─────────────────────── */
    const glowCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.55,
      })
    );
    glowCore.position.set(1.8, 0, -1);
    scene.add(glowCore);

    /* ── Particle cloud ───────────────────────────── */
    const pCount = 500;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 4.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xa78bfa,
        size: 0.045,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      })
    );
    scene.add(particles);

    /* ── Orbit dot ring ───────────────────────────── */
    const rCount = 80;
    const rPositions = new Float32Array(rCount * 3);
    for (let i = 0; i < rCount; i++) {
      const a = (i / rCount) * Math.PI * 2;
      rPositions[i * 3] = 1.8 + Math.cos(a) * 3.2;
      rPositions[i * 3 + 1] = Math.sin(a) * 3.2;
      rPositions[i * 3 + 2] = -1;
    }
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute("position", new THREE.BufferAttribute(rPositions, 3));
    const ring = new THREE.Points(
      rGeo,
      new THREE.PointsMaterial({
        color: 0x818cf8,
        size: 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      })
    );
    scene.add(ring);

    /* ── Floating geometric shapes ────────────────── */
    const floaters: Floater[] = [];

    const addFloater = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      pos: [number, number, number],
      rotDelta: { x: number; y: number; z: number },
      floatSpeed: number
    ) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      scene.add(mesh);
      floaters.push({ mesh, baseY: pos[1], floatSpeed, rotDelta });
    };

    // Torus — fuchsia
    addFloater(
      new THREE.TorusGeometry(0.7, 0.28, 20, 40),
      new THREE.MeshStandardMaterial({
        color: 0xec4899, emissive: 0x9d174d,
        emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.8,
      }),
      [-2.6, -1.4, 0.5],
      { x: 0.008, y: 0, z: 0.005 },
      1.4
    );

    // Octahedron — sky blue
    addFloater(
      new THREE.OctahedronGeometry(0.55),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8, emissive: 0x0369a1,
        emissiveIntensity: 0.6, roughness: 0.15, metalness: 0.85,
      }),
      [-3, 2.2, -0.8],
      { x: 0.009, y: 0.014, z: 0.006 },
      1.8
    );

    // Box wireframe — amber
    addFloater(
      new THREE.BoxGeometry(0.65, 0.65, 0.65),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b, emissive: 0xb45309,
        emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.7, wireframe: true,
      }),
      [3.5, 2.2, -1.5],
      { x: 0.005, y: 0.008, z: 0 },
      1.2
    );

    // Sphere — emerald
    addFloater(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x34d399, emissive: 0x065f46,
        emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.8,
      }),
      [4, -1.8, 0.2],
      { x: 0, y: 0.006, z: 0.002 },
      2.2
    );

    /* ── Animation loop ───────────────────────────── */
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Main icosahedron + core
      icosa.rotation.x = t * 0.18;
      icosa.rotation.y = t * 0.14;
      icosa.rotation.z = t * 0.08;

      glowCore.scale.setScalar(1 + Math.sin(t * 0.9) * 0.06);
      glowCore.rotation.y = t * 0.12;

      // Particles + ring
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;
      ring.rotation.z = t * 0.1;

      // Floaters
      for (const f of floaters) {
        f.mesh.position.y = f.baseY + Math.sin(t * f.floatSpeed) * 0.38;
        f.mesh.rotation.x += f.rotDelta.x;
        f.mesh.rotation.y += f.rotDelta.y;
        f.mesh.rotation.z += f.rotDelta.z;
      }

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ───────────────────────────────────── */
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ──────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
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

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}
