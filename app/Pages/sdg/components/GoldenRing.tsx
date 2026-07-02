"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  isActive: boolean;
  reduceMotion: boolean;
};

export default function GoldenRing({ isActive, reduceMotion }: Props) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[34%] w-[132%] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transform-gpu"
      initial={{ opacity: 0, scale: 0.74, y: 18, rotate: -6 }}
      animate={
        isActive
          ? {
              opacity: reduceMotion ? 0.85 : [0, 1, 0],
              scale: reduceMotion ? 1 : [0.78, 1.02, 1.34],
              y: reduceMotion ? 0 : [18, 0, -10],
              rotate: reduceMotion ? 0 : [-4, 1, 4],
              transition: { delay: 0.3, duration: 1.45, ease: [0.22, 1, 0.36, 1] },
            }
          : {
              opacity: 0,
              scale: 0.74,
              y: 18,
              rotate: -6,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
    >
      <Image
        alt="Golden transition energy ring"
        className="object-contain brightness-125 saturate-150"
        fill
        sizes="(max-width: 640px) 96vw, (max-width: 1024px) 78vw, 40rem"
        src="/sdgring.png"
      />
    </motion.div>
  );
}
