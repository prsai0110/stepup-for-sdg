"use client";

import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { FadeUp } from "@/app/components/site/FadeUp";
import { EVENTS, FEATURED_ID } from "./eventsData";

const speakers = [
  { name: "Aarav", color: "#0066cc" },
  { name: "Priya", color: "#00a8a8" },
  { name: "Neha", color: "#00b050" },
  { name: "Rohan", color: "#7b61ff" },
  { name: "Diya", color: "#f4b400" },
];

const partners = ["EduTrust", "GreenFund CSR", "BrightFuture NGO", "TechForAll"];

export function FeaturedEvent() {
  const event = EVENTS.find((e) => e.id === FEATURED_ID)!;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div className="evt-tilt glass relative grid overflow-hidden rounded-[2rem] border border-border lg:grid-cols-2">
            {/* Image side */}
            <div className="evt-zoomimg relative min-h-[260px] overflow-hidden lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1426]/80 lg:to-[#0B1426]" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#f4b400] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#1f3a5f] shadow-lg">
                ★ Featured Event
              </span>
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                <Clock className="h-4 w-4 text-[#8cc63f]" /> Starts in 51 days
              </span>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="text-xs uppercase tracking-[0.22em] text-cyan-glow">
                Youth Challenges · SDG 4
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight md:text-4xl">
                {event.title}
              </h2>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-text">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-[#00a8a8]" /> {event.fullDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#00b050]" /> {event.location}
                </span>
              </div>

              <p className="mt-4 text-muted-text">{event.description}</p>

              {/* Speakers */}
              <div className="mt-7 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {speakers.map((s) => (
                    <span
                      key={s.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card text-sm font-bold text-white"
                      style={{ backgroundColor: s.color }}
                      title={s.name}
                    >
                      {s.name[0]}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-text">
                  12+ student innovators &amp; mentors
                </span>
              </div>

              {/* Partners */}
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-text">
                  In partnership with
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {partners.map((p) => (
                    <span
                      key={p}
                      className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className="evt-glow btn-arrow inline-flex items-center gap-2 rounded-full bg-[#ff7a00] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(255,122,0,0.45)]"
                >
                  Register Now <ArrowRight className="arr h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
