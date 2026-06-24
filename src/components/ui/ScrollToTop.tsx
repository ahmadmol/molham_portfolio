"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed right-4 bottom-4 z-50"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-3 text-sm font-semibold text-slate-100 hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            aria-label="Scroll to top"
          >
            ↑ Top
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
