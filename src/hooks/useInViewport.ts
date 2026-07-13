import { useCallback, useEffect, useState } from 'react';

/** Matches the entrance threshold the motion presets were tuned against. */
const BOTTOM_MARGIN = 64;

/**
 * Scroll-entrance trigger with a backstop, replacing framer-motion's `whileInView`.
 *
 * `whileInView` leaves an element at `opacity: 0` whenever its IntersectionObserver
 * never delivers a first callback — which is what produced the "content only appears
 * once I open DevTools" bug: opening the panel resized the viewport, which finally
 * flushed the observer. Here a geometry check runs as soon as the node mounts, and
 * again after the layout has settled, so anything on screen is revealed regardless.
 *
 * The ref is a callback ref rather than a `RefObject` so it can attach to any of the
 * motion tags, whose `ref` types are an intersection across every element kind.
 */
export function useInViewport() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => setElement(node), []);

  useEffect(() => {
    if (!element || visible) return;

    const onScreen = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewportHeight - BOTTOM_MARGIN && rect.bottom > 0;
    };

    if (onScreen()) {
      setVisible(true);
      return;
    }

    const reveal = () => {
      if (onScreen()) setVisible(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      { rootMargin: `0px 0px -${BOTTOM_MARGIN}px 0px` },
    );
    observer.observe(element);

    // A late layout shift — image decode, webfont swap — can pull an element into view
    // without any scroll, so re-check once the page has had a moment to settle.
    const timer = window.setTimeout(reveal, 500);
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
    };
  }, [element, visible]);

  return { ref, visible } as const;
}
