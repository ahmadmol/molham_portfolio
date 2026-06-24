"use client";

import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Loading...
    </motion.div>
  );
}
