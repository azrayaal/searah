import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import type { QuickLink, QuickLinkTone, SectionIntro } from '@/types';

interface QuickAccessSectionProps {
  intro: SectionIntro;
  links: QuickLink[];
}

/** How many tiles stay on screen before the reader asks for the rest. */
const COLLAPSED_COUNT = 3;

/**
 * The artwork carries its own background, corner radius and illustration — the card
 * *is* the PNG. All that varies in markup is the ink, because the light plates need
 * navy and the dark ones white, and no single rule covers both.
 */
const tones: Record<QuickLinkTone, { title: string; body: string }> = {
  slate: { title: 'text-navy-deep', body: 'text-charcoal' },
  sky: { title: 'text-navy-deep', body: 'text-muted' },
  ocean: { title: 'text-white', body: 'text-white/75' },
  ink: { title: 'text-white', body: 'text-white/70' },
  rose: { title: 'text-white', body: 'text-white/80' },
  teal: { title: 'text-white', body: 'text-white/80' },
};

/** The plates are drawn at 1784×2056; holding that ratio keeps the copy clear of the art. */
const PLATE_RATIO = '1784 / 2056';

function QuickCard({ link }: { link: QuickLink }) {
  const tone = tones[link.tone];

  return (
    <PrefetchLink
      to={link.href}
      // `containerType` lets the copy below size itself in cqw — i.e. as a fraction of
      // the card's own width — so it stays proportional at every column count.
      style={{ aspectRatio: PLATE_RATIO, containerType: 'inline-size' }}
      className={cn(
        'group relative mx-auto block w-full max-w-[446px] overflow-hidden',
        // The whole plate zooms as one — the art stays locked to its background.
        'transition-transform duration-500 ease-premium will-change-transform hover:scale-[1.03]',
      )}
    >
      {/* No wrapper surface: the plate is the card, so it sits underneath at full bleed. */}
      <img
        src={link.image.src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex h-full flex-col p-[7.5cqw]">
        <span
          className={cn(
            'block text-[clamp(1.5rem,8.2cqw,2.5rem)] font-bold leading-[1.12] tracking-tight',
            tone.title,
          )}
        >
          {link.label}
        </span>
        <span
          className={cn(
            'mt-[4cqw] block max-w-[21ch] text-[clamp(0.875rem,3.6cqw,1.0625rem)] leading-[1.5]',
            tone.body,
          )}
        >
          {link.description}
        </span>
      </div>
    </PrefetchLink>
  );
}

/**
 * Six doors into the intranet. Three stay on screen and the rest unfold behind
 * "See all", so the homepage never spends a full viewport on navigation.
 */
export function QuickAccessSection({ intro, links }: QuickAccessSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = links.slice(0, COLLAPSED_COUNT);
  const rest = links.slice(COLLAPSED_COUNT);

  return (
    <Section tone="faint">
      <SectionHeader eyebrow={intro.eyebrow} title={intro.title} />

      <RevealGroup className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
        {visible.map((link) => (
          <RevealItem key={link.id}>
            <QuickCard link={link} />
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="rest"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.7, ease: EASE },
              // Opacity trails the height slightly on the way in and leads on the way
              // out, so the cards never appear over a half-open container.
              opacity: { duration: 0.5, ease: EASE, delay: expanded ? 0.12 : 0 },
            }}
            className="-mx-2 overflow-hidden"
          >
            {/* The px-2 pays back the -mx-2 above; together they give a hovered card
                room to scale without the collapse container clipping its edges. */}
            <div className="grid gap-x-6 gap-y-10 px-2 pb-2 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + index * 0.08 }}
                >
                  <QuickCard link={link} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {rest.length ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className="group flex flex-col items-center gap-1 rounded-lg px-6 py-2 text-body-sm font-medium text-muted transition-colors duration-500 ease-premium hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
          >
            {expanded ? 'Close' : 'See all'}
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-y-0.5',
                expanded && 'rotate-180 group-hover:-translate-y-0.5',
              )}
            />
          </button>
        </div>
      ) : null}
    </Section>
  );
}
