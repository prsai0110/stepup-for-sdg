import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, HeartHandshake, Users } from "lucide-react";
import { SpaceBackdrop } from "@/app/components/site/SpaceBackdrop";
import { FadeUp } from "@/app/components/site/FadeUp";

export const metadata: Metadata = {
  title: "Work With Us — StepUp for SDG",
  description: "Partner with StepUp for SDG — corporates, schools, NGOs and volunteers.",
};

const sections = [
  {
    icon: Building2,
    title: "Corporate CSR Partners",
    body: "Direct your CSR investments into transparent, measurable, outcome-driven education programs.",
    href: "/get-involved/sponsor",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    body: "Get access to digital tools, infrastructure support and quality learning programs.",
    href: "/get-involved/school",
  },
  {
    icon: HeartHandshake,
    title: "NGOs",
    body: "Co-create programs on the ground and amplify your social impact with scalable systems.",
    href: "/get-involved/ngo-partner",
  },
  {
    icon: Users,
    title: "Volunteers",
    body: "Lend your skills, time and energy to build a better future for students worldwide.",
    href: "/get-involved/volunteer",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-24 px-6">
        <SpaceBackdrop />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">Join the Movement</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
              Partner With <span className="grad-text">StepUp for SDG</span>
            </h1>
            <p className="mt-6 text-muted-text max-w-2xl mx-auto">
              Whether you bring funding, classrooms, expertise or time — there&apos;s a place for you in the mission to transform education.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <FadeUp key={section.title} delay={index * 100}>
              <div className="glass rounded-2xl p-8 lift h-full">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-electric to-cyan-glow grid place-items-center shadow-[0_0_20px_rgba(0,194,255,0.4)]">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{section.title}</h3>
                <p className="mt-2 text-muted-text">{section.body}</p>
                <Link
                  href={section.href}
                  className="btn-arrow mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-glow hover:text-white transition"
                >
                  Get Started <ArrowRight className="arr h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
