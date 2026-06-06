"use client";

import * as React from "react";
import * as THREE from "three";

export function NeonScene() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  React.useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const mobile = window.innerWidth < 768;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const SEG = mobile ? 48 : 96;

    /* ─── Renderer ───────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    el.appendChild(renderer.domElement);

    /* ─── Scene ──────────────────────────────────────────── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04030f);

    /* ─── Camera ─────────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 100);
    camera.position.z = 7.5;

    /* ══════════════════════════════════════════════════════
       CHROME  IRIDESCENT  SPHERE
    ══════════════════════════════════════════════════════ */
    const chromeMat = new THREE.MeshPhysicalMaterial({
      metalness: 1.0,
      roughness: 0.02,
      color: 0xffffff,
      iridescence: 1.0,
      iridescenceIOR: 2.3,
      reflectivity: 1.0,
    });
    (chromeMat as unknown as Record<string, unknown>).iridescenceThicknessRange = [150, 1200];

    const chromeSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, SEG, SEG),
      chromeMat
    );
    chromeSphere.position.set(1.1, 0.15, 0);
    scene.add(chromeSphere);

    /* ══════════════════════════════════════════════════════
       NEON  TORUS  KNOT  +  MULTI-LAYER  GLOW
    ══════════════════════════════════════════════════════ */
    const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.24, mobile ? 110 : 230, 22, 3, 2);

    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xff006e,
      emissive: new THREE.Color(0xff006e),
      emissiveIntensity: 1.1,
      roughness: 0.08,
      metalness: 0.55,
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    torusKnot.position.set(-1.4, 0.1, 0);
    scene.add(torusKnot);

    /* Halo layers (additive backside) */
    const makeHalo = (scale: number, opacity: number) => {
      const m = new THREE.Mesh(
        knotGeo,
        new THREE.MeshBasicMaterial({
          color: 0xff006e,
          transparent: true,
          opacity,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      m.scale.setScalar(scale);
      torusKnot.add(m);
    };
    makeHalo(1.14, 0.18);
    makeHalo(1.40, 0.08);
    makeHalo(1.80, 0.03);

    /* ══════════════════════════════════════════════════════
       BACKGROUND  WIREFRAME  ICOSAHEDRON
    ══════════════════════════════════════════════════════ */
    const bgWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6.5, 2),
      new THREE.MeshBasicMaterial({
        color: 0x4444cc,
        wireframe: true,
        transparent: true,
        opacity: 0.028,
      })
    );
    scene.add(bgWire);

    /* ══════════════════════════════════════════════════════
       FLOATING  NEON  GEMS
    ══════════════════════════════════════════════════════ */
    type Gem = { mesh: THREE.Mesh; by: number; sp: number; ph: number };
    const gems: Gem[] = [];

    const addGem = (
      col: number,
      pos: [number, number, number],
      size: number,
      sp: number,
      ph: number
    ) => {
      const geo = new THREE.OctahedronGeometry(size);
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: new THREE.Color(col),
        emissiveIntensity: 1.0,
        roughness: 0.05,
        metalness: 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);

      // Mini glow
      const gm = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.22,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      gm.scale.setScalar(2.2);
      mesh.add(gm);

      scene.add(mesh);
      gems.push({ mesh, by: pos[1], sp, ph });
    };

    if (!mobile) {
      addGem(0x00f5ff, [-4.0,  2.1, -1.8], 0.22, 1.0, 0.0);
      addGem(0x8b2fff, [ 3.8, -1.9, -2.2], 0.19, 1.3, 1.5);
      addGem(0xffd60a, [ 3.2,  2.3, -2.8], 0.17, 0.9, 3.0);
      addGem(0x00f5ff, [-2.8, -2.6, -1.2], 0.15, 1.1, 4.5);
      addGem(0xff006e, [ 4.5,  0.6, -3.5], 0.13, 1.4, 2.0);
      addGem(0x8b2fff, [-4.2, -0.8, -3.0], 0.12, 0.8, 5.0);
    } else {
      addGem(0x00f5ff, [-3.0,  1.5, -2.0], 0.18, 1.0, 0.0);
      addGem(0x8b2fff, [ 3.0, -1.5, -2.0], 0.15, 1.2, 2.0);
    }

    /* ══════════════════════════════════════════════════════
       COLORFUL  PARTICLE  FIELD
    ══════════════════════════════════════════════════════ */
    const PC = mobile ? 1800 : 4500;
    const pPos = new Float32Array(PC * 3);
    const pCol = new Float32Array(PC * 3);
    const palette = [
      new THREE.Color(0xff006e),
      new THREE.Color(0x00f5ff),
      new THREE.Color(0x8b2fff),
      new THREE.Color(0xffd60a),
      new THREE.Color(0xffffff),
      new THREE.Color(0xff4499),
      new THREE.Color(0x44ffcc),
    ];
    for (let i = 0; i < PC; i++) {
      const r = 4.5 + Math.random() * 9;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pPos[i * 3]     = r * Math.sin(p) * Math.cos(t);
      pPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      pPos[i * 3 + 2] = r * Math.cos(p);
      const c = palette[Math.floor(Math.random() * palette.length)];
      pCol[i * 3]     = c.r;
      pCol[i * 3 + 1] = c.g;
      pCol[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));

    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.03,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(particles);

    /* ══════════════════════════════════════════════════════
       LIGHTS
    ══════════════════════════════════════════════════════ */
    scene.add(new THREE.AmbientLight(0xffffff, 0.07));

    const LD = [
      { col: 0xff006e, r: 4.0, spd: 0.52, ph: 0.00,          tilt: 0.30 },
      { col: 0x00f5ff, r: 4.5, spd: 0.34, ph: Math.PI * 0.6, tilt: -0.28 },
      { col: 0x8b2fff, r: 3.8, spd: 0.44, ph: Math.PI * 1.2, tilt: 0.50 },
      { col: 0xffd60a, r: 3.2, spd: 0.63, ph: Math.PI * 1.8, tilt: -0.40 },
    ].slice(0, mobile ? 2 : 4);

    const orbitLights = LD.map(({ col, r, spd, ph, tilt }) => {
      const l = new THREE.PointLight(col, mobile ? 6 : 10, 22);
      scene.add(l);
      return { l, r, spd, ph, tilt };
    });

    /* ─── Events ─────────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    /* ─── Animation ─────────────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* Smooth camera parallax */
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.045;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.045;
      camera.position.x = mouse.current.x * 0.75;
      camera.position.y = mouse.current.y * 0.5;
      camera.lookAt(0, 0, 0);

      /* Orbit lights */
      orbitLights.forEach(({ l, r, spd, ph, tilt }) => {
        const a = t * spd + ph;
        l.position.set(
          Math.cos(a) * r,
          Math.sin(a * 0.75 + tilt) * r * 0.55,
          Math.sin(a) * r * 0.5
        );
      });

      /* Chrome sphere */
      chromeSphere.rotation.y = t * 0.09;
      chromeSphere.rotation.x = Math.sin(t * 0.12) * 0.14;
      chromeSphere.scale.setScalar(1 + Math.sin(t * 0.7) * 0.018);

      /* Torus knot */
      torusKnot.rotation.x = t * 0.25;
      torusKnot.rotation.y = t * 0.20;
      torusKnot.rotation.z = t * 0.14;
      knotMat.emissiveIntensity = 0.85 + Math.sin(t * 2.2) * 0.35;

      /* Background wire */
      bgWire.rotation.y = t * 0.014;
      bgWire.rotation.x = t * 0.009;

      /* Particles */
      particles.rotation.y =  t * 0.018;
      particles.rotation.z =  t * 0.009;

      /* Gems */
      gems.forEach((g, i) => {
        g.mesh.rotation.x = t * (0.55 + i * 0.08);
        g.mesh.rotation.y = t * (0.38 + i * 0.12);
        g.mesh.position.y = g.by + Math.sin(t * g.sp + g.ph) * 0.28;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ─── Cleanup ────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            m.dispose()
          );
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
