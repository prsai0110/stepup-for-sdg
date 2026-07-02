"use client";

import { motion } from "framer-motion";

type Props = {
  isActive: boolean;
  reduceMotion: boolean;
};

export default function TransitionOverlay({ isActive, reduceMotion }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {/* White Flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={false}
        animate={isActive ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={
          isActive
            ? {
                duration: reduceMotion ? 0.3 : 0.7,
                ease: "easeInOut",
                delay: reduceMotion ? 0 : 1.8,
              }
            : { duration: 0.2 }
        }
      />
      {/* Black Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={false}
        animate={isActive ? { opacity: [0, 1] } : { opacity: 0 }}
        transition={
          isActive
            ? {
                duration: reduceMotion ? 0.45 : 0.5,
                ease: "easeInOut",
                delay: reduceMotion ? 0.1 : 2.0,
              }
            : { duration: 0.2 }
        }
      />
    </div>
  );
}
