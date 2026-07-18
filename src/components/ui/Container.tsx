import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `wide` removes the reading-width cap for full-bleed grids. */
  size?: 'default' | 'wide' | 'narrow';
  as?: 'div' | 'header' | 'footer' | 'section' | 'nav';
}

const sizes = {
  narrow: 'max-w-[900px]',
  default: 'max-w-container',
  wide: 'max-w-[2400px]',
};

/**
 * The gutter is viewport-relative from `xl` up, so the layout keeps filling the monitor
 * instead of parking a 1440px column in the middle of it — at 2560px that used to leave
 * 560px of empty page on either side. Long-form text is still capped by the prose widths
 * the sections apply themselves, so only the grids and rails grow.
 */
export function Container({ children, className, size = 'default', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-[3.5vw] 3xl:px-[4vw]',
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
