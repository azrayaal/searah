# Searah — Corporate Portal

Enterprise portal for **Searah**, an upstream oil & gas joint venture between **Eni (50%)** and **PETRONAS (50%)**, operating 19 assets across Indonesia (14) and Malaysia (5).

React 19 · TypeScript · TailwindCSS · React Router · Framer Motion · Lucide.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run preview
npm run generate:map   # regenerates src/data/mapGeometry.ts from Natural Earth coastlines
```

## Architecture

The rule that governs this codebase: **components never know where data comes from.**

```
src/
  data/        every string, figure and image path on the site — the CMS boundary
  types/       the contract between data and UI
  components/
    ui/        design-system primitives (Button, Section, Modal, Tabs, …)
    layout/    Navbar + mega menu, Footer, PageHero, Layout shell
    features/  domain components (home, assets, newsletter, directory, …)
  pages/       one folder per route; each page is lazy-loaded
  hooks/       useCollection (search + facets), usePagination, useCountUp, useSeo, …
  lib/         cn, motion presets, formatters, icon registry
  routes/      AppRouter with route-level code splitting
  styles/      Tailwind layers and design tokens
```

### Migrating to a CMS

Every page imports from `src/data/*` and passes plain props down. Components hold **no** literal
content. To move to Payload / Strapi / Contentful / Sanity / Directus / a custom API, replace the
modules in `src/data/` with functions that return the same shapes declared in `src/types/index.ts`.
No component changes.

Cross-references are by id, exactly as a CMS relation field would be:

| Relation | Where |
|---|---|
| Article → Entity | `NewsArticle.entityId` (`'SM' \| 'SK' \| 'SMB' \| null`) — entity pages call `getArticlesByEntity()`, so a newsletter tagged `SM` appears on `/entity/SM` automatically |
| Asset → Entity | `Asset.entityId` |
| Entity → Resources | `Entity.downloads: ID[]` → `getResourcesByIds()` |
| Employee → Employee | `Employee.reportsTo` — the org chart is *derived* from this, never hand-maintained |
| Org node → Directory | `/directory?person=emp-010` deep-links straight to a profile |

Icons are stored as **strings** (`icon: 'ShieldCheck'`) and resolved at render by `src/lib/icons.tsx`,
so a CMS editor can pick an icon without a code change.

## Pages

`/` · `/about` · `/assets` · `/entity/:code` (SM, SK, SMB) · `/newsletter` · `/newsletter/:slug` ·
`/organisation` · `/resources` · `/directory` · `/services` · `/emergency` · `/legal/:slug` · `/faq`

Deep links pre-apply their filters: `/assets?country=Indonesia`, `/newsletter?entity=SM`,
`/resources?category=Policies`, `/services?category=IT`.

## Design system

Tokens live in `tailwind.config.js`:

- **Navy** `#11304A` / **Deep navy** `#0A1D48` — structure, footers, dark sections
- **Ocean** `#00649D` — every interactive element and hover state
- **Ember** `#F2A03D` — the accent drawn from the Searah mark (gold → flame)
- Inter throughout; 8px spacing base; radii 6 (button) / 8 (input) / 24 (card); four elevation levels

## Assets

Photography lives in `public/media/`. The logo is drawn inline as SVG in
`src/components/layout/Logo.tsx` — swap it for the official artwork by pointing `site.logo` at files
in `public/assets/`.
# searah
