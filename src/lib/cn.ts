import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge must be told about our custom font-size scale. Without this it reads
 * `text-body-sm` as a *colour* utility and silently drops a preceding `text-white`,
 * which is how a navy button ends up with charcoal text.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['display', 'h2', 'h3', 'body', 'body-sm', 'label', 'nav', 'caption'],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
