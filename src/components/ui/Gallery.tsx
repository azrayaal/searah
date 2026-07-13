import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Image } from './Image';
import { useLockBodyScroll } from '@/hooks';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Media } from '@/types';

interface GalleryProps {
  images: Media[];
  className?: string;
}

/** Masonry-ish grid with a keyboard-navigable lightbox. */
export function Gallery({ images, className }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  useLockBodyScroll(open);

  const step = useCallback(
    (direction: number) => {
      setIndex((current) =>
        current === null ? null : (current + direction + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIndex(null);
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  const active = index !== null ? images[index] : null;

  return (
    <>
      <ul className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {images.map((media, position) => (
          <li key={media.src + position} className={cn(position === 0 && 'sm:col-span-2 sm:row-span-2')}>
            <button
              type="button"
              onClick={() => setIndex(position)}
              className="group block h-full w-full overflow-hidden rounded-card focus-visible:ring-offset-4"
              aria-label={`View image: ${media.alt}`}
            >
              <Image
                media={media}
                zoom
                ratio={position === 0 ? '4/3' : '3/2'}
                className="h-full rounded-card"
              />
            </button>
          </li>
        ))}
      </ul>

      {createPortal(
        <AnimatePresence>
          {active ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] flex flex-col bg-navy-deep/95 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label="Image gallery"
            >
              <div className="flex items-center justify-between px-6 py-5 text-white">
                <p className="text-caption text-white/60">
                  {(index ?? 0) + 1} / {images.length}
                </p>
                <button
                  type="button"
                  onClick={() => setIndex(null)}
                  aria-label="Close gallery"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center px-4 pb-10 md:px-20">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <motion.figure
                  key={active.src}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="max-h-full"
                >
                  <img
                    src={active.src}
                    alt={active.alt}
                    className="max-h-[70vh] w-auto rounded-card object-contain shadow-high"
                  />
                  <figcaption className="mt-4 text-center text-caption text-white/70">
                    {active.caption ?? active.alt}
                  </figcaption>
                </motion.figure>

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
