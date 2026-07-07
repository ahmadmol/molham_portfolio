"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import React from "react";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function MotionSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <motion.section
      id={id}
      className={className}
      variants={baseVariants}
      {...motionProps}
    >
      {children}
    </motion.section>
  );
}
