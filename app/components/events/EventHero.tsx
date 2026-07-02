"use client";

import { GraduationCap, Users, Sparkles, HeartHandshake, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

const floatIcons = [
  { Icon: GraduationCap, cls: "f2 left-[6%] top-[22%]", color: "#00a8a8" },
  { Icon: Users, cls: "f3 right-[8%] top-[18%]", color: "#8cc63f" },
  { Icon: BookOpen, cls: "f4 left-[12%] bottom-[20%]", color: "#f4b400" },
  { Icon: HeartHandshake, cls: "f5 right-[10%] bottom-[24%]", color: "#7b61ff" },
  { Icon: Sparkles, cls: "f2 left-[46%] top-[10%]", color: "#00b050" },
];

export function EventHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=2000&q=80"
          alt="Students and volunteers collaborating in a learning workshop"
          className="evt-zoom h-full w-full object-cover"
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-[#050B18]/75 to-[#050B18]" />

      {/* Floating SDG icons */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {floatIcons.map(({ Icon, cls, color }, i) => (
          <span
            key={i}
            className={`evt-float ${cls} absolute flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md`}
            style={{ color }}
          >
            <Icon className="h-5 w-5" />
          </span>
        ))}
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center sm:py-28 lg:py-36">
        {/* Overlapping gradient glass card */}
        <div
          className="evt-card-rise relative w-full overflow-hidden rounded-[2rem] border border-white/15 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:p-12 lg:p-16"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(31,58,95,0.92) 0%, rgba(0,102,204,0.88) 30%, rgba(0,168,168,0.85) 58%, rgba(0,176,80,0.82) 80%, rgba(123,97,255,0.88) 100%)",
          }}
        >
          {/* soft sheen */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#8cc63f]/25 blur-3xl" />

          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> StepUp for SDG
          </span>

          <h1 className="evt-track mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            SDG EVENTS &amp; IMPACT SESSIONS
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Join education drives, school innovation workshops, NGO collaborations,
            CSR partner meets, and youth-led SDG action events that create
            measurable impact.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#events"
              className="evt-glow inline-flex items-center justify-center gap-2 rounded-full bg-[#ff7a00] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(255,122,0,0.45)]"
            >
              Explore Events <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/get-involved/host-event"
              className="evt-glow-cool inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Host an Event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
