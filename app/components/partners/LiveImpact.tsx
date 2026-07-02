"use client";

import { Reveal, CountUp, AmbientBackdrop } from "./primitives";
import { LIVE_STATS } from "./partnersData";

export function LiveImpact() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <AmbientBackdrop />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
          </span>
          Live Impact
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          Impact that <span className="grad-text">compounds</span>
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-5">
        {LIVE_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground md:text-4xl">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-cyan-glow">{s.label}</div>
              <div className="text-xs text-muted-text">{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
