import { motion } from 'framer-motion';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/Image';
import { EASE } from '@/lib/motion';
import type { NavItem } from '@/types';

interface MegaMenuProps {
  item: NavItem;
  onNavigate: () => void;
}

/**
 * The panel that drops from a primary nav item. It is anchored to the nav pill and takes
 * its width from it, so it can never run wider than the bar that opened it — which also
 * means the promoted card has to lie down as a row rather than stand as a 320px column.
 */
export function MegaMenu({ item, onNavigate }: MegaMenuProps) {
  if (!item.columns) return null;

  const columns = item.columns.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      /* Frosted like the pill that opens it — the same pane of glass, not a white sheet
         dropped behind it. */
      className="absolute left-0 right-0 top-full z-10 mt-3 origin-top overflow-hidden rounded-card border border-white/50 bg-white/85 p-6 shadow-floating backdrop-blur-2xl"
    >
      <div
        className="grid gap-x-6 gap-y-6"
        style={{ gridTemplateColumns: `repeat(${Math.min(columns, 3)}, minmax(0, 1fr))` }}
      >
        {item.columns.map((column) => (
          <div key={column.title}>
            <p className="eyebrow mb-3 text-ocean">{column.title}</p>
            <ul className="space-y-0.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <PrefetchLink
                    to={link.href}
                    onClick={onNavigate}
                    className="group -mx-2 flex items-start justify-between gap-2 rounded-btn px-2 py-1.5 text-body-sm text-navy-deep transition-colors duration-300 hover:bg-white/70 hover:text-ocean"
                  >
                    {/* Wraps rather than truncates — the panel is narrow by design, and a
                        clipped label is a link the reader can no longer identify. */}
                    <span className="leading-snug">{link.label}</span>
                    <ArrowRight
                      className="mt-1 h-3.5 w-3.5 shrink-0 -translate-x-1 text-ocean opacity-0 transition-all duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {item.feature ? (
        <PrefetchLink
          to={item.feature.href}
          onClick={onNavigate}
          className="group mt-5 flex items-center gap-4 rounded-field border border-white/60 bg-navy/90 p-3 text-white shadow-raised backdrop-blur-xl transition-shadow duration-300 hover:shadow-lifted"
        >
          <Image
            media={item.feature.image}
            ratio="1/1"
            className="w-16 shrink-0 rounded-field"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-caption font-bold uppercase tracking-[0.1em] text-ember">
              {item.feature.eyebrow}
            </span>
            <span className="mt-1 block truncate text-body-sm font-bold text-white">
              {item.feature.title}
            </span>
            <span className="mt-0.5 block truncate text-caption text-white/60">
              {item.feature.excerpt}
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 ease-premium group-hover:translate-x-1" />
        </PrefetchLink>
      ) : null}
    </motion.div>
  );
}
