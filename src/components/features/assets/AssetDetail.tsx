import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { entityIndex } from '@/data/entities';
import type { Asset } from '@/types';

interface AssetDetailProps {
  asset: Asset | null;
  onClose: () => void;
}

const statusTone = {
  Producing: 'ember',
  Development: 'ocean',
  Exploration: 'neutral',
} as const;

export function AssetDetail({ asset, onClose }: AssetDetailProps) {
  return (
    <Drawer open={Boolean(asset)} onClose={onClose} title={asset?.name ?? 'Asset'}>
      {asset ? (
        <div>
          <Image media={asset.image} ratio="16/9" priority />

          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusTone[asset.status]} dot>
                {asset.status}
              </Badge>
              <Badge tone="neutral">{asset.type}</Badge>
              <Badge tone="neutral">{asset.country}</Badge>
            </div>

            <p className="mt-5 text-caption font-semibold uppercase tracking-[0.08em] text-muted">
              {asset.region}
            </p>
            <h3 className="mt-1 text-[1.75rem] font-bold leading-tight text-navy-deep">
              {asset.name}
            </h3>
            <p className="mt-4 text-body-sm text-charcoal">{asset.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-field border border-hairline bg-hairline">
              {[
                { label: 'Production', value: asset.production },
                { label: 'Reserves', value: asset.reserves },
                { label: 'Working interest', value: `${asset.workingInterest}%` },
                { label: 'Water depth', value: asset.waterDepth },
                { label: 'Discovered', value: asset.discoveredIn },
                { label: 'On stream', value: asset.onstream },
              ].map((row) => (
                <div key={row.label} className="bg-white p-4">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-body-sm font-semibold text-navy-deep">{row.value}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-8 text-caption font-bold uppercase tracking-[0.1em] text-ocean">
              Highlights
            </h4>
            <ul className="mt-3 space-y-2.5">
              {asset.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-body-sm text-charcoal">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>

            <Link
              to={`/entity/${asset.entityId}`}
              className="group mt-8 flex items-center justify-between gap-4 rounded-field border border-hairline p-5 transition-colors hover:border-ocean hover:bg-sky-faint"
            >
              <span>
                <span className="block text-caption text-muted">Operated by</span>
                <span className="mt-0.5 block text-body-sm font-semibold text-navy-deep">
                  {entityIndex[asset.entityId]?.name ?? asset.operator}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-ocean transition-transform duration-300 ease-premium group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
}
