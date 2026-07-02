"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type SDG, withAlpha } from "../data/sdgs";

type Props = {
  index: number;
  isVisible: boolean;
  reduceMotion: boolean;
  sdg: SDG;
};

export default function SDGCard({ index, isVisible, reduceMotion, sdg }: Props) {
  const imagePath = `/sdg/goal-${String(sdg.id).padStart(2, "0")}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 50 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 50 }}
      transition={{
        delay: isVisible && !reduceMotion ? index * 0.05 : 0,
        duration: reduceMotion ? 0.1 : 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.055,
              y: -8,
              boxShadow: `0 24px 42px -18px ${withAlpha(sdg.color, 0.92)}`,
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className="transform-gpu will-change-transform"
    >
      <Link
        aria-label={`Open SDG Goal ${sdg.id}: ${sdg.title}`}
        className="group relative block aspect-square overflow-hidden rounded-lg border border-white/12 bg-white/8 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.85)] outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-cyan-200/80"
        href={`/Pages/sdg/${sdg.id}`}
      >
        <Image
          alt={`SDG Goal ${sdg.id}: ${sdg.title}`}
          className="object-cover transition duration-300 group-hover:brightness-110"
          fill
          sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 15rem"
          src={imagePath}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 2px ${withAlpha(sdg.color, 0.72)}, 0 0 34px ${withAlpha(sdg.color, 0.55)}` }}
        />
      </Link>
    </motion.div>
  );
}
