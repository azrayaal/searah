import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { EmptyState } from '@/components/ui/EmptyState';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { useSeo } from '@/hooks';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/cn';
import { getLegalDocument, legalDocuments } from '@/data/legal';
import { site } from '@/data/site';

/** Highlights the section currently under the header while the reader scrolls. */
function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;
    setActiveId(ids[0]);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Top band only: a heading becomes "active" once it reaches the header line.
      { rootMargin: '-104px 0px -62% 0px', threshold: 0 },
    );

    const elements = ids
      .map((id) => window.document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}

export default function LegalPage() {
  const { slug = '' } = useParams();
  const doc = getLegalDocument(slug);

  const activeId = useScrollSpy(doc?.sections.map((section) => section.id) ?? []);

  useSeo({
    title: doc?.title ?? 'Legal notice not found',
    description: doc?.intro ?? site.description,
  });

  const others = legalDocuments.filter((item) => item.slug !== slug);

  if (!doc) {
    return (
      <>
        <PageHero
          eyebrow={site.legalName}
          title="This legal notice is not available"
          description="The document you asked for has been renamed, withdrawn or never existed. The notices currently in force are listed below."
          breadcrumb={[{ label: 'Legal', href: `/legal/${legalDocuments[0].slug}` }]}
        />

        <Section tone="white">
          <EmptyState
            title="Legal notice not found"
            description="Choose one of the notices published on this portal."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {legalDocuments.map((item) => (
              <ButtonLink
                key={item.slug}
                href={`/legal/${item.slug}`}
                variant="secondary"
                icon={<ArrowRight className="h-[18px] w-[18px]" aria-hidden />}
              >
                {item.title}
              </ButtonLink>
            ))}
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={site.legalName}
        title={doc.title}
        breadcrumb={[
          { label: 'Legal', href: `/legal/${doc.slug}` },
          { label: doc.title, href: `/legal/${doc.slug}` },
        ]}
      >
        <p className="text-caption text-white/70">
          Last updated{' '}
          <time dateTime={doc.updatedAt} className="font-semibold text-white">
            {formatDate(doc.updatedAt)}
          </time>
        </p>
      </PageHero>

      <Section tone="white" spacing="tight">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* In-page table of contents */}
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-[104px] lg:max-h-[calc(100vh-140px)] lg:self-start lg:overflow-y-auto"
          >
            <p className="eyebrow mb-4 text-ocean">
              <span className="h-px w-8 bg-ocean/40" aria-hidden />
              On this page
            </p>

            <ol className="space-y-0.5 border-l border-hairline">
              {doc.sections.map((section) => {
                const active = section.id === activeId;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'relative -ml-px flex min-h-[44px] items-center border-l-2 py-2 pl-4 pr-2 text-caption transition-colors duration-300',
                        active
                          ? 'border-ocean font-semibold text-ocean'
                          : 'border-transparent text-muted hover:border-hairline hover:text-navy-deep',
                      )}
                    >
                      {section.heading}
                    </a>
                  </li>
                );
              })}
            </ol>

            {others.length > 0 ? (
              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-caption font-bold uppercase tracking-[0.08em] text-muted">
                  Related notices
                </p>
                <ul className="mt-3 space-y-1">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/legal/${item.slug}`}
                        className="group inline-flex min-h-[44px] items-center gap-2 text-caption font-semibold text-navy-deep transition-colors hover:text-ocean"
                      >
                        <FileText className="h-[18px] w-[18px] text-ocean" aria-hidden />
                        {item.title}
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </nav>

          {/* Prose */}
          <article className="min-w-0">
            <Reveal>
              <p className="max-w-prose text-body-sm text-charcoal md:text-body">
                {doc.intro}
              </p>
            </Reveal>

            <div className="mt-12 space-y-12">
              {doc.sections.map((section) => (
                <Reveal key={section.id}>
                  <section id={section.id} className="scroll-mt-[104px]">
                    <h2 className="text-h3 text-navy-deep md:text-[1.5rem]">{section.heading}</h2>

                    <div className="mt-4 max-w-prose space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)} className="text-body-sm text-charcoal">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets ? (
                      <ul className="mt-5 max-w-prose space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet.slice(0, 48)}
                            className="relative pl-6 text-body-sm text-charcoal"
                          >
                            <span
                              className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-ocean"
                              aria-hidden
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                </Reveal>
              ))}
            </div>
          </article>
        </div>
      </Section>

      {/* Document switcher */}
      <Section tone="faint" spacing="tight">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {legalDocuments.map((item) => {
              const current = item.slug === doc.slug;
              return (
                <li key={item.slug}>
                  <Link
                    to={`/legal/${item.slug}`}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'group flex h-full min-h-[44px] flex-col rounded-card border bg-white p-6 transition-all duration-300 ease-premium',
                      current
                        ? 'border-ocean/40 shadow-raised'
                        : 'border-hairline hover:border-ocean/40 hover:shadow-lifted',
                    )}
                  >
                    <span className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.08em] text-ocean">
                      <FileText className="h-[18px] w-[18px]" aria-hidden />
                      {current ? 'You are reading' : 'Also published'}
                    </span>
                    <span className="mt-3 text-h3 text-navy-deep">{item.title}</span>
                    <span className="mt-2 text-caption text-muted">
                      Last updated{' '}
                      <time dateTime={item.updatedAt}>{formatDate(item.updatedAt)}</time>
                    </span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </Section>
    </>
  );
}
