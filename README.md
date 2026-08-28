# c.ey artist shop

A custom ecommerce site for the artist **c.ey** — a pixel-faithful rebuild of the
hand-drawn mockup in [`reference/cey-mockup-full.jpg`](reference/cey-mockup-full.jpg),
with a platform-free checkout (no Wix, GoDaddy, or Shopify; no monthly fees).

## Stack

React 19 · Vite · TypeScript (strict) · Tailwind CSS v4 · [Motion](https://motion.dev)
· Express + Stripe Checkout (phase 2) · Railway (phase 3)

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The shop runs at `http://localhost:5173`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | Types only, no emit |
| `node scripts/screenshot.mjs` | Capture `screenshots/` at 1178 / 1000 / 430px |

## Design rules

The mockup is the source of truth. When it and the written spec disagree, the
mockup wins. Full spec: [`reference/cey-build-reference.md`](reference/cey-build-reference.md).

- **"Black" is warm charcoal `#5C5151`** — never `#000`. True black breaks the
  hand-drawn feel instantly.
- Four typefaces, each with one job: `Ms Madi` (script fallback), `Gochi Hand`
  (nav and labels, always lowercase), `Annie Use Your Telescope` (prices,
  marquee, footer), `Zen Maru Gothic` (body and **all** purchase-critical text —
  cart, forms, checkout never use handwriting).
- The logo is the image `cey-logo-transparent.png`, never typeset.
- Doodle icons only. No geometric icon fonts.
- Motion is gentle and sparse, and `prefers-reduced-motion` is respected globally.

Colour tokens live in [`src/index.css`](src/index.css) under `@theme`.

## Build phases

- [x] **Phase 1 — pixel-faithful static replica.** Top bar, hero, marquee,
      sidebar nav, 4-column product grid with graph-paper fade, footer.
      Verified against the mockup at 1178px: page height, section bands, column
      count and card size all match.
- [ ] **Phase 2 — cart + Stripe Checkout.** React context + `localStorage`,
      drawer from the cart icon, Express `POST /api/checkout` creating a Stripe
      Checkout Session in CAD, `POST /api/webhook` emailing the artist on
      `checkout.session.completed`.
- [ ] **Phase 3 — QA + deploy.** Playwright + axe + Lighthouse, WebP asset pass
      (≤200KB each), Railway deploy with Express serving `dist/` and the API.

## Waiting on the artist

These are flagged, not guessed. Placeholders are marked `TODO` in the source.

- Layered source file (Procreate/PSD) → high-res transparent signature and heart
  art, so the hero can be rebuilt as layers instead of one flat PNG
- Real product photos, shot on the lace/pearl fabric for grid consistency
- Instagram handle URL for the top-bar link
- Final product list and prices (the mockup shows `$5.00` stickers)
- Shipping rates — flat rate, or free over a threshold
- About / contact / events page copy

## Costs

No monthly fees. The only cost is Stripe's per-transaction fee (~2.9% + C$0.30
domestic). If the shop later needs real inventory and an admin UI, the upgrade
path is self-hosted Medusa — deliberately not added now.
