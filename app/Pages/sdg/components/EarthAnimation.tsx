"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  isLaunching: boolean;
  onExplore: () => void;
  reduceMotion: boolean;
};

export default function EarthAnimation({ isLaunching, onExplore, reduceMotion }: Props) {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center gap-8">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[min(72vh,46rem)] w-[min(72vh,46rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl"
        initial={false}
        animate={isLaunching ? { opacity: 0.95, scale: reduceMotion ? 1 : 1.22 } : { opacity: 0.45, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.65, delay: isLaunching ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Text above globe */}
      <motion.div
        className="pointer-events-none z-30 space-y-3 text-center"
        initial={false}
        animate={isLaunching ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.38, delay: isLaunching ? 0.1 : 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-bold uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,1)]">
          StepUp for SDg
        </h1>
        <p className="text-[clamp(0.85rem,1.6vw,1.1rem)] font-medium tracking-wide text-cyan-200 drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
          Educating Students on UN Sustainable Development Goals
        </p>
        <p className="text-[clamp(0.75rem,1.2vw,0.95rem)] tracking-widest text-white/60">
          17 Goals · One Shared Future
        </p>
      </motion.div>

      {/* Globe */}
      <motion.button
        aria-label="Explore the Sustainable Development Goals"
        className="group relative flex h-[clamp(20rem,52vw,35rem)] w-[clamp(20rem,52vw,35rem)] items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/90 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020617] transform-gpu"
        disabled={isLaunching}
        initial={false}
        onClick={onExplore}
        animate={
          isLaunching
            ? {
                scale: reduceMotion ? 1.02 : [1, 1, 1.08, 1.62],
                transition: { duration: reduceMotion ? 0.2 : 0.95, times: [0, 0.3, 0.55, 1], ease: [0.22, 1, 0.36, 1] },
              }
            : { scale: 1 }
        }
        whileHover={!isLaunching && !reduceMotion ? { scale: 1.015 } : undefined}
        whileTap={!isLaunching ? { scale: 0.985 } : undefined}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-[2%] z-20 transform-gpu will-change-transform"
          initial={false}
          animate={
            isLaunching
              ? {
                  opacity: reduceMotion ? 0 : [1, 1, 0],
                  scale: reduceMotion ? 1 : [1, 1.02, 1.08],
                  transition: { duration: reduceMotion ? 0.2 : 0.78, times: [0, 0.5, 1], ease: "easeInOut" },
                }
              : { opacity: 1, scale: 1 }
          }
        >
          <Image
            alt=""
            className="object-contain animate-rotate-sdg-ring"
            fill
            priority
            sizes="(max-width: 768px) 92vw, 35rem"
            src="/sdgring.png"
          />
        </motion.div>

        <div className="relative z-10 aspect-square w-[75%] overflow-hidden rounded-full shadow-[0_0_58px_rgba(56,189,248,0.38)] transform-gpu animate-rotate-earth will-change-transform">
          <Image
            alt="Rotating Earth"
            className="object-cover object-center scale-[1.28]"
            fill
            priority
            sizes="(max-width: 768px) 72vw, 27rem"
            src="/earth.png"
          />
        </div>
      </motion.button>
    </div>
  );
}
