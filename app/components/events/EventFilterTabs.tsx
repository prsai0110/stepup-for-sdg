"use client";

import { FILTERS, type Filter } from "./eventsData";

export function EventFilterTabs({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`evt-pill rounded-full border px-5 py-2 text-sm font-semibold ${
              isActive
                ? "border-transparent bg-electric text-white shadow-[0_0_22px_rgba(21,93,252,0.45)]"
                : "border-border bg-card/60 text-muted-text hover:text-foreground"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
