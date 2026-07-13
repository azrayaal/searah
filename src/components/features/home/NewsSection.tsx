import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { NewsCard } from '@/components/features/newsletter/NewsCard';
import type { NewsArticle, SectionIntro } from '@/types';

interface NewsSectionProps {
  intro: SectionIntro;
  featured: NewsArticle;
  articles: NewsArticle[];
}

export function NewsSection({ intro, featured, articles }: NewsSectionProps) {
  return (
    <Section id="news" tone="white">
      <SectionHeader
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        cta={intro.cta}
      />

      <RevealGroup className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10" gap={0.1}>
        <RevealItem preset="scaleIn">
          <NewsCard article={featured} variant="feature" className="h-full" />
        </RevealItem>

        <RevealItem preset="fadeLeft" className="flex flex-col divide-y divide-hairline">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
