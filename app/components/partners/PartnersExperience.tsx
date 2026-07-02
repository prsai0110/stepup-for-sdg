"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PartnersHero } from "./PartnersHero";
import { EcosystemFlow } from "./EcosystemFlow";
import { PartnerDirectory } from "./PartnerDirectory";
import { TrustedMarquee } from "./TrustedMarquee";
import { WhyPartner } from "./WhyPartner";
import { PartnershipJourney } from "./PartnershipJourney";
import { LiveImpact } from "./LiveImpact";
import { FinalCTA } from "./FinalCTA";

export function PartnersExperience() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduce) {
      // No smooth-scroll / inertia when the user prefers reduced motion.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync GSAP ScrollTrigger with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="overflow-x-clip">
      <PartnersHero />
      <EcosystemFlow />
      <PartnerDirectory />
      <TrustedMarquee />
      <WhyPartner />
      <PartnershipJourney />
      <LiveImpact />
      <FinalCTA />
    </div>
  );
}
