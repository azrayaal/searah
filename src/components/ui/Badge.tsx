import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'neutral' | 'ocean' | 'ember' | 'success' | 'warning' | 'danger' | 'onDark';

const tones: Record<Tone, string> = {
  neutral: 'bg-navy-deep/5 text-navy-deep',
  ocean: 'bg-ocean/10 text-ocean-dark',
  ember: 'bg-ember/15 text-[#9A5514]',
  success: 'bg-emerald-500/10 text-emerald-700',
  warning: 'bg-ember/15 text-[#9A5514]',
  danger: 'bg-crimson/10 text-crimson',
  onDark: 'bg-white/10 text-white border border-white/20',
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, tone = 'neutral', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em]',
        tones[tone],
        className,
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  );
}
