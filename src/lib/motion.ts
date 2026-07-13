import type { Transition, Variants } from 'framer-motion';

/** Single easing curve shared by every transition so motion feels like one system. */
export const EASE: Transition['ease'] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** Wraps a group of children so they cascade rather than arriving at once. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/**
 * `amount: 'some'` rather than a ratio: a ratio is measured against the element's own
 * height, so a list taller than ~4x the viewport can never satisfy it and would stay
 * hidden forever. The bottom margin holds the entrance back until the element is
 * properly on screen.
 */
export const viewportOnce = { once: true, amount: 'some', margin: '0px 0px -64px 0px' } as const;

export const presets = { fadeUp, fadeIn, fadeLeft, fadeRight, scaleIn } as const;

export type MotionPreset = keyof typeof presets;
