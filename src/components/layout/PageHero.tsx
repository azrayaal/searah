import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Image } from '@/components/ui/Image';
import { FlowLines } from '@/components/ui/FlowLines';
import { TextReveal } from '@/components/ui/TextReveal';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Media, NavLink } from '@/types';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: NavLink[];
  image?: Media;
  children?: ReactNode;
  /** `compact` for utility pages; `feature` for entity and article headers. */
  variant?: 'compact' | 'feature';
}

/** Shared page header. Keeps every inner page on the same vertical rhythm. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
  children,
  variant = 'compact',
}: PageHeroProps) {
  const feature = variant === 'feature' && Boolean(image);

  return (
    <header
      className={cn(
        'relative isolate overflow-hidden bg-navy pt-[74px]',
        feature ? 'min-h-[540px]' : '',
      )}
    >
      {image ? (
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0 -z-10"
        >
          <Image
            media={image}
            ratio="auto"
            priority
            className="h-full"
            imgClassName="h-full w-full"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40"
            aria-hidden
          />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-deep via-navy to-[#0d3d5c]"
          aria-hidden
        />
      )}

      {/* Faint column rule pattern, echoing the map graticule */}
      <div className="hairline-grid absolute inset-0 -z-10 opacity-40" aria-hidden />

      {/* The brand flow motif, mirrored so it sweeps away from the headline */}
      <FlowLines className="-z-10 opacity-50" count={16} colour="rgba(214,240,255,0.16)" mirrored />

      <Container
        className={cn(
          'on-dark relative flex flex-col justify-end',
          feature ? 'min-h-[440px] py-16' : 'py-14 lg:py-18',
        )}
      >
        <Breadcrumb items={breadcrumb} tone="dark" className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-4 text-ember">
            <span className="h-px w-8 bg-ember/60" aria-hidden />
            {eyebrow}
          </p>

          <TextReveal
            as="h1"
            text={title}
            trigger="mount"
            delay={0.15}
            className={cn(
              'font-normal leading-[1.12] text-white',
              feature
                ? 'text-[2.25rem] md:text-[3rem] lg:text-display'
                : 'text-[2rem] md:text-[2.5rem] lg:text-[3rem]',
            )}
          />

          {description ? (
            <p className="mt-6 max-w-2xl text-body-sm text-white/70 md:text-body">{description}</p>
          ) : null}
        </motion.div>

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        ) : null}
      </Container>
    </header>
  );
}
