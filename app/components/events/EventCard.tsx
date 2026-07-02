"use client";

import { MapPin, ArrowUpRight, Share2 } from "lucide-react";
import type { SdgEvent } from "./eventsData";

export function EventCard({ event }: { event: SdgEvent }) {
  return (
    <article
      className="evt-tilt group glass flex h-full flex-col overflow-hidden rounded-3xl border border-border"
      style={{ ["--sdg" as string]: event.accent }}
    >
      {/* Image + date badge */}
      <div className="evt-zoomimg relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div
          className="absolute left-4 top-4 flex flex-col items-center rounded-2xl px-3 py-2 text-white shadow-lg backdrop-blur"
          style={{ backgroundColor: event.accent }}
        >
          <span className="text-lg font-bold leading-none">{event.day}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {event.month}
          </span>
        </div>

        <span className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {event.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-foreground">
          {event.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-text">
          <MapPin className="h-4 w-4" style={{ color: event.accent }} />
          {event.location}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-text">
          {event.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
              style={{
                borderColor: `${event.accent}55`,
                color: event.accent,
                backgroundColor: `${event.accent}12`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-3 text-muted-text">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://stepupforsdg.org/events/${event.id}`)}`}
              target="_blank" rel="noopener noreferrer"
              aria-label="Share on LinkedIn" className="transition hover:text-cyan-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a
              href="https://www.instagram.com/stepupforsdg"
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="transition hover:text-cyan-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(event.title + ' - StepUp for SDG')}`}
              target="_blank" rel="noopener noreferrer"
              aria-label="Share" className="transition hover:text-cyan-glow">
              <Share2 className="h-4 w-4" />
            </a>
          </div>

          <a
            href={`/events/${event.id}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-arrow inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ backgroundColor: event.accent }}
          >
            View Details & Register
            <ArrowUpRight className="arr h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
