"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
        >
          <button
            type="button"
            onClick={handleClick}
            aria-label="Scroll to top"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background-soft/80 text-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_0_1px_rgba(16,185,129,0.30),0_12px_30px_-12px_rgba(16,185,129,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition-transform group-hover:-translate-y-0.5"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
