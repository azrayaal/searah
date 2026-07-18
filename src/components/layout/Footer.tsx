import { PrefetchLink } from '@/components/ui/PrefetchLink';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/lib/icons';
import { LogoMark } from './Logo';
import { site, companyFacts } from '@/data/site';
import type { FooterContent } from '@/types';

interface FooterProps {
  content: FooterContent;
}

/** Brand gradient for the footer field, running light to dark across the diagonal. */
const FOOTER_GRADIENT =
  'linear-gradient(135deg, #134297 0%, #0F3C8E 20%, #0B3785 40%, #07317C 60%, #032B74 80%, #00266B 100%)';

export function Footer({ content }: FooterProps) {
  return (
    <footer className="on-dark text-white" style={{ background: FOOTER_GRADIENT }}>
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="text-[1.4rem] font-bold leading-none text-white">{site.name}</p>
                <p className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {site.descriptor}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-body-sm text-white/60">{site.description}</p>

            <address className="mt-8 not-italic">
              {content.address.map((line) => (
                <p key={line} className="text-caption text-white/50">
                  {line}
                </p>
              ))}
            </address>

            <ul className="mt-8 flex gap-2">
              {content.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white"
                  >
                    <Icon name={social.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-6">
            {content.columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow mb-5 text-white/40">{column.title}</p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <PrefetchLink
                        to={link.href}
                        className="text-caption text-white/70 transition-colors hover:text-ember"
                      >
                        {link.label}
                      </PrefetchLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Shareholder rail */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35">
              Shareholders
            </span>
            {content.shareholders.map((shareholder) => (
              <span key={shareholder.name} className="text-body-sm font-semibold text-white/85">
                {shareholder.name}
                <span className="ml-2 text-caption font-normal text-white/40">
                  {shareholder.share}
                </span>
              </span>
            ))}
          </div>

          <p className="text-caption text-white/40">
            {companyFacts.assets.total} assets · {companyFacts.assets.indonesia} Indonesia ·{' '}
            {companyFacts.assets.malaysia} Malaysia
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-caption text-white/40">{content.copyright}</p>
          <ul className="flex flex-wrap items-center gap-6">
            {content.legal.map((link) => (
              <li key={link.href + link.label}>
                <PrefetchLink
                  to={link.href}
                  className="text-caption text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </PrefetchLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
