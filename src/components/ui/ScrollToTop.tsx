"use client";
import { useEffect, useState } from "react";
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return visible ? (
    <a
      href="#home"
      aria-label="Back to top"
      className="fixed right-4 bottom-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-background-soft text-xl text-foreground hover:text-accent-bright"
    >
      ↑
    </a>
  ) : null;
}
