import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import mediaWidths from '@/data/mediaWidths.json';
import type { Media } from '@/types';

interface ImageProps {
  media: Media;
  className?: string;
  imgClassName?: string;
  /** `zoom` applies a slow scale on hover of the nearest `.group` ancestor. */
  zoom?: boolean;
  ratio?: '16/9' | '4/3' | '3/2' | '1/1' | '3/4' | 'auto';
  priority?: boolean;
  overlay?: boolean;
  /** Rendered width of the image, so the browser can pick the smallest usable variant. */
  sizes?: string;
}

const ratios: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  auto: '',
};

const widthsByName = mediaWidths as Record<string, number[]>;

/**
 * The WebP variants written by `npm run optimize:media`. A photo the layout renders at
 * ~400px then costs ~15 KB instead of the ~300 KB full-size JPEG it used to pull.
 * Falls back to the plain <img src> for anything outside /media (or not yet generated).
 */
function webpSrcSet(src: string) {
  const match = /^\/media\/([^/]+)\.(jpe?g|png)$/i.exec(src);
  const widths = match && widthsByName[match[1]];
  if (!match || !widths) return undefined;

  return widths.map((width) => `/media/${match[1]}-${width}.webp ${width}w`).join(', ');
}

/**
 * Image with a navy placeholder that fades out on load — avoids the flash of
 * empty space on slow connections without shipping a blur-hash pipeline.
 */
export function Image({
  media,
  className,
  imgClassName,
  zoom,
  ratio = '16/9',
  priority,
  overlay,
  sizes,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // A cached image can finish decoding before React attaches onLoad, which would
  // otherwise strand it at opacity 0 forever.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, [media.src]);

  const srcSet = webpSrcSet(media.src);
  const resolvedSizes = sizes ?? (priority ? '100vw' : '(max-width: 768px) 100vw, 50vw');

  return (
    <div className={cn('relative overflow-hidden bg-navy-deep/10', ratios[ratio], className)}>
      <picture>
        {srcSet ? <source type="image/webp" srcSet={srcSet} sizes={resolvedSizes} /> : null}
        <img
          ref={ref}
          src={media.src}
          alt={media.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-[transform,opacity] duration-700 ease-premium',
            loaded ? 'opacity-100' : 'opacity-0',
            zoom && 'group-hover:scale-[1.04]',
            imgClassName,
          )}
        />
      </picture>
      {overlay ? <div className="media-overlay absolute inset-0" aria-hidden /> : null}
    </div>
  );
}
