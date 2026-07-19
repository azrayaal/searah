import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({
  children,
}: AnimatedSectionProps) {
  return (
   <motion.section
    initial={{
        opacity:0,
        y:24,
        scale:.985,
        filter:"blur(8px)"
    }}
    whileInView={{
        opacity:1,
        y:0,
        scale:1,
        filter:"blur(0px)"
    }}
    viewport={{
        once:true,
        amount:.2
    }}
    transition={{
        type:"spring",
        stiffness:65,
        damping:20,
        mass:1
    }}
>
      {children}
    </motion.section>
  );
}