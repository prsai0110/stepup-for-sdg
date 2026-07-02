import { ArrowRight, Building2, GraduationCap, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { FadeUp } from "./FadeUp";

const cards = [
  {
    icon: Building2,
    title: "Companies",
    body: "Channel CSR funding into transparent, measurable education programs and track impact in real time.",
    cta: "Explore Partnership",
    href: "/partners",
    gradient: "linear-gradient(135deg,#155DFC,#00C2FF)",
    glow: "rgba(21,93,252,0.25)",
  },
  {
    icon: GraduationCap,
    title: "Schools / Universities / Colleges",
    body: "Join our network to access resources, infrastructure support and quality learning programs.",
    cta: "Join as School",
    href: "/get-involved/school",
    gradient: "linear-gradient(135deg,#00A8A8,#00B050)",
    glow: "rgba(0,168,168,0.25)",
  },
  {
    icon: HeartHandshake,
    title: "NGOs",
    body: "Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.",
    cta: "Collaborate Now",
    href: "/get-involved/ngo-partner",
    gradient: "linear-gradient(135deg,#FF7A00,#FFB070)",
    glow: "rgba(255,122,0,0.25)",
  },
];

export function PartnerCards() {
  return (
    <section className="relative pb-24 pt-6 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--cyan-glow)" }}>
              Work With Us
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
              Three ways to make impact together
            </h2>
          </div>
        </FadeUp>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 120}>
              <div
                className="rounded-2xl p-7 h-full flex flex-col lift transition-all duration-300"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <h3 className="mt-5 text-xl font-semibold" style={{ color: "var(--foreground)" }}>{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: "var(--muted-text)" }}>
                  {c.body}
                </p>
                <Link
                  href={c.href}
                  className="btn-arrow mt-6 text-sm font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: "var(--cyan-glow)" }}
                >
                  {c.cta} <ArrowRight className="arr h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
