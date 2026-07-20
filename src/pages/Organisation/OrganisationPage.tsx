import { PageHero } from '@/components/layout/PageHero';
import { LeadershipBoard } from '@/components/features/organisation/LeadershipBoard';
import { leadershipGroups } from '@/data/leadership';
import { useSeo } from '@/hooks';
import { site } from '@/data/site';

/**
 * Organisation chart.
 *
 * The generated reporting tree that used to sit below has been removed. It was built
 * from `employees.ts`, which holds placeholder personas — so the page was publishing a
 * hierarchy of people who do not hold those roles, under a heading that invited readers
 * to believe it. An invented reporting line is worse than none.
 *
 * `OrgTree.tsx` and `data/organization.ts` are left in the repository, unreferenced, so
 * the tree can be restored once real reporting lines exist to feed it.
 */
export default function OrganisationPage() {
  useSeo({
    title: 'Organisation Chart',
    description: `The leadership structure of ${site.legalName} — the group management team and the chief executives of each operating company.`,
  });

  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Organisation Chart"
        description={`The management team of ${site.legalName}, and the chief executives leading each operating company.`}
        breadcrumb={[{ label: 'Organisation Chart', href: '/organisation' }]}
      />

      <LeadershipBoard groups={leadershipGroups} />
    </>
  );
}
