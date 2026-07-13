import { useMemo, useState } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { OrgTree, countNodes } from '@/components/features/organisation/OrgTree';
import { useSeo } from '@/hooks';
import { getScope, orgScopes } from '@/data/organization';
import { site } from '@/data/site';

export default function OrganisationPage() {
  useSeo({
    title: 'Organisation Chart',
    description: `Explore the ${site.name} reporting structure across the group and each operating entity.`,
  });

  const [scopeId, setScopeId] = useState(orgScopes[0].id);
  const scope = getScope(scopeId);

  const tabs: TabItem[] = useMemo(
    () =>
      orgScopes.map((item) => ({
        id: item.id,
        label: item.label,
        count: countNodes(item.root),
      })),
    [],
  );

  const headcount = countNodes(scope.root);

  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Organisation Chart"
        description={`The reporting line across ${site.legalName} — switch scope to follow a single operating entity, and open any name to see their profile in the directory.`}
        breadcrumb={[{ label: 'Organisation Chart', href: '/organisation' }]}
      />

      <Section tone="white" spacing="tight">
        <Tabs
          items={tabs}
          value={scopeId}
          onChange={setScopeId}
          layoutKey="organisation-scope"
        />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Reveal className="max-w-prose">
            <h2 className="text-h3 text-navy-deep">{scope.label}</h2>
            <p className="mt-2 text-body-sm text-charcoal">{scope.description}</p>
          </Reveal>

          <Reveal
            preset="fadeIn"
            className="shrink-0 rounded-field border border-hairline bg-sky-faint px-6 py-4"
          >
            <p className="text-[1.75rem] font-bold leading-none text-navy-deep">
              <Counter value={headcount} />
            </p>
            <p className="mt-1.5 text-caption text-muted">People in this reporting line</p>
          </Reveal>
        </div>

        <div className="mt-10">
          {/* Keyed by scope so the expand state resets when the tree changes */}
          <OrgTree key={scope.id} root={scope.root} />
        </div>
      </Section>
    </>
  );
}
