"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import React from "react";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** When true, renders a <section> tag with the given id. */
  as?: "section" | "div";
};

export default function MotionSection({
  children,
  className = "",
  id,
  as = "section",
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
      };

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag id={id} className={className} variants={baseVariants} {...motionProps}>
      {children}
    </MotionTag>
  );
}
