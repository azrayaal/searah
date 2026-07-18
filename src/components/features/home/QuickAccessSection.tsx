import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/lib/icons';
import type { QuickLink, SectionIntro } from '@/types';

interface QuickAccessSectionProps {
  intro: SectionIntro;
  links: QuickLink[];
}

/**
 * Six doors into the intranet, presented as one card rather than six.
 *
 * The dividers are the parent's background showing through a 1px grid gap — cheaper than
 * per-cell borders, and it never doubles a line up between two neighbours.
 */
export function QuickAccessSection({ intro, links }: QuickAccessSectionProps) {
  return (
    <Section tone="faint" spacing="tight">
      <SectionHeader eyebrow={intro.eyebrow} title={intro.title} />

      <RevealGroup
        className="mt-12 grid gap-px overflow-hidden rounded-card bg-hairline shadow-[0_24px_64px_-28px_rgba(10,29,72,0.28)] sm:grid-cols-2 lg:grid-cols-3"
        gap={0.05}
      >
        {links.map((link) => (
          <RevealItem key={link.id} className="bg-white">
            <PrefetchLink
              to={link.href}
              className="group flex h-full min-h-[240px] items-start gap-5 p-8 transition-colors duration-300 hover:bg-sky-faint lg:p-10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-soft/60 text-ocean transition-colors duration-300 group-hover:bg-ocean group-hover:text-white">
                <Icon name={link.icon} className="h-5 w-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-body-sm font-bold text-navy-deep transition-colors duration-300 group-hover:text-ocean">
                  {link.label}
                </span>
                <span className="mt-2 block text-caption leading-relaxed text-muted">
                  {link.description}
                </span>
              </span>
            </PrefetchLink>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
