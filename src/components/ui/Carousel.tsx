import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CarouselProps {
  children: ReactNode;
  label: string;
  className?: string;
  /** Rail tone — controls the arrow and progress-bar colours. */
  tone?: 'light' | 'dark';
}

/**
 * Snap rail with arrow controls and a drag-scroll affordance. Native scrolling does
 * the work, so it stays keyboard- and touch-native rather than reimplementing gestures.
 */
export function Carousel({ children, label, className, tone = 'light' }: CarouselProps) {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const dark = tone === 'dark';

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const step = (direction: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.8, 520), behavior: 'smooth' });
  };

  const arrow = cn(
    'flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-30',
    dark
      ? 'border-white/25 text-white hover:border-ember hover:bg-ember hover:text-navy-deep'
      : 'border-hairline text-navy-deep hover:border-navy-deep hover:bg-navy-deep hover:text-white',
  );

  return (
    <div className={className}>
      <div
        ref={rail}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8"
      >
        {children}
      </div>

      <div className="mt-8 flex items-center gap-6 px-0">
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous" className={arrow}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next" className={arrow}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div
          className={cn('h-px flex-1 overflow-hidden', dark ? 'bg-white/15' : 'bg-hairline')}
          aria-hidden
        >
          <div
            className={cn('h-full origin-left transition-transform duration-200', dark ? 'bg-ember' : 'bg-navy-deep')}
            style={{ width: '32%', transform: `translateX(${progress * 212}%)` }}
          />
        </div>
      </div>
    </div>
  );
}
