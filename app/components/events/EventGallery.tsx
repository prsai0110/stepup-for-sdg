"use client";

import { FadeUp } from "@/app/components/site/FadeUp";
import { GALLERY } from "./eventsData";

export function EventGallery() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
              Moments
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              From our <span className="grad-text">impact gallery</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-text">
              Snapshots from classrooms, workshops, and community sessions across
              our partner network.
            </p>
          </div>
        </FadeUp>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <FadeUp key={g.src} delay={(i % 3) * 80}>
              <figure className="evt-zoomimg group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-4 text-sm font-semibold text-white">
                  {g.label}
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
