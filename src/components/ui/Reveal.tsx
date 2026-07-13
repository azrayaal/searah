import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { presets, stagger, viewportOnce, type MotionPreset } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Motion components are created once at module scope. Calling `motion(tag)` inside
 * render would mint a new component type every pass, remounting the subtree and
 * snapping it back to its hidden initial state.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  header: motion.header,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  figure: motion.figure,
  span: motion.span,
} as const;

export type RevealTag = keyof typeof TAGS;

interface RevealProps {
  children: ReactNode;
  preset?: MotionPreset;
  delay?: number;
  className?: string;
  as?: RevealTag;
}

/** Scroll-triggered entrance for a single element. */
export function Reveal({
  children,
  preset = 'fadeUp',
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const Tag = TAGS[as];

  return (
    <Tag
      className={className}
      variants={presets[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  as?: RevealTag;
}

/** Parent that cascades `RevealItem` children into view. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  gap = 0.08,
  as = 'div',
}: RevealGroupProps) {
  const Tag = TAGS[as];

  return (
    <Tag
      className={className}
      variants={stagger(delay, gap)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  preset = 'fadeUp',
  className,
  as = 'div',
}: Omit<RevealProps, 'delay'>) {
  const Tag = TAGS[as];

  return (
    <Tag className={cn(className)} variants={presets[preset]}>
      {children}
    </Tag>
  );
}
