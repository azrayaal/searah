import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterPills } from '@/components/ui/Filter';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { useCollection, useSeo } from '@/hooks';
import { faqCategories, faqs } from '@/data/faq';
import { footer } from '@/data/footer';
import { site } from '@/data/site';
import type { FaqItem } from '@/types';

/** Onward help routes, kept in sync with the footer rather than restated here. */
const HELP_ROUTES = ['/services', '/emergency'];

export default function FaqPage() {
  useSeo({
    title: 'Frequently asked questions',
    description: `Answers to the questions most often asked about ${site.legalName} — the joint venture, its operations, careers, employee services and emergency response.`,
  });

  const searchFields = useMemo(
    () => (faq: FaqItem) => [faq.question, faq.answer, faq.category],
    [],
  );

  const facets = useMemo(() => ({ category: (faq: FaqItem) => faq.category }), []);

  const { query, setQuery, selected, setFacet, reset, results } = useCollection(faqs, {
    searchFields,
    facets,
  });

  const items: AccordionItem[] = results.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    meta: faq.category,
  }));

  const helpLinks = useMemo(
    () =>
      footer.columns
        .flatMap((column) => column.links)
        .filter((link) => HELP_ROUTES.includes(link.href)),
    [],
  );

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently asked questions"
        description={`What people most often ask about ${site.legalName} — the ownership, the assets, the numbers, and how to get things done inside the company.`}
        breadcrumb={[{ label: 'FAQ', href: '/faq' }]}
      />

      <Section tone="white">
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar
            value={query}
            onChange={setQuery}
            label="Search frequently asked questions"
            placeholder="Search questions and answers"
            className="lg:max-w-md"
          />
          <FilterPills
            label="Category"
            options={faqCategories}
            value={selected.category ?? ''}
            onChange={(value) => setFacet('category', value)}
          />
        </Reveal>

        <p className="mt-6 text-caption text-muted" aria-live="polite">
          {results.length} of {faqs.length} questions
        </p>

        <div className="mt-4">
          {items.length > 0 ? (
            <Accordion items={items} defaultOpen={items[0].id} />
          ) : (
            <EmptyState
              title="No answer matches that search"
              description="Try a different wording or clear the filters. If the question is not here, the service desk can answer it."
              actionLabel="Clear filters"
              onAction={reset}
            />
          )}
        </div>
      </Section>

      {/* Still need help? */}
      <Section tone="navy" spacing="tight">
        <SectionHeader
          tone="dark"
          eyebrow="Support"
          title="Still need help?"
          description="If your question is not answered above, raise it with the team that owns it. In an emergency, do not use a form — call."
        />

        <Reveal className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {helpLinks.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              variant="onDark"
              size="lg"
              fullWidth
              icon={<ArrowRight className="h-[18px] w-[18px]" aria-hidden />}
            >
              {link.label}
            </ButtonLink>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
