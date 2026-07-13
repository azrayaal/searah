import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
  /** `mount` animates immediately (hero); `scroll` waits for the viewport. */
  trigger?: 'scroll' | 'mount';
}

/**
 * Words rise out of a mask, one after another. Reserved for statement headlines —
 * applying it to body copy would be noise.
 */
export function TextReveal({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  trigger = 'scroll',
}: TextRevealProps) {
  const words = text.split(' ');
  const viewportProps =
    trigger === 'scroll'
      ? ({ whileInView: 'visible', viewport: { once: true, amount: 0.4 } } as const)
      : ({ animate: 'visible' } as const);

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: delay, staggerChildren: 0.045 } },
        }}
        {...viewportProps}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={cn(
              'inline-block overflow-hidden pb-[0.09em] align-bottom',
              index < words.length - 1 && 'mr-[0.26em]',
            )}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
