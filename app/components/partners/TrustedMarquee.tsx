"use client";

import { Reveal } from "./primitives";
import { LOGOS } from "./partnersData";

export function TrustedMarquee() {
  const row = [...LOGOS, ...LOGOS]; // duplicate for seamless -50% loop

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <Reveal className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-text">
          Trusted by Leading Organizations
        </span>
      </Reveal>

      <div className="group relative mt-10">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee group-hover:[animation-play-state:paused]">
          {row.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="grid h-16 w-40 shrink-0 place-items-center rounded-2xl border border-border bg-card/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/40 hover:shadow-[0_0_24px_rgba(0,194,255,0.25)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-9 max-w-[70%] object-contain opacity-70 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
