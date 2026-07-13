import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  meta?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Id of the item open on first render. */
  defaultOpen?: string;
}

export function Accordion({ items, className, defaultOpen }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className={cn('divide-y divide-hairline border-y border-hairline', className)}>
      {items.map((item) => {
        const open = openId === item.id;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`panel-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="flex-1">
                  {item.meta ? (
                    <span className="mb-1 block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ocean">
                      {item.meta}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      'block text-[1.0625rem] font-semibold leading-snug transition-colors',
                      open ? 'text-ocean' : 'text-navy-deep group-hover:text-ocean',
                    )}
                  >
                    {item.question}
                  </span>
                </span>

                <span
                  className={cn(
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-premium',
                    open
                      ? 'rotate-45 border-ocean bg-ocean text-white'
                      : 'border-hairline text-navy-deep group-hover:border-ocean group-hover:text-ocean',
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={`panel-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-7 pr-14 text-body-sm text-charcoal">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
