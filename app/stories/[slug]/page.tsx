"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState, use } from "react";
import { stories } from "@/app/data/stories";

function Slider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative h-80 rounded-2xl overflow-hidden select-none w-full" style={{ border: "1px solid var(--border)" }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt="after" className="w-full h-full object-cover" />
        <span className="absolute top-3 right-4 text-[11px] font-semibold tracking-wider text-white bg-black/50 px-2.5 py-1 rounded">AFTER</span>
      </div>
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="before" className="h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
        <span className="absolute top-3 left-4 text-[11px] font-semibold tracking-wider text-white bg-black/50 px-2.5 py-1 rounded">BEFORE</span>
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,194,255,0.8)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-white grid place-items-center text-sm font-bold shadow-lg"
          style={{ color: "#050B18" }}>⇆</div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" aria-label="Before/after slider" />
    </div>
  );
}

export default function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <main className="min-h-screen py-20 px-6" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-4xl">
        <Link href="/stories" className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80 transition" style={{ color: "var(--muted-text)" }}>
          <ArrowLeft className="h-4 w-4" /> Back to all stories
        </Link>

        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(0,194,255,0.12)", color: "var(--cyan-glow)", border: "1px solid var(--cyan-glow)" }}>
          {story.tag}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold" style={{ color: "var(--foreground)" }}>{story.title}</h1>
        <div className="mt-3 flex flex-wrap gap-4 text-sm" style={{ color: "var(--muted-text)" }}>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{story.location}</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{story.date}</span>
        </div>

        <div className="mt-8">
          <Slider before={story.before} after={story.after} />
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {story.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl p-5 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--cyan-glow)" }}>{stat.value}</div>
              <div className="mt-1 text-xs" style={{ color: "var(--muted-text)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base leading-8" style={{ color: "var(--muted-text)" }}>{story.full}</p>

        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--foreground)" }}>More Stories</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} href={`/stories/${s.slug}`} className="group rounded-2xl overflow-hidden flex flex-col lift transition-all duration-300"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.after} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed flex-1" style={{ color: "var(--muted-text)" }}>{s.body}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--cyan-glow)" }}>
                    Read <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
