"use client";

import * as React from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Zap } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   SERVICE DATA
══════════════════════════════════════════════════════════════ */
export type Service = {
  id: number;
  title: string;
  short: string;
  emoji: string;
  desc: string;
  tech: string[];
  stat: string;
  statLabel: string;
  pos: [number, number, number];
  accent: string;   // hex
  rgb: string;      // "r,g,b" for rgba()
};

export const SERVICES: Service[] = [
  {
    id: 0,
    title: "Full-Stack Web Architecture",
    short: "Web Dev",
    emoji: "⚡",
    desc: "From zero to production-grade platforms. We architect scalable, high-performance systems that handle millions of requests and grow with your ambitions.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Edge"],
    stat: "99",
    statLabel: "Avg Lighthouse Score",
    pos: [-2.2, 1.2, 0],
    accent: "#8b5cf6",
    rgb: "139,92,246",
  },
  {
    id: 1,
    title: "High-Conversion E-Commerce",
    short: "E-Commerce",
    emoji: "🛍",
    desc: "Storefronts engineered for conversion. Every pixel, flow, and checkout interaction is meticulously optimised to turn visitors into loyal buyers.",
    tech: ["Shopify Hydrogen", "Next Commerce", "Stripe", "Custom Checkout", "Analytics"],
    stat: "+138%",
    statLabel: "Avg Conversion Lift",
    pos: [2.2, 0.8, 0],
    accent: "#ec4899",
    rgb: "236,72,153",
  },
  {
    id: 2,
    title: "SEO & Search Dominance",
    short: "SEO & Growth",
    emoji: "🔍",
    desc: "We don't chase rankings — we build the technical foundation that makes ranking inevitable. Core Web Vitals, schema, and programmatic content at scale.",
    tech: ["Core Web Vitals", "Schema Markup", "Programmatic SEO", "Content Ops", "Analytics"],
    stat: "4.2×",
    statLabel: "Avg Organic Traffic Lift",
    pos: [-1.8, -1.5, 0],
    accent: "#06b6d4",
    rgb: "6,182,212",
  },
  {
    id: 3,
    title: "Performance Optimisation",
    short: "Performance",
    emoji: "🚀",
    desc: "Sub-second load times. Silky 60fps interactions. We treat performance as a product feature — because your users and search engines do too.",
    tech: ["Edge Computing", "Image CDN", "Code Splitting", "Web Workers", "WASM"],
    stat: "0.8s",
    statLabel: "Avg LCP Score",
    pos: [2.0, -1.4, 0],
    accent: "#f59e0b",
    rgb: "245,158,11",
  },
];

/* ══════════════════════════════════════════════════════════════
   PHYSICS
══════════════════════════════════════════════════════════════ */
const REPEL_R  = 2.4;
const REPEL_F  = 0.05;
const SPRING   = 0.042;
const DAMP     = 0.875;
const NODE_R   = 0.72;

