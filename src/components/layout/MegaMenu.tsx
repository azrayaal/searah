import { motion } from 'framer-motion';
import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { EASE } from '@/lib/motion';
import type { NavItem } from '@/types';

interface MegaMenuProps {
  item: NavItem;
  onNavigate: () => void;
}

/** The panel that drops from a primary nav item. Columns come straight from data. */
export function MegaMenu({ item, onNavigate }: MegaMenuProps) {
  if (!item.columns) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute inset-x-0 top-full border-t border-hairline bg-white shadow-floating"
    >
      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div
            className="grid gap-x-10 gap-y-8"
            style={{
              gridTemplateColumns: `repeat(${Math.min(item.columns.length, 4)}, minmax(0, 1fr))`,
            }}
          >
            {item.columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow mb-5 text-ocean">{column.title}</p>
                <ul className="space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <PrefetchLink
                        to={link.href}
                        onClick={onNavigate}
                        className="group -mx-2 flex items-center justify-between gap-3 rounded-btn px-2 py-2 text-body-sm text-navy-deep transition-colors hover:bg-sky-faint hover:text-ocean"
                      >
                        <span>{link.label}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-ocean opacity-0 transition-all duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100"
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
              className="group flex w-full max-w-[320px] flex-col overflow-hidden rounded-card bg-navy text-white shadow-lifted transition-shadow hover:shadow-floating"
            >
              <Image media={item.feature.image} ratio="16/9" zoom overlay />
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow mb-3 text-ember">{item.feature.eyebrow}</p>
                <p className="text-h3 leading-snug text-white">{item.feature.title}</p>
                <p className="mt-2 text-caption text-white/60">{item.feature.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-nav text-white transition-colors group-hover:text-ember">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                </span>
              </div>
            </PrefetchLink>
          ) : null}
        </div>
      </Container>
    </motion.div>
  );
}
