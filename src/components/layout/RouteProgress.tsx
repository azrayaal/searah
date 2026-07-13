import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from 'react-router-dom';
import { EASE } from '@/lib/motion';

/**
 * The only feedback the user gets while a page chunk downloads — the router keeps the
 * current page on screen until it lands, so without this the click would feel dead.
 * It eases toward 90% rather than tracking real progress, which the fetch never reports.
 */
export function RouteProgress() {
  const { state } = useNavigation();
  const busy = state !== 'idle';

  return (
    <AnimatePresence>
      {busy ? (
        <motion.div
          className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <span className="sr-only">Loading page</span>
          <motion.span
            className="block h-full origin-left bg-ocean"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.9 }}
            exit={{ scaleX: 1, transition: { duration: 0.2, ease: EASE } }}
            transition={{ duration: 1.6, ease: [0.1, 0.7, 0.2, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
