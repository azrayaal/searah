import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/lib/icons';
import type { QuickLink, SectionIntro } from '@/types';

interface QuickAccessSectionProps {
  intro: SectionIntro;
  links: QuickLink[];
}

export function QuickAccessSection({ intro, links }: QuickAccessSectionProps) {
  return (
    <Section tone="faint" spacing="tight">
      <SectionHeader eyebrow={intro.eyebrow} title={intro.title} />

      <RevealGroup
        className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 shadow-2xl"
        gap={0.05}
      >
        {links.map((link) => (
          <RevealItem key={link.id} className="bg-white">
            <PrefetchLink
              to={link.href}
              className="group flex h-[200px] items-start gap-4 p-6 transition-colors duration-300 hover:bg-navy-deep lg:p-7"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-soft/60 text-ocean transition-colors duration-300 group-hover:bg-white/10 group-hover:text-ember">
                <Icon name={link.icon} className="h-[18px] w-[18px]" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-body-sm font-bold text-navy-deep transition-colors duration-300 group-hover:text-white">
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="mt-1.5 block text-caption text-muted transition-colors duration-300 group-hover:text-white/60">
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