type NodeState = {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  labelEl: HTMLDivElement | null;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export function MagneticNodes() {
  const mountRef    = React.useRef<HTMLDivElement>(null);
  const containerRef= React.useRef<HTMLDivElement>(null);
  const mouseNDC    = React.useRef(new THREE.Vector2(0, 0));

  /* Camera target refs (mutated inside useEffect, read outside for close) */
  const camPosRef   = React.useRef(new THREE.Vector3(0, 0, 8));
  const camLookRef  = React.useRef(new THREE.Vector3(0, 0, 0));

  const [activeId, setActiveId]   = React.useState<number | null>(null);
  const activeRef = React.useRef<number | null>(null);
  React.useEffect(() => { activeRef.current = activeId; }, [activeId]);

  /* ── Scene setup ─────────────────────────────────────────── */
  React.useEffect(() => {
    const mount = mountRef.current;
    const wrap  = containerRef.current;
    if (!mount || !wrap) return;

    const mobile = window.innerWidth < 768;
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const SEG = mobile ? 32 : 64;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    /* Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);

    /* Camera */
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.z = 8;
    const camLookTarget = new THREE.Vector3(0, 0, 0);

    /* ── Lights ───────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.1);
    sunLight.position.set(5, 8, 6);
    scene.add(sunLight);

    const softLights = [
      { col: 0xb39ddb, r: 5.0, spd: 0.24, ph: 0 },            // pastel violet
      { col: 0x81d4fa, r: 5.5, spd: 0.19, ph: Math.PI * 0.7 },// sky blue
      { col: 0xffccbc, r: 4.5, spd: 0.16, ph: Math.PI * 1.4 },// peach
    ].map(({ col, r, spd, ph }) => {
      const l = new THREE.PointLight(col, 2.8, 16);
      scene.add(l);
      return { l, r, spd, ph };
    });

    /* ── Glass material ───────────────────────────────────── */
    const baseMat = new THREE.MeshPhysicalMaterial({
      transmission: 1.0,
      roughness: 0.18,
      thickness: 1.5,
      ior: 1.5,
      color: 0xffffff,
      transparent: true,
      side: THREE.DoubleSide,
      envMapIntensity: 0.6,
    });

    /* ── Node meshes ──────────────────────────────────────── */
    const sphereGeo = new THREE.SphereGeometry(NODE_R, SEG, SEG);
    const nodes: NodeState[] = SERVICES.map((s) => {
      const mat  = baseMat.clone();
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(...s.pos);
      mesh.userData.serviceId = s.id;
      scene.add(mesh);
      return { mesh, vel: new THREE.Vector3(), labelEl: null };
    });

    /* ── HTML labels ──────────────────────────────────────── */
    SERVICES.forEach((s, i) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position:absolute;top:0;left:0;pointer-events:none;
        transform:translate(-50%,-50%);transition:opacity 0.35s ease;
      `;
      el.innerHTML = `
        <div style="
          background:rgba(255,255,255,0.88);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,0.95);
          border-radius:9999px;
          padding:5px 14px;
          font-size:11.5px;
          font-weight:650;
          color:#111;
          white-space:nowrap;
          box-shadow:0 2px 14px rgba(0,0,0,0.09);
          letter-spacing:-0.01em;
        ">${s.short}</div>
      `;
      wrap.appendChild(el);
      nodes[i].labelEl = el;
    });

    /* ── Raycaster ────────────────────────────────────────── */
    const ray = new THREE.Raycaster();
    const tmpV = new THREE.Vector3();
    const tmpD = new THREE.Vector3();

    /* Mouse world pos at z=0 plane */
    const mouseWorld = new THREE.Vector3();
    const getMouseWorld = () => {
      tmpV.set(mouseNDC.current.x, mouseNDC.current.y, 0.5).unproject(camera);
      tmpD.copy(tmpV).sub(camera.position).normalize();
      const dist = -camera.position.z / tmpD.z;
      mouseWorld.copy(camera.position).addScaledVector(tmpD, dist);
    };

    /* ── Event handlers ───────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouseNDC.current.set(
        (e.clientX / mount.clientWidth)  *  2 - 1,
        -(e.clientY / mount.clientHeight) * 2 + 1
      );
    };

    const onClick = (e: MouseEvent) => {
      if (activeRef.current !== null) return;
      const mx = (e.clientX / mount.clientWidth)  * 2 - 1;
      const my = -(e.clientY / mount.clientHeight) * 2 + 1;
      ray.setFromCamera(new THREE.Vector2(mx, my), camera);
      const hits = ray.intersectObjects(nodes.map((n) => n.mesh));
      if (!hits.length) return;
      const id = hits[0].object.userData.serviceId as number;
      const p  = SERVICES[id].pos;
      camPosRef.current.set(p[0] * 0.18, p[1] * 0.14, 6.8);
      camLookRef.current.set(p[0] * 0.28, p[1] * 0.2, 0);
      setActiveId(id);
    };

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    mount.addEventListener("mousemove", onMove, { passive: true });
    mount.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    /* ── Animation loop ───────────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const act = activeRef.current;
      const hasAct = act !== null;
      const W2 = mount.clientWidth;
      const H2 = mount.clientHeight;

      /* Colored light orbit */
      softLights.forEach(({ l, r, spd, ph }) => {
        const a = t * spd + ph;
        l.position.set(
          Math.cos(a) * r,
          Math.sin(a * 0.65) * r * 0.5,
          Math.sin(a * 0.45) * 2.5 - 1.5
        );
      });

      /* Camera lerp */
      camera.position.lerp(camPosRef.current, 0.05);
      camLookTarget.lerp(camLookRef.current, 0.05);
      camera.lookAt(camLookTarget);

      /* Mouse world */
      if (!mobile) getMouseWorld();

      /* Node physics */
      nodes.forEach((node, i) => {
        const s = SERVICES[i];
        const isAct = act === i;

        /* Floating animation */
        const fx = Math.cos(t * 0.33 + i * 1.45) * 0.13;
        const fy = Math.sin(t * 0.42 + i * 1.12) * 0.19;
        const fz = Math.sin(t * 0.28 + i * 0.9)  * 0.06;

        /* Target position */
        let tx = s.pos[0] + fx;
        let ty = s.pos[1] + fy;
        const tz = s.pos[2] + fz;

        if (hasAct && !isAct) {
          /* Scatter to edges */
          const ox = s.pos[0];
          const oy = s.pos[1];
          const len = Math.sqrt(ox * ox + oy * oy) || 1;
          tx = s.pos[0] + fx + (ox / len) * 2.2;
          ty = s.pos[1] + fy + (oy / len) * 2.2;
        }

        /* Mouse repulsion (desktop only) */
        if (!mobile && !hasAct) {
          tmpV.copy(node.mesh.position).sub(mouseWorld);
          const d = tmpV.length();
          if (d < REPEL_R && d > 0.001) {
            const f = ((REPEL_R - d) / REPEL_R) * REPEL_F;
            node.vel.addScaledVector(tmpV.normalize(), f);
          }
        }

        /* Spring to target */
        tmpV.set(tx, ty, tz).sub(node.mesh.position);
        node.vel.addScaledVector(tmpV, SPRING);
        node.vel.multiplyScalar(DAMP);
        node.mesh.position.add(node.vel);

        /* Scale: active node shrinks to 0 when card opens */
        const tScale = hasAct && isAct ? 0 : 1;
        node.mesh.scale.setScalar(
          THREE.MathUtils.lerp(node.mesh.scale.x, tScale, 0.12)
        );

        /* Opacity dim for non-active */
        const mat = node.mesh.material as THREE.MeshPhysicalMaterial;
        const tOp = hasAct && !isAct ? 0.12 : 1.0;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity ?? 1, tOp, 0.06);

        /* Update HTML label position */
        if (node.labelEl) {
          const p3 = node.mesh.position.clone().project(camera);
          const lx = ((p3.x + 1) / 2) * W2;
          const ly = (-(p3.y - 1) / 2) * H2 + NODE_R * 68;
          node.labelEl.style.left = `${lx}px`;
          node.labelEl.style.top  = `${ly}px`;
          node.labelEl.style.opacity = hasAct
            ? (isAct ? "0" : "0.25")
            : "1";
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ──────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener("mousemove", onMove);
      mount.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      nodes.forEach((n) => n.labelEl?.remove());
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      sphereGeo.dispose();
      baseMat.dispose();
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

  /* ── Close handler ───────────────────────────────────────── */
  const handleClose = React.useCallback(() => {
    setActiveId(null);
    camPosRef.current.set(0, 0, 8);
    camLookRef.current.set(0, 0, 0);
  }, []);

  const active = activeId !== null ? SERVICES[activeId] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", background: "#fafafa" }}
    >
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Hero copy — visible when no card open */}
      <AnimatePresence>
        {!active && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 top-[42%] z-10 -translate-y-1/2 text-center px-6"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/35">
              Digital Services Studio
            </p>
            <h1
              className="font-display font-black tracking-[-0.05em] text-[#111]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 0.92 }}
            >
              Crafting Digital<br />Experiences.
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-black/45">
              Click any floating node to explore our services.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded service card */}
      <AnimatePresence>
        {active && (
          <ServiceCard service={active} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════════════════════════ */
function ServiceCard({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  return (
    /* Backdrop blur overlay */
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-20 flex items-center justify-center px-5"
      style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 40, rotateX: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 40, rotateX: -12 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.95)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Accent gradient top bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
        />

        <div className="p-7 sm:p-9">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="grid size-12 place-items-center rounded-2xl text-xl"
                style={{ background: `rgba(${service.rgb},0.12)` }}
              >
                {service.emoji}
              </div>
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: service.accent }}
                >
                  {service.short}
                </p>
                <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-[#111] sm:text-2xl">
                  {service.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white/80 text-black/40 backdrop-blur-sm transition-all hover:border-black/20 hover:text-black/80"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-5 text-[15px] leading-relaxed text-black/60">{service.desc}</p>

          {/* Stat highlight */}
          <div
            className="mt-6 flex items-center gap-4 rounded-2xl p-4"
            style={{ background: `rgba(${service.rgb},0.08)`, border: `1px solid rgba(${service.rgb},0.15)` }}
          >
            <span
              className="font-display text-3xl font-black tracking-tight"
              style={{ color: service.accent }}
            >
              {service.stat}
            </span>
            <span className="text-sm font-medium text-black/50">{service.statLabel}</span>
          </div>

          {/* Tech stack */}
          <div className="mt-6">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-medium text-black/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex items-center gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`,
                boxShadow: `0 4px 20px rgba(${service.rgb},0.35)`,
              }}
            >
              Start this project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={onClose}
              className="text-sm text-black/35 transition-colors hover:text-black/70"
            >
              Back to overview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
