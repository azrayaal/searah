import { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Pointer-tracked parallax. Returns springs in the range [-strength, strength]
 * that can be bound to `x` / `y` on any motion element inside `ref`.
 */
export function useMouseParallax(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const config = { stiffness: 120, damping: 20, mass: 0.4 };
  const x = useSpring(rawX, config);
  const y = useSpring(rawY, config);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2 * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, handlers: { onMouseMove, onMouseLeave } };
}
