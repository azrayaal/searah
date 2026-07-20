import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { NewsCard } from '@/components/features/newsletter/NewsCard';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { useTranslation } from '@/lib/i18n';
import type { NewsArticle, SectionIntro } from '@/types';

interface NewsSectionProps {
  intro: SectionIntro;
  featured: NewsArticle;
  articles: NewsArticle[];
}

/**
 * One lead story beside a two-by-two of followers. Every tile is the same dark image card,
 * so the grid reads as one newsroom rather than a feature plus a list of links.
 */
export function NewsSection({ intro, featured, articles }: NewsSectionProps) {
  const t = useTranslation();

  return (
    <Section id="news" tone="faint">
      {/* Heading and the route out sit on one row: the grid below shows five stories out
          of the full archive, so the way through to the rest belongs beside the title
          rather than buried under the last card. */}
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="max-w-2xl text-[2rem] font-bold leading-[1.12] text-navy-deep md:text-[2.5rem] lg:text-[3rem]">
            {intro.title}
          </h2>
          {intro.description ? (
            <p className="mt-6 max-w-2xl text-body-sm text-charcoal md:text-body">
              {intro.description}
            </p>
          ) : null}
        </div>

        {intro.cta ? (
          <PrefetchLink
            to={intro.cta.href}
            className="group inline-flex shrink-0 items-center gap-2 rounded-btn border border-ocean/25 px-5 py-3
                       text-nav text-ocean transition-colors hover:border-ocean hover:bg-ocean hover:text-white"
          >
            {t(intro.cta.label)}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
              aria-hidden
            />
          </PrefetchLink>
        ) : null}
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr]" gap={0.1}>
        <RevealItem preset="scaleIn">
          <NewsCard article={featured} variant="feature" className="h-full" />
        </RevealItem>

        <RevealItem preset="fadeLeft" className="grid gap-6 sm:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
