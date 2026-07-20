import type { Media } from '@/types';

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  /**
   * Real portrait, once one exists. Left undefined the card falls back to the person's
   * initials — which is the honest state, and better than the stock faces that used to
   * stand in here: a photograph of somebody else beside a named executive is a factual
   * error on a corporate page, not a placeholder.
   */
  photo?: string | Media;
  /** Shown when the card is expanded. Optional — the card collapses to name + role. */
  biography?: string;
}

export interface LeadershipGroup {
  id: string;
  /** Rendered in regular weight, ahead of `titleStrong`. */
  titleLead: string;
  titleStrong: string;
  members: LeaderProfile[];
}

/**
 * The published leadership team.
 *
 * Transcribed from the organisation chart supplied by the business, so this is the
 * authority for names and titles — not `employees.ts`, whose group-level entries are
 * placeholder personas used by the directory and the reporting tree.
 *
 * `photo` accepts either a bare path or a full `Media` object. A bare path is the common
 * case and takes the person's name as its alt text; pass `Media` when the portrait needs
 * its own alt, caption or credit. Omit it entirely and the card falls back to initials.
 */
export const leadershipGroups: LeadershipGroup[] = [
  {
    id: 'group-management',
    titleLead: 'Searah Limited',
    titleStrong: 'Management team',
    members: [
      {
        id: 'ldr-ceo',
        name: 'Azahari Mohd Shuid',
        role: 'Group Chief Executive Officer',
        photo: '/team/1.webp',
      },
      {
        id: 'ldr-cfo',
        name: 'Antonio Beniamino Pinto',
        role: 'Group Chief Financial Officer',
        photo: '/team/2.webp',
      },
      {
        id: 'ldr-coo',
        name: 'Nicolò Aggogeri',
        role: 'Group Chief Operating Officer',
        photo: '/team/3.webp',
      },
      {
        id: 'ldr-strategy',
        name: 'Adiana Mastura',
        role: 'Group Corporate Strategy & Services Officer',
        photo: '/team/4.webp',
      },
    ],
  },
  {
    id: 'opco-ceos',
    titleLead: 'Operating Companies',
    titleStrong: 'Chief Executive Officers',
    members: [
      {
        id: 'ldr-smy',
        name: 'Mohd Johan Ariff Mohd Supian',
        role: 'CEO of Operating Company Malaysia',
        photo: '/team/5.webp',
      },
      {
        id: 'ldr-skt',
        name: 'Yuzaini Md Yusof',
        role: 'CEO of Operating Company Ketapang',
        photo: '/team/6.webp',
      },
      {
        id: 'ldr-smb',
        name: 'Mirko Araldi',
        role: 'CEO of Operating Company Muara Bakau',
        photo: '/team/7.webp',
      },
    ],
  },
];
