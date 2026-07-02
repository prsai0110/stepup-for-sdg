import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { stories } from "@/app/data/stories";

export const metadata = {
  title: "Success Stories — StepUp for SDG",
  description: "Real outcomes from our education impact programmes across India.",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen py-20 px-6" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--cyan-glow)" }}>
            Real Outcomes
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold" style={{ color: "var(--foreground)" }}>
            Success Stories
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted-text)" }}>
            From renovated classrooms to digital access — see how our partnerships create lasting change.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <Link key={s.slug} href={`/stories/${s.slug}`} className="group rounded-2xl overflow-hidden flex flex-col lift transition-all duration-300"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.after} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,194,255,0.15)", color: "var(--cyan-glow)", border: "1px solid var(--cyan-glow)" }}>
                  {s.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: "var(--muted-text)" }}>{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs" style={{ color: "var(--muted-text)" }}>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{s.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{s.date}</span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--cyan-glow)" }}>
                  Read story <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
