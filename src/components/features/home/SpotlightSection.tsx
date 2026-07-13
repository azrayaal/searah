import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import type { HomepageContent } from '@/types';

interface SpotlightSectionProps {
  content: HomepageContent['spotlight'];
}

/** Full-bleed statement section with a parallax image column. */
export function SpotlightSection({ content }: SpotlightSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="on-dark relative overflow-hidden bg-navy-deep">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-[640px]">
          <motion.div style={{ y }} className="absolute inset-0 -top-[8%] h-[116%]">
            <Image
              media={content.image}
              ratio="auto"
              className="h-full"
              imgClassName="h-full w-full"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 via-transparent to-navy-deep lg:from-navy-deep/30"
            aria-hidden
          />
        </div>

        <div className="flex items-center py-16 lg:py-26">
          <Container size="narrow" className="lg:max-w-[620px] lg:pl-16 3xl:pl-24">
            <Reveal preset="fadeLeft">
              <p className="eyebrow mb-5 text-ember">
                <span className="h-px w-8 bg-ember/60" aria-hidden />
                {content.eyebrow}
              </p>

              <h2 className="text-[1.75rem] font-bold leading-[1.2] text-white md:text-h2">
                {content.title}
              </h2>

              <p className="mt-6 text-body-sm text-white/65 md:text-body">{content.body}</p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {content.stats.map((stat) => (
                  <div key={stat.label} className="border-t border-white/15 pt-4">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-[1.5rem] font-bold text-ember">{stat.value}</span>
                      <span className="mt-1.5 block text-caption text-white/50">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <ButtonLink
                href={content.cta.href}
                variant="onDark"
                size="lg"
                className="mt-10"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {content.cta.label}
              </ButtonLink>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
