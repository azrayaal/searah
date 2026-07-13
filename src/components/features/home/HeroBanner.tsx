import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Pause, Play } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { TextReveal } from '@/components/ui/TextReveal';
import { FlowLines } from '@/components/ui/FlowLines';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { HeroContent } from '@/types';

interface HeroBannerProps {
  content: HeroContent;
  /** Milliseconds each slide holds before advancing. */
  interval?: number;
}

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
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-navy-deep pt-[68px] lg:pt-[104px]">
      {/* Slow Ken Burns drift on the active frame */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1, ease: EASE }, scale: { duration: 8, ease: 'linear' } }}
          className="absolute inset-0 -z-10"
        >
          <Image
            media={slide.image}
            ratio="auto"
            priority
            className="h-full"
            imgClassName="h-full w-full"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-600/10 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy-deep to-transparent"
        aria-hidden
      />

      {/* Brand flow motif sweeping across the frame */}
      <FlowLines className="-z-10 opacity-70" colour="rgba(214,240,255,0.20)" />

      <Container className="on-dark relative flex flex-1 flex-col justify-center py-16 lg:py-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="eyebrow mb-6 text-ember">
                <span className="h-px w-10 bg-ember/60" aria-hidden />
                {slide.eyebrow}
              </p>

              <TextReveal
                as="h1"
                text={slide.title}
                trigger="mount"
                className="text-[2.25rem] font-normal leading-[1.1] text-white sm:text-[2.75rem] md:text-[3rem] lg:text-[4rem] lg:leading-[1.08]"
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
                className="mt-6 max-w-2xl text-body-sm text-white/75 md:text-body"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <ButtonLink
                  href={slide.primaryCta.href}
                  variant="onDark"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  {slide.primaryCta.label}
                </ButtonLink>

                {slide.secondaryCta ? (
                  <ButtonLink
                    href={slide.secondaryCta.href}
                    size="lg"
                    className="border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/5"
                  >
                    {slide.secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute bottom-6 right-0 hidden lg:block"
        >
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white/70"
          >
            <ArrowDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </motion.div>
      </Container>

      {/* Bottom rail: slide controls on the left, company facts on the right */}
      <div className="relative border-t border-white/10 bg-navy-deep/40 backdrop-blur-sm">
        <Container className="on-dark flex flex-col gap-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
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
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/20" />
                  {position === index ? (
                    <motion.span
                      key={`${item.id}-${playing}`}
                      className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-ember"
                      initial={{ width: reduceMotion ? '100%' : 0 }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: playing && !reduceMotion ? interval / 1000 : 0,
                        ease: 'linear',
                      }}
                    />
                  ) : (
                    <span className="absolute left-0 top-1/2 h-1 w-0 -translate-y-1/2 rounded-full bg-white/50 transition-[width] duration-300 group-hover:w-full" />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
            >
              {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:gap-x-10">
            {content.highlights.map((highlight, position) => (
              <div
                key={highlight.label}
                className={cn(
                  'lg:border-l lg:border-white/10 lg:pl-6',
                  position === 0 && 'lg:border-l-0 lg:pl-0',
                )}
              >
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/45">
                  {highlight.label}
                </dt>
                <dd className="mt-1 text-[1.0625rem] font-bold text-white">{highlight.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
