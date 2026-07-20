import { useCallback, useEffect, useState } from 'react';

/** Matches the entrance threshold the motion presets were tuned against. */
const BOTTOM_MARGIN = 64;

/**
 * Bidirectional scroll trigger with a backstop, replacing framer-motion's `whileInView`.
 *
 * `visible` tracks the element continuously rather than latching on first sight, so the
 * motion presets can play their `hidden` variant as an exit when the element scrolls
 * back off screen.
 *
 * The IntersectionObserver is the source of truth — it reports both directions and
 * costs no layout work. The geometry checks exist only as a backstop: `whileInView`
 * left elements at `opacity: 0` whenever the observer never delivered a first callback,
 * which produced the "content only appears once I open DevTools" bug (opening the panel
 * resized the viewport, which finally flushed the observer). Deliberately no scroll
 * listener — measuring every Reveal on the page per scroll event would thrash layout,
 * and the observer already covers it.
 *
 * The ref is a callback ref rather than a `RefObject` so it can attach to any of the
 * motion tags, whose `ref` types are an intersection across every element kind.
 */
export function useInViewport(options: { once?: boolean } = {}) {
  const { once = false } = options;
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => setElement(node), []);

  useEffect(() => {
    if (!element) return;

    // `once` latches on first sight. The bidirectional default is right for decorative
    // motion, but wrong for anything that *is* the content: a roster or a table that
    // empties as the reader scrolls past reads as a loading failure, and it also means
    // a full-page screenshot or a print captures blank sections.
    let latched = false;

    const apply = (next: boolean) => {
      if (once) {
        if (latched) return;
        if (!next) return;
        latched = true;
      }
      setVisible(next);
    };

    const sync = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      apply(rect.top < viewportHeight - BOTTOM_MARGIN && rect.bottom > 0);
    };

    sync();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) apply(entry.isIntersecting);
      },
      { rootMargin: `0px 0px -${BOTTOM_MARGIN}px 0px` },
    );
    observer.observe(element);

    // A late layout shift — image decode, webfont swap — can pull an element into view
    // without any scroll, so re-check once the page has had a moment to settle.
    const timer = window.setTimeout(sync, 500);
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener('resize', sync);
    };
  }, [element]);

  return { ref, visible } as const;
}
