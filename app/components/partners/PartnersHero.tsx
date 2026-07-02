"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Compass, Building2, GraduationCap, HeartHandshake, FolderKanban, School } from "lucide-react";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { AmbientBackdrop, Particles, MouseGlow, MagneticButton, CountUp } from "./primitives";
import { HERO_METRICS } from "./partnersData";

const METRIC_ICONS = [School, Building2, HeartHandshake, FolderKanban, GraduationCap];

function scrollToDirectory() {
  document.getElementById("partner-directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PartnersHero() {
  const reduce = useReducedMotion();
  const n = HERO_METRICS.length;
  const radius = 190;

  return (
    <section className="relative isolate overflow-hidden px-6 pt-28 pb-24 md:pt-32 md:pb-32">
      <AmbientBackdrop dense />
      <Particles count={30} />
      <MouseGlow size={640} />

      {/* light rays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {[15, 0, -15].map((rot, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-[-20%] h-[140%] w-[2px] origin-top"
            style={{
              rotate: rot,
              background: "linear-gradient(180deg, rgba(0,194,255,0.25), transparent 70%)",
            }}
            animate={reduce ? undefined : { opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left */}
        <div>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-glow"
          >
            <HiOutlineGlobeAlt className="h-4 w-4" />
            India&apos;s SDG Partnership Network
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl"
          >
            Building Educational <span className="grad-text">Partnerships</span> That Transform Communities.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-text md:text-lg"
          >
            Connecting schools, NGOs, companies and universities to create
            measurable impact across the 17 UN SDGs. Every partnership creates a
            ripple.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link href="/contact">
              <MagneticButton
                ariaLabel="Become a Partner"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan-glow px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,194,255,0.45)] transition hover:brightness-110"
              >
                Become a Partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </Link>
            <MagneticButton
              ariaLabel="Explore Ecosystem"
              onClick={scrollToDirectory}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-cyan-glow/50"
            >
              <Compass className="h-4 w-4" />
              Explore Ecosystem
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — orbiting metric visualization (desktop) */}
        <div className="relative hidden h-[520px] items-center justify-center lg:flex">
          {/* rotating ring */}
          <div className="absolute h-[420px] w-[420px] rounded-full border border-cyan-glow/15" />
          <div className="absolute h-[300px] w-[300px] rounded-full border border-electric/15" />

          <motion.div
            className="relative h-[420px] w-[420px]"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          >
            {HERO_METRICS.map((m, i) => {
              const angle = (i * 360) / n;
              const Icon = METRIC_ICONS[i % METRIC_ICONS.length];
              return (
                <div
                  key={m.label}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg) translate(-50%, -50%)`,
                  }}
                >
                  <motion.div
                    animate={reduce ? undefined : { rotate: -360 }}
                    transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="glass w-[150px] rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan-glow">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="font-display text-2xl font-bold text-foreground">
                        <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-glow">
                        {m.label}
                      </div>
                      <div className="text-[10px] text-muted-text">{m.sub}</div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* center logo */}
          <div className="absolute grid h-32 w-32 place-items-center rounded-full bg-white shadow-[0_0_50px_rgba(0,194,255,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/SDG_LOGO-removebg-preview.png"
              alt="StepUp for SDG"
              className="h-28 w-28 object-contain"
            />
          </div>
        </div>

        {/* Right — static metric grid (mobile/tablet) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
          {HERO_METRICS.map((m, i) => {
            const Icon = METRIC_ICONS[i % METRIC_ICONS.length];
            return (
              <div key={m.label} className="glass rounded-2xl p-4">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan-glow">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-glow">
                  {m.label}
                </div>
                <div className="text-[10px] text-muted-text">{m.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
