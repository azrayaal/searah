import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { EASE } from '@/lib/motion';
import type { HeroContent } from '@/types';

interface HeroBannerProps {
  content: HeroContent;
  /** Milliseconds each slide holds before advancing. */
  interval?: number;
}

/**
 * Full-bleed photographic hero. The frame carries the whole screen, the copy sits in a
 * dark wash on the left so it stays legible over any photograph, and the slide rail sits
 * bottom-left where it cannot be mistaken for content.
 */
export function HeroBanner({ content, interval = 7000 }: HeroBannerProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const slides = content.slides;
  const slide = slides[index];

  useEffect(() => {
    if (!playing || reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion, slides.length, interval]);

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-navy-deep">
      {/* Slow drift on the active frame */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: EASE },
            scale: { duration: 8, ease: 'linear' },
          }}
          className="absolute inset-0 -z-10"
        >
          <Image
            media={slide.image}
            ratio="auto"
            priority
            sizes="100vw"
            className="h-full"
            imgClassName="h-full w-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Wash from the left so the copy holds against any frame behind it */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A1D48] from-0% via-[#0A1D48] via-10% to-transparent to-100%"
        aria-hidden
      />
      {/* <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-deep/80 to-transparent"
        aria-hidden
      /> */}

      <Container className="on-dark relative flex flex-1 flex-col justify-center py-52 lg:pb-40">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h1 className="text-[2.25rem] font-normal leading-[1.1] text-white sm:text-[2.75rem] md:text-[3rem] lg:text-[4rem] lg:leading-[1.08]">
                {slide.title}
              </h1>

              <p className="my-6 max-w-2xl text-body-sm text-white/75 md:text-body">
                {slide.subtitle}
              </p>

              <div className="mt-10">
                <ButtonLink
                  href={slide.cta.href}
                  variant="onDark"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  {slide.cta.label}
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* Slide rail, bottom-left */}
      <Container className="on-dark relative pb-10 lg:pb-12">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((item, position) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={position === index}
                aria-label={item.title}
                onClick={() => setIndex(position)}
                /* 44px tap target with a 4px visual rail inside it */
                className="group relative flex h-11 w-11 items-center justify-center"
              >
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/25" />
                {position === index ? (
                  <motion.span
                    key={`${item.id}-${playing}`}
                    className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
                    /* Ocean into the ember flame — the brand's own sweep, run along the bar */
                    style={{
                      background:
                        'linear-gradient(90deg, #00649D 0%, #F2A03D 50%, #E2622A 100%)',
                    }}
                    initial={{ width: reduceMotion ? '100%' : 0 }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: playing && !reduceMotion ? interval / 1000 : 0,
                      ease: 'linear',
                    }}
                  />
                ) : (
                  <span className="absolute left-0 top-1/2 h-1 w-0 -translate-y-1/2 rounded-full bg-white/60 transition-[width] duration-300 group-hover:w-full" />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors hover:border-white/60 hover:text-white"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
        </div>
      </Container>
    </section>
  );
}
