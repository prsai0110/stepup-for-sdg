"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import { sdgs } from "../data/sdgs";
import SDGCard from "./SDGCard";

type Props = {
  isVisible: boolean;
  reduceMotion: boolean;
  sectionRef: RefObject<HTMLElement | null>;
};

export default function SDGGrid({ isVisible, reduceMotion, sectionRef }: Props) {
  return (
    <motion.section
      ref={sectionRef}
      aria-hidden={!isVisible}
      className="relative z-20 min-h-screen overflow-hidden px-4 pb-20 pt-0 sm:px-6 lg:px-10"
      id="goals"
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 40 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <h2 className="sr-only">Sustainable Development Goal cards</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {sdgs.map((sdg, index) => (
            <SDGCard key={sdg.id} index={index} isVisible={isVisible} reduceMotion={reduceMotion} sdg={sdg} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
