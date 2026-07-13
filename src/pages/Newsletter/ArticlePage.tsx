import { Navigate, Link, useParams } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Image } from '@/components/ui/Image';
import { Gallery } from '@/components/ui/Gallery';
import { Badge } from '@/components/ui/Badge';
import { NewsCard } from '@/components/features/newsletter/NewsCard';
import { getArticleBySlug, news } from '@/data/newsletter';
import { entityIndex } from '@/data/entities';
import { formatDate } from '@/lib/format';
import { useSeo } from '@/hooks';
import type { ContentBlock, NewsArticle } from '@/types';

/** Renders one CMS content block. New block types slot in here alone. */
function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-12 text-[1.5rem] font-bold leading-snug text-navy-deep first:mt-0">
          {block.text}
        </h2>
      );

    case 'paragraph':
      return <p className="mt-6 text-body text-charcoal">{block.text}</p>;

    case 'quote':
      return (
        <figure className="my-10 border-l-2 border-ember pl-6 md:pl-8">
          <blockquote className="text-[1.375rem] font-medium leading-snug text-navy-deep">
            “{block.text}”
          </blockquote>
          <figcaption className="mt-4 text-caption text-muted">{block.attribution}</figcaption>
        </figure>
      );

    case 'list':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-body-sm text-charcoal md:text-body">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'image':
      return (
        <figure className="my-10">
          <Image media={block.media} ratio="16/9" className="rounded-card" />
          {block.media.caption ? (
            <figcaption className="mt-3 text-caption text-muted">{block.media.caption}</figcaption>
          ) : null}
        </figure>
      );

    case 'stat':
      return (
        <dl className="my-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.label} className="bg-sky-faint p-6">
              <dt className="text-caption text-muted">{item.label}</dt>
              <dd className="mt-2 text-[1.5rem] font-bold text-navy-deep">{item.value}</dd>
            </div>
          ))}
        </dl>
      );

    default:
      return null;
  }
}

function relatedFor(article: NewsArticle) {
  const sameEntity = news.filter(
    (item) => item.id !== article.id && item.entityId === article.entityId,
  );
  const sameCategory = news.filter(
    (item) =>
      item.id !== article.id &&
      item.category === article.category &&
      !sameEntity.some((entry) => entry.id === item.id),
  );
  return [...sameEntity, ...sameCategory].slice(0, 3);
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useSeo({
    title: article?.title ?? 'Article',
    description: article?.excerpt ?? '',
    image: article?.cover.src,
    type: 'article',
    publishedAt: article?.date,
  });

  if (!article) return <Navigate to="/newsletter" replace />;

  const entity = article.entityId ? entityIndex[article.entityId] : null;
  const related = relatedFor(article);

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        breadcrumb={[
          { label: 'Newsletter', href: '/newsletter' },
          { label: article.title, href: `/newsletter/${article.slug}` },
        ]}
        image={article.cover}
        variant="feature"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <p className="text-body-sm font-semibold text-white">{article.author.name}</p>
            <p className="text-caption text-white/50">{article.author.role}</p>
          </div>
          <span className="h-8 w-px bg-white/20" aria-hidden />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-white/60">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime}</span>
            {entity ? (
              <>
                <span aria-hidden>·</span>
                <Link
                  to={`/entity/${article.entityId}`}
                  className="text-ember transition-colors hover:text-white"
                >
                  {entity.name}
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <Reveal preset="fadeUp" as="article" className="min-w-0 max-w-prose">
            <p className="border-l-2 border-ocean pl-5 text-body font-medium text-navy-deep md:text-[1.25rem] md:leading-relaxed">
              {article.excerpt}
            </p>

            <div className="mt-10">
              {article.content.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>

            {article.tags.length ? (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-hairline pt-8">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Badge tone="neutral">{tag}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          <Reveal preset="fadeLeft" as="aside" className="lg:sticky lg:top-32 lg:self-start">
            {article.attachments.length ? (
              <div className="rounded-card border border-hairline p-6">
                <p className="text-caption font-bold uppercase tracking-[0.1em] text-ocean">
                  Attachments
                </p>
                <ul className="mt-5 space-y-4">
                  {article.attachments.map((attachment) => (
                    <li key={attachment.id}>
                      <a
                        href={attachment.href}
                        className="group flex items-start gap-3"
                        aria-label={`Download ${attachment.title}`}
                      >
                        <FileText
                          className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted"
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-body-sm font-semibold leading-snug text-navy-deep transition-colors group-hover:text-ocean">
                            {attachment.title}
                          </span>
                          <span className="mt-0.5 block text-caption text-muted">
                            {attachment.type} · {attachment.size}
                          </span>
                        </span>
                        <Download className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-ocean" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Section>

      {article.gallery.length ? (
        <Section tone="faint">
          <SectionHeader eyebrow="Gallery" title="From the field" />
          <Reveal preset="fadeUp" className="mt-10">
            <Gallery images={article.gallery} />
          </Reveal>
        </Section>
      ) : null}

      {related.length ? (
        <Section tone="white">
          <SectionHeader
            eyebrow="Related"
            title="More from the newsroom"
            cta={{ label: 'All articles', href: '/newsletter' }}
          />
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {related.map((item) => (
              <RevealItem key={item.id}>
                <NewsCard article={item} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      ) : null}
    </>
  );
}
