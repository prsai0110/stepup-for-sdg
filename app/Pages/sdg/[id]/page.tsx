import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getSdgById, sdgs, withAlpha } from "../data/sdgs";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return sdgs.map((sdg) => ({
    id: String(sdg.id),
  }));
}

export default async function SDGDetailPage({ params }: PageProps) {
  const { id } = await params;
  const goalId = Number(id);

  if (!Number.isInteger(goalId)) {
    notFound();
  }

  const sdg = getSdgById(goalId);

  if (!sdg) {
    notFound();
  }

  const imagePath = `/sdg/goal-${String(sdg.id).padStart(2, "0")}.png`;
  const officialUnUrl = `https://sdgs.un.org/goals/goal${sdg.id}`;

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white sm:px-8 lg:px-12" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <style>
        {`
          @keyframes sdgInfoFadeInUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(45,212,191,0.16),transparent_32%)] dark:opacity-100 opacity-40" />
      <div className="absolute inset-0 opacity-30 dark:opacity-50 [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <Link
          className="mb-8 inline-flex w-fit rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold backdrop-blur-md transition hover:border-cyan-200/60 hover:bg-white/12" style={{ color: "var(--foreground)" }}
          href="/Pages/sdg"
        >
          Back to Goals
        </Link>

        <section
          className="grid items-center gap-10 rounded-lg border border-white/12 bg-white/8 p-5 shadow-[0_28px_80px_-44px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
          style={{ boxShadow: `0 28px 90px -46px ${withAlpha(sdg.color, 0.78)}` }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-[0_22px_52px_-28px_rgba(0,0,0,0.9)]">
            <Image
              alt={`SDG Goal ${sdg.id}: ${sdg.title}`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 24rem"
              src={imagePath}
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-500">
              Goal Number {sdg.id}
            </p>
            <h1 className="mt-5 text-balance text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-none" style={{ color: "var(--foreground)" }}>
              {sdg.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: "var(--muted-text)" }}>
              Detailed information about SDG Goal {sdg.id}.
            </p>

            <div className="mt-8 rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-8 shadow-[0_24px_80px_-32px_rgba(56,189,248,0.72)] backdrop-blur-xl [animation:sdgInfoFadeInUp_700ms_ease-out_160ms_both]">
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>About this Goal</h2>
              <p className="mt-4 text-base leading-8" style={{ color: "var(--muted-text)" }}>
                This Sustainable Development Goal focuses on improving global conditions and encouraging collective
                action. 
              </p>

              <a
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 px-5 py-3 text-center text-sm font-bold leading-5 text-white shadow-[0_16px_42px_-18px_rgba(56,189,248,0.9)] transition duration-300 hover:shadow-[0_18px_54px_-16px_rgba(56,189,248,1)] sm:w-fit sm:px-6"
                href={officialUnUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Visit Official UN SDG Page</span>
                <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
