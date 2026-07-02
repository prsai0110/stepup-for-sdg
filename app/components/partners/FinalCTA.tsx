"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { AmbientBackdrop, Particles, MouseGlow, MagneticButton, Reveal } from "./primitives";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-cyan-glow/20 bg-deep-blue/40 px-6 py-20 text-center backdrop-blur-xl">
        <AmbientBackdrop dense />
        <Particles count={24} />
        <MouseGlow size={500} color="rgba(21,93,252,0.18)" />

        {/* soft spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,194,255,0.25), transparent 70%)" }}
        />

        <Reveal className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
            Ready to Build Educational Impact{" "}
            <span className="grad-text">Together?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-text">
            Join 260+ organizations turning intention into measurable outcomes for
            students across India.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <MagneticButton
                ariaLabel="Become a Partner"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan-glow px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,194,255,0.45)] transition hover:brightness-110"
              >
                Become a Partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </Link>
            <Link href="/contact">
              <MagneticButton
                ariaLabel="Schedule a Meeting"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-cyan-glow/50"
              >
                <CalendarDays className="h-4 w-4" />
                Schedule a Meeting
              </MagneticButton>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
