"use client";

import { FadeUp } from "@/app/components/site/FadeUp";
import { EVENTS } from "./eventsData";

export function EventTimeline() {
  const sorted = [...EVENTS];

  return (
    <section className="px-6 py-20 bg-deep-blue/40">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
              Roadmap
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Event <span className="grad-text">timeline</span>
            </h2>
          </div>
        </FadeUp>

        <div className="relative mt-14">
          {/* vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-8">
            {sorted.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <FadeUp key={e.id} delay={i * 60}>
                  <div
                    className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                      left ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* node */}
                    <span
                      className="absolute left-4 top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background md:left-1/2"
                      style={{ backgroundColor: e.accent }}
                    />
                    {/* spacer for desktop alternation */}
                    <div className="hidden md:block md:w-1/2" />
                    <div className="md:w-1/2 md:px-8">
                      <div className="glass lift rounded-2xl border border-border p-5">
                        <div
                          className="text-xs font-bold uppercase tracking-wide"
                          style={{ color: e.accent }}
                        >
                          {e.fullDate}
                        </div>
                        <h3 className="mt-1 font-display text-lg font-bold">
                          {e.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-text">{e.location}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
