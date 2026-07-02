"use client";

import Link from "next/link";
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Check,
  ArrowRight,
  BarChart3,
  Users,
  Megaphone,
} from "lucide-react";
import { Reveal, TiltCard } from "./primitives";
import { WHY_PARTNER, PARTNERSHIP_MODELS, type BenefitCard, type PartnershipModel } from "./partnersData";

function BenefitIcon({ icon }: { icon: BenefitCard["icon"] }) {
  const cls = "h-6 w-6 text-white";
  if (icon === "company") return <Building2 className={cls} />;
  if (icon === "school") return <GraduationCap className={cls} />;
  return <HeartHandshake className={cls} />;
}

function ModelIcon({ icon }: { icon: PartnershipModel["icon"] }) {
  const cls = "h-5 w-5 text-cyan-glow";
  if (icon === "sponsorship") return <BarChart3 className={cls} />;
  if (icon === "cohosted") return <Users className={cls} />;
  return <Megaphone className={cls} />;
}

export function WhyPartner() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          Join the Ecosystem
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          Partner with <span className="grad-text">StepUp SDG</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-text">
          Whether you&apos;re a company with a CSR mandate, a school with motivated
          students, or an NGO with a program to scale — there&apos;s a place for you
          here.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3">
        {WHY_PARTNER.map((card, i) => (
          <Reveal key={card.key} delay={i * 0.1} className="h-full">
            <TiltCard max={6} className="h-full rounded-3xl">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl transition-colors hover:border-cyan-glow/40">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: card.gradient }}
                />
                {/* glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(0,194,255,0.35), transparent 70%)" }}
                />

                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-cyan-glow shadow-[0_0_24px_rgba(0,194,255,0.4)]">
                    <BenefitIcon icon={card.icon} />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-foreground">{card.title}</h3>

                  <ul className="mt-5 space-y-3">
                    {card.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-text">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-glow transition hover:text-foreground"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Partnership models */}
      <div className="mx-auto mt-10 max-w-7xl">
        <Reveal className="rounded-3xl border border-border bg-deep-blue/30 p-8 backdrop-blur-md">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-text">
            Partnership Models
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {PARTNERSHIP_MODELS.map((m) => (
              <div key={m.title} className="rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-cyan-glow/30">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10">
                  <ModelIcon icon={m.icon} />
                </div>
                <h4 className="mt-4 font-semibold text-foreground">{m.title}</h4>
                <p className="mt-1.5 text-sm text-muted-text">{m.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
