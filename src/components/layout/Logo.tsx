import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
  /** Hides the wordmark, leaving the mark alone (used in the compact footer rail). */
  markOnly?: boolean;
}

/**
 * The Searah mark: a blue wave cresting into a gold flame.
 * Drawn inline so it stays crisp at any size and can adopt the surrounding tone.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
   <img src="/favicon.png" alt="Searah Logo" className={cn('h-24 ', className)} />
  );
}

export function Logo({ tone = 'light', className, markOnly }: LogoProps) {
  const dark = tone === 'dark';

  return (
    <Link
      to="/"
      className={cn('group flex items-center gap-3', className)}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-500 ease-premium group-hover:scale-105" />

      {!markOnly ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'text-[1.35rem] font-bold tracking-tight',
              dark ? 'text-white' : 'text-navy-deep',
            )}
          >
            {/* {site.name} */}
          </span>
          {/* <span
            className={cn(
              'mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.14em] lg:block',
              dark ? 'text-white/50' : 'text-muted',
            )}
          >
            {site.descriptor}
          </span> */}
        </span>
      ) : null}
    </Link>
  );
}
