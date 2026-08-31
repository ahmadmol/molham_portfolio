"use client";

import { motion, useReducedMotion } from "framer-motion";

export function LoadingAnimation() {
  const reduceMotion = useReducedMotion();
  const bars = [0, 1, 2, 3];

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4"
    >
      <div className="flex items-end gap-1.5">
        {bars.map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 rounded-full bg-accent"
            initial={{ height: 8 }}
            animate={
              reduceMotion
                ? { height: 18 }
                : { height: [8, 26, 8] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12,
                  }
            }
            style={{ height: 18 }}
            aria-hidden
          />
        ))}
      </div>
      <p className="text-sm font-medium tracking-wide text-foreground-muted">
        Loading portfolio…
      </p>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}
