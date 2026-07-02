"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

/* ----------------------------------------------------------------------------
   MouseGlow — a soft radial glow that follows the cursor across a section.
   Place inside a `relative` container; it is absolutely positioned + pointer-none.
---------------------------------------------------------------------------- */
export function MouseGlow({
  size = 600,
  color = "rgba(0,194,255,0.10)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 30, mass: 0.6 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current?.parentElement;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
    function onLeave() {
      x.set(-9999);
      y.set(-9999);
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute z-0 rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}

/* ----------------------------------------------------------------------------
   MagneticButton — element drifts slightly toward the cursor on hover.
---------------------------------------------------------------------------- */
export function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  onClick,
  style,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ----------------------------------------------------------------------------
   TiltCard — 3D tilt toward cursor + a spotlight that tracks the pointer.
---------------------------------------------------------------------------- */
export function TiltCard({
  children,
  className = "",
  max = 8,
  spotlight = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  spotlight?: boolean;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    setSpot({ x: px * 100, y: py * 100, on: true });
  }
  function reset() {
    rx.set(0);
    ry.set(0);
    setSpot((s) => ({ ...s, on: false }));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative ${className}`}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: spot.on ? 1 : 0,
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(0,194,255,0.14), transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
   CountUp — animates a number from 0 → value when it scrolls into view.
---------------------------------------------------------------------------- */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const formatted =
    value >= 1000
      ? Math.round(display).toLocaleString("en-IN")
      : Math.round(display).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   Reveal — lightweight framer-motion scroll reveal with stagger support.
---------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
   AmbientBackdrop — animated gradient mesh + floating orbs (CSS/framer based).
   prefers-reduced-motion: orbs render static.
---------------------------------------------------------------------------- */
export function AmbientBackdrop({ dense = false }: { dense?: boolean }) {
  const reduce = useReducedMotion();
  const orbs = [
    { c: "rgba(21,93,252,0.30)", s: 520, top: "-10%", left: "-8%", d: 18 },
    { c: "rgba(0,194,255,0.22)", s: 420, top: "30%", left: "70%", d: 22 },
    { c: "rgba(0,176,80,0.16)", s: 360, top: "70%", left: "10%", d: 26 },
  ];
  if (dense) orbs.push({ c: "rgba(245,166,35,0.14)", s: 300, top: "60%", left: "85%", d: 20 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* gradient mesh */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(21,93,252,0.18), transparent 60%), radial-gradient(50% 50% at 100% 100%, rgba(0,194,255,0.12), transparent 60%)",
        }}
      />
      {orbs.map((o, i) =>
        reduce ? (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ width: o.s, height: o.s, top: o.top, left: o.left, background: `radial-gradient(circle, ${o.c}, transparent 70%)` }}
          />
        ) : (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ width: o.s, height: o.s, top: o.top, left: o.left, background: `radial-gradient(circle, ${o.c}, transparent 70%)` }}
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Particles — small floating dots drifting upward (pure CSS transforms).
---------------------------------------------------------------------------- */
export function Particles({ count = 26 }: { count?: number }) {
  const reduce = useReducedMotion();
  // deterministic pseudo-random so SSR/CSR match (no Math.random at module load)
  const dots = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const r2 = ((i * 4099 + 7919) % 233280) / 233280;
    return {
      left: `${Math.round(r * 100)}%`,
      top: `${Math.round(r2 * 100)}%`,
      size: 1 + Math.round(r2 * 2),
      dur: 8 + Math.round(r * 10),
      delay: Math.round(r2 * 6),
    };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) =>
        reduce ? (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-glow/40"
            style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          />
        ) : (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan-glow/50"
            style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
            animate={{ y: [0, -40, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
          />
        )
      )}
    </div>
  );
}
