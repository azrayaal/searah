import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Image } from '@/components/ui/Image';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import type { LeaderProfile, LeadershipGroup } from '@/data/leadership';
import type { Media } from '@/types';

/**
 * Leadership board.
 *
 * Carries the chrome of the organisation chart node it replaced — white card, hairline
 * border, navy name over charcoal role, centred — so the two read as the same object
 * even though the reporting tree is gone. Keeping that register also means the board
 * sits correctly beside the rest of the site's light sections rather than punching a
 * blue band through them.
 *
 * The portrait is a small round avatar rather than a bleed: on a white card a
 * full-width photograph would dominate the name, which is the one thing the card exists
 * to carry.
 *
 * The toggle is a real control, not an ornament: it opens the biography where one
 * exists. A card with nothing to show does not render it, because a button that does
 * nothing is worse than no button.
 */
/**
 * First and last initials. Middle names are skipped rather than included — "Mohd Johan
 * Ariff Mohd Supian" would otherwise produce four letters and blow out the circle.
 */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();

  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

/**
 * `photo` may be a bare path or a full `Media`. Normalising here rather than at each
 * call site means the data file can use whichever is less noise for the entry — and a
 * bare path gets the person's name as alt text, which is the only sensible default for
 * a portrait.
 */
function toMedia(photo: LeaderProfile['photo'], name: string): Media | null {
  if (!photo) return null;
  return typeof photo === 'string' ? { src: photo, alt: name } : photo;
}

function LeaderCard({ leader }: { leader: LeaderProfile }) {
  const [open, setOpen] = useState(false);
  const t = useTranslation();
  const hasBio = Boolean(leader.biography);
  const portrait = toMedia(leader.photo, leader.name);

  return (
    <article
      className="group relative flex h-full flex-col items-center rounded-card border border-hairline
                 bg-white p-6 text-center transition-colors duration-300
                 hover:border-ocean/40 hover:bg-sky-faint"
    >
      {hasBio ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={`${open ? t('Close') : t('See more')} — ${leader.name}`}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full
                     border border-hairline text-muted transition-colors hover:border-ocean hover:text-ocean"
        >
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </button>
      ) : null}

      {portrait ? (
        <Image
          media={portrait}
          ratio="1/1"
          zoom
          className="w-20 shrink-0 rounded-full ring-1 ring-hairline"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-sky-faint
                     text-[1.15rem] font-bold text-ocean ring-1 ring-hairline"
        >
          {initials(leader.name)}
        </span>
      )}

      <h3 className="mt-5 text-body-sm font-bold leading-snug text-navy-deep transition-colors group-hover:text-ocean">
        {leader.name}
      </h3>
      <p className="mt-1.5 text-caption leading-snug text-charcoal">{t(leader.role)}</p>

      {hasBio && open ? (
        <p className="mt-4 border-t border-hairline pt-4 text-caption leading-[1.55] text-muted">
          {leader.biography}
        </p>
      ) : null}
    </article>
  );
}

/**
 * Column count follows the group size so a four-person row and a three-person row each
 * fill their width, rather than leaving one card orphaned in a fixed grid.
 */
function columnsFor(count: number): string {
  if (count <= 3) return 'sm:grid-cols-2 lg:grid-cols-3';
  return 'sm:grid-cols-2 lg:grid-cols-4';
}

export function LeadershipBoard({
  groups,
  className,
}: {
  groups: LeadershipGroup[];
  className?: string;
}) {
  const t = useTranslation();

  return (
    <section className={cn('bg-white py-16 lg:py-20', className)}>
      <Container>
        <div className="flex flex-col gap-14 lg:gap-20">
          {groups.map((group) => (
            <div key={group.id}>
              {/* Two weights on one line: the qualifier stays light, the subject takes
                  the bold — the same device the reference uses to name a team without
                  spending a second heading level on it. */}
              <h2 className="text-[1.6rem] font-normal leading-[1.2] text-navy-deep md:text-[2rem]">
                {t(group.titleLead)} <span className="font-bold">{t(group.titleStrong)}</span>
              </h2>

              <div className={cn('mt-8 grid grid-cols-1 gap-4 lg:mt-10', columnsFor(group.members.length))}>
                {group.members.map((member, index) => (
                  <Reveal key={member.id} delay={(index % 4) * 0.06} once className="h-full">
                    <LeaderCard leader={member} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
