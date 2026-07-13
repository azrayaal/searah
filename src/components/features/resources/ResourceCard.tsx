import { Download, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { Resource } from '@/types';

interface ResourceCardProps {
  resource: Resource;
  /** `list` is the dense table-like row; `grid` is the tiled card. */
  variant?: 'grid' | 'list';
  className?: string;
}

/** File-type chip. The extension is content, so it is never mapped to a fixed list. */
function TypeMark({ type, className }: { type: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 shrink-0 items-center rounded-btn border border-hairline bg-white px-2 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-navy-deep',
        className,
      )}
    >
      {type}
    </span>
  );
}

function RestrictedMark() {
  return (
    <Badge tone="danger" className="gap-1">
      <Lock className="h-3 w-3" aria-hidden />
      Restricted
    </Badge>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-sky-faint px-2.5 py-1 text-[0.72rem] text-muted ring-1 ring-inset ring-hairline"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function ResourceCard({ resource, variant = 'grid', className }: ResourceCardProps) {
  const {
    title,
    description,
    category,
    type,
    size,
    updatedAt,
    tags,
    owner,
    restricted,
    preview,
  } = resource;

  const download = (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      icon={<Download className="h-[18px] w-[18px]" aria-hidden />}
      iconPosition="left"
      aria-label={`Download ${title}`}
      className="h-11 min-w-[44px]"
    >
      Download
    </Button>
  );

  const meta = (
    <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-muted">
      <div className="flex items-center gap-1.5">
        <dt className="sr-only">File size</dt>
        <dd>{size}</dd>
      </div>
      <span aria-hidden>·</span>
      <div className="flex items-center gap-1.5">
        <dt className="sr-only">Last updated</dt>
        <dd>
          <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
        </dd>
      </div>
      <span aria-hidden>·</span>
      <div className="flex min-w-0 items-center gap-1.5">
        <dt className="sr-only">Owner</dt>
        <dd className="truncate text-navy-deep/70">{owner}</dd>
      </div>
    </dl>
  );

  if (variant === 'list') {
    return (
      <article
        className={cn(
          'group flex flex-col gap-5 border-b border-hairline bg-white px-5 py-6 transition-colors duration-500 last:border-b-0 hover:bg-sky-faint md:flex-row md:items-center md:gap-8 md:px-6',
          className,
        )}
      >
        {preview ? (
          <Image
            media={preview}
            ratio="3/2"
            className="w-full shrink-0 rounded-field md:w-[136px]"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="ocean">{category}</Badge>
            <TypeMark type={type} />
            {restricted ? <RestrictedMark /> : null}
          </div>

          <h3 className="mt-3 text-h3 leading-snug text-navy-deep">{title}</h3>
          <p className="mt-2 line-clamp-2 max-w-prose text-body-sm text-charcoal">{description}</p>

          <div className="mt-3">{meta}</div>
          <div className="mt-3">
            <Tags tags={tags} />
          </div>
        </div>

        <div className="shrink-0 md:pl-4">{download}</div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-white transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:border-ocean/30 hover:shadow-lifted',
        className,
      )}
    >
      {preview ? (
        <div className="relative">
          <Image media={preview} ratio="16/9" zoom />
          {restricted ? (
            <div className="absolute left-3 top-3">
              <RestrictedMark />
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="ocean">{category}</Badge>
          <TypeMark type={type} />
          {restricted && !preview ? <RestrictedMark /> : null}
        </div>

        <h3 className="mt-4 text-h3 leading-snug text-navy-deep">{title}</h3>
        <p className="mt-2.5 line-clamp-3 text-body-sm text-charcoal">{description}</p>

        <div className="mt-5">
          <Tags tags={tags} />
        </div>

        <div className="mt-auto pt-6">
          {meta}
          <div className="mt-5 border-t border-hairline pt-5">{download}</div>
        </div>
      </div>
    </article>
  );
}
