"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  BadgeCheck,
  Star,
  ArrowUpRight,
  FolderKanban,
  Mail,
} from "lucide-react";
import { Reveal, TiltCard } from "./primitives";
import {
  DIRECTORY,
  FILTERS,
  FILTER_TO_TYPE,
  type FilterKey,
  type PartnerOrg,
} from "./partnersData";

const TYPE_BADGE: Record<PartnerOrg["type"], string> = {
  School: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
  NGO: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10",
  Company: "text-rose-300 border-rose-400/40 bg-rose-400/10",
  University: "text-amber-300 border-amber-400/40 bg-amber-400/10",
};

function DirectoryCard({ org }: { org: PartnerOrg }) {
  return (
    <TiltCard className="h-full rounded-3xl">
      <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl">
        {/* gradient glass border glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,194,255,0.35), 0 24px 60px -20px rgba(0,194,255,0.35)" }}
        />

        {/* image header */}
        <div className="relative h-40 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={org.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <span
            className={`absolute bottom-3 left-4 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TYPE_BADGE[org.type]}`}
          >
            {org.type}
          </span>
          {org.tier && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              <Star className="h-3 w-3 fill-amber-300" /> {org.tier}
            </span>
          )}

          {/* hover reveal actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-card/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            {[
              { label: "View Profile", icon: ArrowUpRight },
              { label: "Projects", icon: FolderKanban },
              { label: "Contact", icon: Mail },
            ].map((a) => (
              <button
                key={a.label}
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-glow transition hover:bg-cyan-glow hover:text-background"
              >
                <a.icon className="h-3 w-3" />
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">{org.name}</h3>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-text">
                <MapPin className="h-3 w-3" /> {org.location}
              </p>
            </div>
            {org.funding && (
              <span className="shrink-0 font-display text-sm font-bold text-cta">{org.funding}</span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs">
            {org.verified && (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                <BadgeCheck className="h-4 w-4" /> Verified
              </span>
            )}
            <span className="text-muted-text">Since {org.since}</span>
          </div>

          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-text">{org.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {org.sdgs.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-deep-blue/40 px-2 py-0.5 text-[10px] font-medium text-muted-text"
              >
                SDG {s}
              </span>
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <p className="inline-flex items-center gap-1.5 text-[11px] text-muted-text">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {org.activity}
            </p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function PartnerDirectory() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DIRECTORY.filter((o) => {
      const typeOk = filter === "All" || o.type === FILTER_TO_TYPE[filter];
      const textOk =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q);
      return typeOk && textOk;
    });
  }, [query, filter]);

  return (
    <section id="partner-directory" className="relative scroll-mt-24 px-6 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          Partner Directory
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          Explore our <span className="grad-text">verified network</span>
        </h2>
      </Reveal>

      {/* floating search + filters */}
      <div className="sticky top-24 z-30 mx-auto mt-10 max-w-5xl">
        <div className="glass flex flex-col items-stretch gap-3 rounded-2xl p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] md:flex-row md:items-center md:justify-between">
          <label className="relative flex flex-1 items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-text" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or city…"
              aria-label="Search partners by name or city"
              className="w-full rounded-xl border border-border bg-background/40 py-2.5 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-text focus:border-cyan-glow/50"
            />
          </label>

          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const activeF = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="relative rounded-full px-4 py-2 text-xs font-semibold transition"
                  style={{ color: activeF ? "#fff" : "var(--muted-text)" }}
                >
                  {activeF && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-electric to-cyan-glow"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="mx-auto mt-10 max-w-7xl">
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((org, i) => (
              <motion.div
                key={org.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <DirectoryCard org={org} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {results.length === 0 && (
          <p className="mt-16 text-center text-muted-text">
            No partners match your search yet. Try a different name or filter.
          </p>
        )}
      </div>
    </section>
  );
}
