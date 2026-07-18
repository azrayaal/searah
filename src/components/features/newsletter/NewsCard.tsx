import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { entityIndex } from '@/data/entities';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  /** `feature` is the large lead item; `compact` is the sidebar list row. */
  variant?: 'default' | 'feature' | 'compact';
  className?: string;
}

function Meta({ article, tone = 'light' }: { article: NewsArticle; tone?: 'light' | 'dark' }) {
  const entity = article.entityId ? entityIndex[article.entityId] : null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 text-caption',
        tone === 'dark' ? 'text-white/60' : 'text-muted',
      )}
    >
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{article.readingTime}</span>
      {entity ? (
        <>
          <span aria-hidden>·</span>
          <span className={tone === 'dark' ? 'text-ember' : 'text-ocean'}>{entity.name}</span>
        </>
      ) : null}
    </div>
  );
}

export function NewsCard({ article, variant = 'default', className }: NewsCardProps) {
  // A dark image tile — the same shape as the feature card, scaled down, so a mixed grid
  // of one lead and four followers reads as one family rather than two designs.
  if (variant === 'compact') {
    return (
      <Link
        to={`/newsletter/${article.slug}`}
        className={cn(
          'group relative isolate flex min-h-[248px] flex-col justify-end overflow-hidden rounded-card bg-navy-deep p-6',
          className,
        )}
      >
        <Image
          media={article.thumbnail}
          ratio="auto"
          zoom
          overlay
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="absolute inset-0 -z-10 h-full"
          imgClassName="h-full w-full"
        />

        <Badge tone="onDark" className="absolute left-6 top-6">
          {article.category}
        </Badge>

        <h3 className="line-clamp-3 text-body-sm font-bold leading-snug text-white">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-caption text-white/70">{article.excerpt}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <Meta article={article} tone="dark" />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 ease-premium group-hover:border-ember group-hover:bg-ember group-hover:text-navy-deep">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'feature') {
    return (
      <Link
        to={`/newsletter/${article.slug}`}
        className={cn(
          'group relative isolate flex min-h-[440px] flex-col justify-end overflow-hidden rounded-card bg-navy-deep p-8 lg:min-h-[520px] lg:p-10',
          className,
        )}
      >
        <Image
          media={article.cover}
          ratio="auto"
          zoom
          overlay
          className="absolute inset-0 -z-10 h-full"
          imgClassName="h-full w-full"
        />

        <Badge tone="onDark" className="mb-5 w-fit">
          {article.category}
        </Badge>

        <h3 className="max-w-xl text-[1.5rem] font-bold leading-tight text-white md:text-[2rem]">
          {article.title}
        </h3>
        <p className="mt-3 max-w-xl text-body-sm text-white/70 line-clamp-2">{article.excerpt}</p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Meta article={article} tone="dark" />
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 ease-premium group-hover:border-ember group-hover:bg-ember group-hover:text-navy-deep">
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/newsletter/${article.slug}`}
      className={cn(
        'group flex h-full flex-col transition-transform duration-500 ease-premium hover:-translate-y-1.5',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-card">
        <Image media={article.thumbnail} ratio="3/2" zoom className="rounded-card" />
        {/* Ember wash that sweeps in on hover */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-premium group-hover:scale-x-100"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <Badge tone="ocean" className="mb-3 w-fit">
          {article.category}
        </Badge>

        <h3 className="text-h3 leading-snug text-navy-deep transition-colors group-hover:text-ocean">
          {article.title}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-body-sm text-charcoal">{article.excerpt}</p>

        <div className="mt-auto pt-5">
          <Meta article={article} />
        </div>
      </div>
    </Link>
  );
}
