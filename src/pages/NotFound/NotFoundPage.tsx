import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { ArrowRight, Home } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { useSeo } from '@/hooks';
import { Icon } from '@/lib/icons';
import { homepage } from '@/data/homepage';
import { footer } from '@/data/footer';
import { site } from '@/data/site';

export default function NotFoundPage() {
  useSeo({
    title: 'Page not found',
    description: `The page you asked for is not on the ${site.name} portal. Use the links below to find what you need.`,
  });

  const quickLinks = homepage.quickAccess.links;

  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy pt-[68px] lg:pt-[104px]">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-deep via-navy to-[#0d3d5c]"
          aria-hidden
        />
        <div className="hairline-grid absolute inset-0 -z-10 opacity-40" aria-hidden />

        <Container className="on-dark py-20 lg:py-30">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4 text-ember">
              <span className="h-px w-8 bg-ember/60" aria-hidden />
              Error 404
            </p>

            <h1 className="text-[2.5rem] font-normal leading-[1.1] text-white md:text-[3.5rem] lg:text-[4.5rem]">
              This page is not part of the {site.name} portal.
            </h1>

            <p className="mt-6 max-w-2xl text-body-sm text-white/70 md:text-body">
              The address may have changed, the content may have been withdrawn, or the link that
              brought you here may be out of date. Nothing has gone wrong with the site — start
              again from one of the routes below.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink
                href="/"
                variant="onDark"
                size="lg"
                icon={<Home className="h-[18px] w-[18px]" aria-hidden />}
                iconPosition="left"
              >
                Back to the homepage
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Quick access */}
      <Section tone="white">
        <SectionHeader
          eyebrow={homepage.quickAccess.intro.eyebrow}
          title={homepage.quickAccess.intro.title}
          description={homepage.quickAccess.intro.description}
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
        >
          {quickLinks.map((link) => (
            <RevealItem as="li" key={link.id} className="bg-white">
              <PrefetchLink
                to={link.href}
                className="group flex h-full min-h-[44px] flex-col p-6 transition-colors duration-500 hover:bg-sky-faint lg:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-deep/5 text-navy-deep transition-colors group-hover:bg-ocean/10 group-hover:text-ocean">
                    <Icon name={link.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <ArrowRight
                    className="h-[18px] w-[18px] text-muted transition-transform duration-300 ease-premium group-hover:translate-x-1 group-hover:text-ocean"
                    aria-hidden
                  />
                </span>

                <span className="mt-6 block text-[1.0625rem] font-bold text-navy-deep transition-colors group-hover:text-ocean">
                  {link.label}
                </span>
                <span className="mt-2 block text-caption text-muted">{link.description}</span>
              </PrefetchLink>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Full site index, from the footer columns */}
      <Section tone="faint" spacing="tight">
        <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footer.columns.map((column) => (
            <RevealItem key={column.title}>
              <h2 className="text-caption font-bold uppercase tracking-[0.08em] text-muted">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <PrefetchLink
                      to={link.href}
                      className="flex min-h-[44px] items-center text-body-sm text-navy-deep transition-colors hover:text-ocean"
                    >
                      {link.label}
                    </PrefetchLink>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
