import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll on navigation, but honours in-page anchors so mega-menu links
 * like /about#timeline land on their section.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists before we scroll to it.
      const id = window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(id);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
