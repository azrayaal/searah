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
  wide: 'max-w-[1680px]',
};

export function Container({ children, className, size = 'default', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 md:px-6 lg:px-8 3xl:px-16', sizes[size], className)}>
      {children}
    </Tag>
  );
}
