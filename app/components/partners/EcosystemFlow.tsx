"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Home, Heart, Building2, GraduationCap } from "lucide-react";
import { Reveal } from "./primitives";
import { ECOSYSTEM, type EcoNode } from "./partnersData";

function NodeIcon({ icon, color }: { icon: EcoNode["icon"]; color: string }) {
  const cls = "h-6 w-6";
  if (icon === "school") return <Home className={cls} style={{ color }} />;
  if (icon === "ngo") return <Heart className={cls} style={{ color }} />;
  if (icon === "company") return <Building2 className={cls} style={{ color }} />;
  if (icon === "university") return <GraduationCap className={cls} style={{ color }} />;
  // hub = the StepUp logo
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/assets/SDG_LOGO-removebg-preview.png" alt="StepUp SDG" className="h-10 w-10 object-contain" />
  );
}

export function EcosystemFlow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          Our Partnership Ecosystem
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          Together, we create lasting change
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-text">
          Each partner plays a distinct role, working toward the same goals.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-16 max-w-6xl">
        {/* animated connection line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden md:block">
          <div className="mx-auto h-[2px] w-[82%] overflow-hidden rounded-full bg-border">
            {!reduce && (
              <motion.div
                className="h-full w-1/3 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00C2FF, #155DFC, transparent)",
                }}
                animate={{ x: ["-120%", "420%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-5 md:gap-y-0">
          {ECOSYSTEM.map((node, i) => {
            const isHub = node.icon === "hub";
            return (
              <Reveal
                key={node.key}
                delay={i * 0.08}
                className="flex flex-col items-center text-center"
              >
                <motion.button
                  type="button"
                  onHoverStart={() => setActive(node.key)}
                  onHoverEnd={() => setActive(null)}
                  onFocus={() => setActive(node.key)}
                  onBlur={() => setActive(null)}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`${node.label}: ${node.blurb}`}
                  className="relative grid place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow"
                  style={{ width: isHub ? 92 : 76, height: isHub ? 92 : 76 }}
                >
                  {/* pulse ring */}
                  {!reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${node.color}` }}
                      animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    />
                  )}
                  <span
                    className="grid h-full w-full place-items-center rounded-full border backdrop-blur-md"
                    style={{
                      borderColor: `${node.color}55`,
                      background: isHub
                        ? "#fff"
                        : `radial-gradient(circle at 30% 30%, ${node.color}22, rgba(11,20,38,0.6))`,
                      boxShadow: active === node.key ? `0 0 28px ${node.color}aa` : `0 0 14px ${node.color}33`,
                    }}
                  >
                    <NodeIcon icon={node.icon} color={node.color} />
                  </span>

                  {/* tooltip */}
                  <span
                    role="status"
                    className="pointer-events-none absolute -bottom-2 left-1/2 z-20 w-44 -translate-x-1/2 translate-y-full rounded-xl border border-border bg-card/95 px-3 py-2 text-[11px] text-muted-text shadow-xl backdrop-blur-md transition-all duration-200"
                    style={{ opacity: active === node.key ? 1 : 0, transform: `translate(-50%, ${active === node.key ? "110%" : "120%"})` }}
                  >
                    {node.blurb}
                  </span>
                </motion.button>

                <h3
                  className="mt-4 font-semibold"
                  style={{ color: isHub ? "var(--cyan-glow)" : "var(--foreground)" }}
                >
                  {node.label}
                </h3>
                <p className="mt-1 max-w-[150px] text-xs text-muted-text">{node.blurb}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
