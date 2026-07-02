"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { FadeUp } from "@/app/components/site/FadeUp";
import { EventFilterTabs } from "./EventFilterTabs";
import { EventGrid } from "./EventGrid";
import { EVENTS, type Filter } from "./eventsData";

const STEP = 4;

export function EventsExplorer() {
  const [active, setActive] = useState<Filter>("All Events");
  const [visible, setVisible] = useState(STEP);

  const filtered = useMemo(
    () =>
      active === "All Events"
        ? EVENTS
        : EVENTS.filter((e) => e.category === active),
    [active]
  );

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function handleFilter(f: Filter) {
    setActive(f);
    setVisible(STEP);
  }

  return (
    <section id="events" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
              Upcoming
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Browse SDG <span className="grad-text">education events</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-text">
              Filter by the kind of impact you want to create — from school
              drives to youth innovation challenges.
            </p>
          </div>
        </FadeUp>

        {/* Filter buttons hidden per request — code preserved */}
        <FadeUp delay={80}>
          <div className="mt-10 hidden">
            <EventFilterTabs active={active} onChange={handleFilter} />
          </div>
        </FadeUp>

        <div className="mt-12">
          <EventGrid events={shown} />
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisible((v) => v + STEP)}
              className="evt-glow-cool inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-semibold text-foreground hover:border-cyan-glow/50"
            >
              <Plus className="h-4 w-4" /> Load More Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
