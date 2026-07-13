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
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-flame" x1="30" y1="4" x2="46" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF3C" />
          <stop offset="0.55" stopColor="#F2782A" />
          <stop offset="1" stopColor="#D8322A" />
        </linearGradient>
        <linearGradient id="logo-wave" x1="6" y1="26" x2="34" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2FA0E8" />
          <stop offset="1" stopColor="#0B63B4" />
        </linearGradient>
      </defs>
      <path d="M30 4c16 6 25 18 25 31 0 10-5 19-14 25 6-8 8-16 7-24-2-13-9-23-18-32Z" fill="url(#logo-flame)" />
      <path
        d="M22 12c11 8 17 17 18 27 1 8-2 15-8 20 3-8 3-15 1-22-3-10-8-18-11-25Z"
        fill="url(#logo-flame)"
        opacity="0.7"
      />
      <path
        d="M9 22c-1 12 4 21 14 25 5 2 11 2 17-1-7 8-16 11-25 8C6 51 1 42 2 32c1-4 3-8 7-10Z"
        fill="url(#logo-wave)"
      />
    </svg>
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
            {site.name}
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
