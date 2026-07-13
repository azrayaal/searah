import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
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
}

const ratios: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  auto: '',
};

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
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // A cached image can finish decoding before React attaches onLoad, which would
  // otherwise strand it at opacity 0 forever.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, [media.src]);

  return (
    <div className={cn('relative overflow-hidden bg-navy-deep/10', ratios[ratio], className)}>
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
      {overlay ? <div className="media-overlay absolute inset-0" aria-hidden /> : null}
    </div>
  );
}
