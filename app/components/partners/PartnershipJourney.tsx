"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Link2, Users, Rocket, LineChart } from "lucide-react";
import { Reveal } from "./primitives";
import { JOURNEY } from "./partnersData";

const STEP_ICONS = [Search, Link2, Users, Rocket, LineChart];

export function PartnershipJourney() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current || !line.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // progress line draws as the section scrolls through
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      // each step rises in
      gsap.utils.toArray<HTMLElement>(".journey-step").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          How It Works
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          The partnership journey
        </h2>
      </Reveal>

      <div ref={root} className="relative mx-auto mt-16 max-w-3xl">
        {/* track */}
        <div className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-[2px] -translate-x-1/2 bg-border md:left-1/2" />
        {/* animated progress */}
        <div
          ref={line}
          className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-electric to-cyan-glow md:left-1/2"
        />

        <div className="space-y-12">
          {JOURNEY.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            const right = i % 2 === 1;
            return (
              <div
                key={step.title}
                className={`journey-step relative flex items-start gap-6 md:w-1/2 ${
                  right ? "md:ml-auto md:flex-row" : "md:flex-row-reverse md:text-right"
                }`}
              >
                {/* node */}
                <div
                  className={`absolute left-0 top-0 z-10 grid h-14 w-14 -translate-x-0 place-items-center rounded-full border border-cyan-glow/40 bg-card shadow-[0_0_24px_rgba(0,194,255,0.35)] md:top-0 ${
                    right ? "md:-left-7" : "md:-right-7 md:left-auto"
                  }`}
                >
                  <Icon className="h-6 w-6 text-cyan-glow" />
                </div>

                <div className={`ml-20 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md md:ml-0 ${right ? "md:ml-12" : "md:mr-12"}`}>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-glow">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-text">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
