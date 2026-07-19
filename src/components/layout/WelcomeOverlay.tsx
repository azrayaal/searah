import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoMark } from './Logo';
import { useLockBodyScroll } from '@/hooks';
import { EASE } from '@/lib/motion';
import { site } from '@/data/site';

/** Bumping the suffix re-greets returning visitors after a brand refresh. */
const STORAGE_KEY = 'searah:welcomed:v1';

/**
 * A one-time greeting on the visitor's first arrival. The flag lives in
 * `localStorage`, so a refresh — or any later route — goes straight to the page.
 */
export function WelcomeOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading storage in an effect rather than lazy state keeps the first paint
    // identical on the server-rendered and hydrated trees.
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Private-mode or blocked storage: greet, but don't crash trying to remember.
    }
    setOpen(true);
  }, []);

  useLockBodyScroll(open);

  const dismiss = () => {
    setOpen(false);
    try {
      // localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* nothing to remember with — the greeting simply repeats next visit */
    }
  };

  // The greeting auto-clears so it never blocks a visitor who just wants the page.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(dismiss, 3600);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Welcome to ${site.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden"
        >
          {/* Frosted pane: a pale blue wash over the page, blurred to frost. */}
          <button
            type="button"
            aria-label="Enter the site"
            onClick={dismiss}
            className="absolute inset-0 h-full w-full cursor-default bg-sky-soft/60 backdrop-blur-2xl backdrop-saturate-150"
          />

          {/* Two soft lights drifting behind the glass, so the frost has depth. */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-[-15%] h-[38rem] w-[38rem] rounded-full bg-ocean/25 blur-[120px]" />
            <div className="absolute -right-24 bottom-[-20%] h-[34rem] w-[34rem] rounded-full bg-sky-soft/80 blur-[110px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.99 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="pointer-events-none relative px-6 text-center"
          >
            <LogoMark className="mx-auto mb-8 h-20 w-20 drop-shadow-[0_8px_24px_rgba(0,100,157,0.25)]" />

            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-ocean">
              Welcome to
            </p>

            <h1 className="mt-4 text-[clamp(2.75rem,9vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-navy-deep">
              {site.name}
            </h1>

            <p className="mx-auto mt-5 max-w-prose text-body text-muted">{site.tagline}</p>

            {/* A hairline that draws itself as the greeting settles. */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
              className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-ocean/60 to-transparent"
            />
          </motion.div>

          <motion.button
            type="button"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-12 rounded-btn px-5 py-2 text-caption font-semibold uppercase tracking-[0.18em] text-ocean transition-colors hover:text-navy-deep"
          >
            Enter
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
