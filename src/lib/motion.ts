import type { Transition, Variants } from 'framer-motion';

/** Single easing curve shared by every transition so motion feels like one system. */
export const EASE: Transition['ease'] = [0.22, 1, 0.36, 1];

/**
 * Leaving uses a symmetric ease rather than the decelerating entrance curve. The
 * entrance curve run backwards accelerates into the exit, which reads as a snap.
 */
export const EASE_OUT: Transition['ease'] = [0.4, 0, 0.6, 1];

/** Entrances are unhurried; exits are shorter, so scrolling never feels like it drags. */
const enter: Transition = { duration: 0.85, ease: EASE };
const leave: Transition = { duration: 0.45, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, transition: leave },
  visible: { opacity: 1, y: 0, transition: enter },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, transition: leave },
  visible: { opacity: 1, transition: { ...enter, duration: 0.95 } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32, transition: leave },
  visible: { opacity: 1, x: 0, transition: enter },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32, transition: leave },
  visible: { opacity: 1, x: 0, transition: enter },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, transition: leave },
  visible: { opacity: 1, scale: 1, transition: enter },
};

/**
 * Wraps a group of children so they cascade rather than arriving at once. On the way
 * out the cascade reverses and tightens, so the group collapses back the way it came.
 */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: { transition: { staggerChildren: staggerChildren * 0.5, staggerDirection: -1 } },
  visible: { transition: { delayChildren, staggerChildren } },
});

/**
 * `amount: 'some'` rather than a ratio: a ratio is measured against the element's own
 * height, so a list taller than ~4x the viewport can never satisfy it and would stay
 * hidden forever. The bottom margin holds the entrance back until the element is
 * properly on screen.
 */
export const viewportOnce = { once: true, amount: 'some', margin: '0px 0px -64px 0px' } as const;

/** Same threshold, but re-arms on exit so `whileInView` can play both directions. */
export const viewportRepeat = { ...viewportOnce, once: false } as const;

export const presets = { fadeUp, fadeIn, fadeLeft, fadeRight, scaleIn } as const;

export type MotionPreset = keyof typeof presets;
