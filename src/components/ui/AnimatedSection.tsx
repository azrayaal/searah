import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}