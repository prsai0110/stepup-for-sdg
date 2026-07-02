"use client";

import { FadeUp } from "@/app/components/site/FadeUp";
import { EventCard } from "./EventCard";
import type { SdgEvent } from "./eventsData";

export function EventGrid({ events }: { events: SdgEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="py-16 text-center text-muted-text">
        No events in this category yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
      {events.map((event, i) => (
        <FadeUp key={event.id} delay={(i % 2) * 90} className="h-full">
          <EventCard event={event} />
        </FadeUp>
      ))}
    </div>
  );
}
