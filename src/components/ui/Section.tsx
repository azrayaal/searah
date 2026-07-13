import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { TextReveal } from './TextReveal';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { NavLink } from '@/types';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical rhythm. `tight` for stacked sections, `airy` for statement moments. */
  spacing?: 'tight' | 'default' | 'airy';
  tone?: 'white' | 'faint' | 'sky' | 'navy' | 'transparent';
  containerSize?: 'default' | 'wide' | 'narrow';
}

const spacings = {
  tight: 'py-12 md:py-16',
  default: 'py-16 md:py-20 lg:py-[80px]',
  airy: 'py-20 md:py-26 lg:py-30',
};

const tones = {
  white: 'bg-white',
  faint: 'bg-sky-faint',
  sky: 'bg-sky-soft/40',
  navy: 'bg-navy text-white on-dark',
  transparent: '',
};

export function Section({
  children,
  id,
  className,
  spacing = 'default',
  tone = 'white',
  containerSize = 'default',
}: SectionProps) {
  return (
    <section id={id} className={cn(spacings[spacing], tones[tone], className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: NavLink;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  cta,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeaderProps) {
  const dark = tone === 'dark';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p className={cn('eyebrow mb-4', dark ? 'text-ember' : 'text-ocean')}>
            <span
              className={cn('h-px w-8', dark ? 'bg-ember/60' : 'bg-ocean/40')}
              aria-hidden
            />
            {eyebrow}
          </p>
        ) : null}

        <TextReveal
          as="h2"
          text={title}
          className={cn(
            'text-[1.75rem] font-bold leading-[1.15] md:text-[2.25rem]',
            dark ? 'text-white' : 'text-navy-deep',
          )}
        />

        {description ? (
          <p
            className={cn(
              'mt-4 max-w-prose text-body-sm md:text-body',
              dark ? 'text-white/70' : 'text-charcoal',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {cta ? (
        <Link
          to={cta.href}
          className={cn(
            'group inline-flex shrink-0 items-center gap-2 text-nav transition-colors',
            dark ? 'text-white hover:text-ember' : 'text-ocean hover:text-ocean-dark',
          )}
        >
          {cta.label}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      ) : null}
    </motion.div>
  );
}
