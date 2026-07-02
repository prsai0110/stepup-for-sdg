import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./FadeUp";

export function VisionBanner() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{
              background: "linear-gradient(135deg, #060d2e 0%, #0a2a7a 50%, #004466 100%)",
              boxShadow: "0 20px 60px rgba(6,13,46,0.45)",
            }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/70">
              United for Tomorrow
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
              UNITE 2030 Vision
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-white/70">
              Building a future through collaboration, education, innovation and community-driven impact.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/partners"
                className="btn-arrow inline-flex items-center gap-2 bg-white text-[#155DFC] font-semibold rounded-full px-6 py-3 hover:brightness-95 transition"
              >
                Become a Partner <ArrowRight className="arr h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/40 text-white rounded-full px-6 py-3 hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
