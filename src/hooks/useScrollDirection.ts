import { useEffect, useState } from 'react';

interface ScrollState {
  direction: 'up' | 'down';
  scrolled: boolean;
}

/** Drives the hide-on-scroll navbar. `threshold` avoids flicker on small jitters. */
export function useScrollDirection(threshold = 8) {
  const [state, setState] = useState<ScrollState>({ direction: 'up', scrolled: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (Math.abs(delta) >= threshold) {
        setState({ direction: delta > 0 && y > 120 ? 'down' : 'up', scrolled: y > 24 });
        lastY = y;
      } else {
        setState((prev) => (prev.scrolled === y > 24 ? prev : { ...prev, scrolled: y > 24 }));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}
