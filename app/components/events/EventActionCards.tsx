"use client";

import { CalendarPlus, HandHeart, Building2, BadgeDollarSign, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FadeUp } from "@/app/components/site/FadeUp";

type Action = {
  Icon: LucideIcon;
  title: string;
  text: string;
  link: string;
  href: string;
  gradient: string;
};

const actions: Action[] = [
  {
    Icon: CalendarPlus,
    title: "Host an SDG Event",
    text: "Bring an education drive or workshop to your school or community.",
    link: "Start hosting",
    href: "/get-involved/host-event",
    gradient: "linear-gradient(135deg,#1f3a5f,#0066cc,#00a8a8)",
  },
  {
    Icon: HandHeart,
    title: "Volunteer With Us",
    text: "Mentor students and support learning sessions on the ground.",
    link: "Join as volunteer",
    href: "/get-involved/volunteer",
    gradient: "linear-gradient(135deg,#00a8a8,#00b050,#8cc63f)",
  },
  {
    Icon: Building2,
    title: "Partner as NGO",
    text: "Collaborate, share resources, and scale rural school support.",
    link: "Become a partner",
    href: "/get-involved/ngo-partner",
    gradient: "linear-gradient(135deg,#00b050,#0066cc,#7b61ff)",
  },
  {
    Icon: BadgeDollarSign,
    title: "Corporate CSR Funds",
    text: "Fund transparent, measurable CSR education programs.",
    link: "Apply for CSR Funds",
    href: "/get-involved/sponsor",
    gradient: "linear-gradient(135deg,#7b61ff,#0066cc,#f4b400)",
  },
];

export function EventActionCards() {
  return (
    <section id="host" className="scroll-mt-20 px-6 py-20 bg-deep-blue/40">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
              Get Involved
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Create impact <span className="grad-text">your way</span>
            </h2>
          </div>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a, i) => (
            <FadeUp key={a.title} delay={i * 80} className="h-full">
              <Link
                href={a.href}
                className="evt-tilt evt-grad-move group flex h-full flex-col rounded-3xl border border-white/15 p-7 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
                style={{ backgroundImage: a.gradient }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
                  <a.Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm text-white/85">{a.text}</p>
                <span className="btn-arrow mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  <span className="border-b border-white/60 pb-0.5 group-hover:border-white">
                    {a.link}
                  </span>
                  <ArrowRight className="arr h-4 w-4" />
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
