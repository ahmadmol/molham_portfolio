"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
export const motionTiming = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
export default function MotionSection({
  children,
  className = "",
  id,
  as = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  const reduced = useReducedMotion();
  const played = useRef(false);
  const Tag = as === "section" ? motion.section : motion.div;
  return (
    <Tag
      id={id}
      className={className}
      initial={false}
      viewport={{ once: true, amount: 0.1 }}
      onViewportEnter={(entry) => {
        if (!reduced && !played.current && entry) {
          played.current = true;
          entry.target.animate(
            [
              { opacity: 0.75, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: motionTiming.duration * 1000,
              easing: "cubic-bezier(.22,1,.36,1)",
            },
          );
        }
      }}
    >
      {children}
    </Tag>
  );
}
