# AGENTS.md — project conventions

## Project
- Name: c.ey artist shop (package name `cey-shop`)
- Developer: James (Kim Consultant)
- Stack: React 19, Vite, TypeScript (strict), Tailwind CSS v4, Motion (the `motion` package, NOT framer-motion), Playwright (dev dependency, used for screenshots)
- Planned (not installed yet): Express + Stripe Checkout (phase 2), Railway (phase 3)
- Repo: github.com/HamesInFlames/Cey-ecommerce

## What this is
A custom ecommerce site for the artist c.ey. It replicates a hand-drawn mockup
**exactly**, with a platform-free checkout (no Wix/GoDaddy/Shopify).
The detailed design spec is `reference/cey-build-reference.md`.
**Read it before writing any UI code.**
When any instruction conflicts with `reference/cey-mockup-full.jpg`, the mockup wins.

## Commands
- Dev: `npm run dev` (http://localhost:5173)
- Build: `npm run build` (typecheck, then Vite build to `dist/`)
- Typecheck: `npm run typecheck`
- Preview: `npm run preview`
- Screenshots: `node scripts/screenshot.mjs` (writes `screenshots/` at 1178 / 1000 / 430px)
- Test: none
- Lint: none

## Layout
- `src/components/` — UI components
- `src/data/products.ts` — local product data (id, name, priceCents in CAD, image, description)
- `reference/` — design spec, mockup and typography demo
- `scripts/screenshot.mjs` — verification screenshots
- `public/` — static assets

## Handoff pack (expected in `reference/`)
- `cey-build-reference.md` — full design spec: layout anatomy, tokens, copy
- `cey-mockup-full.jpg` — master mockup (1178×1399), source of truth
- `cey-hero-lockup.png` — hero block as designed (use as one image)
- `cey-logo-transparent.png` — header signature, transparent bg (top bar + favicon)
- `cey-signature.png` — big signature crop (reference only)
- `cey-logo-topbar.png` — original header crop (reference only)
- `cey-typography.html` — live type-system demo

## Stack rules (fixed — do not re-derive)
- React 19 + Vite + TypeScript (strict) + Tailwind + Motion + Express + Railway.
- Repo under GitHub org `HamesInFlames`.
- Setup ritual, in order, before component work:
  1. Scaffold Vite React-TS app; `npm install motion`
  2. Clone `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git` and use its `search.py` to lock style/typography/color decisions up front
  3. Install 21st.dev components (`@21st-dev/magic-mcp` or relevant packages)

## Design tokens (non-negotiable; full spec in the reference doc)
```css
:root{
  --pink-topbar:#F9E8EA; --pink-sidebar:#F6E8EB; --pink-marquee:#FBECEF;
  --paper-hero:#FFFDFE;  --paper-grid:#FCFAF9;   --paper-footer:#F0E9EA;
  --ink:#5C5151;         --ink-soft:#8D8B8B;     --ink-pencil:#BFB0B3;
  --grid-line:#F3CBD8;
}
```
- "Black" is warm charcoal `#5C5151` — never `#000`.
- Fonts (Google): `Ms Madi` (script fallback), `Gochi Hand` (nav/labels — lowercase always, tracking .38em nav / .22em labels), `Annie Use Your Telescope` (prices, marquee, footer note), `Zen Maru Gothic` (body, forms, cart, checkout — ALL purchase-critical text).
- The logo is the image `cey-logo-transparent.png`, never typeset.
- Doodle/hand-drawn icons only (cart, arrows) — no geometric icon fonts.
- Motion: marquee drift, 3px card lift with −1° tilt, soft fades. No scroll-hijacking. `prefers-reduced-motion` respected globally.

## Build phases (work in this order; finish and verify each before the next)

### Phase 1 — pixel-faithful replica (static) — DONE
- Verified at 1178px: page height 1399 (exact match), top bar 40, hero band 390, marquee 35, 4 columns × 205px cards, footer at the page foot.
- Capture fresh comparisons with `node scripts/screenshot.mjs`.
- Placeholder product tiles (`src/components/PlaceholderTile.tsx`) stand in until real photos arrive. Swap them for `<img>` once `product.image` is populated.
- Spec: rebuild the mockup exactly per `reference/cey-build-reference.md` §4: top bar, hero (ship `cey-hero-lockup.png` as one `<img>` for now), scroll-text marquee, sidebar nav (catalogue/about/contact/events) + 4-column product grid with graph-paper fade, footer with the exact line `i dunno what im doing`.
- Product data is local TS (`src/data/products.ts`): id, name, priceCents (CAD), image, description.
- Responsive per spec §5 (4→3→2 cols; sidebar → pill row at 768px and below).
- Verify: side-by-side screenshot vs mockup at 1178px width.

### Phase 2 — cart + Stripe Checkout (platform-free commerce)
- Cart: React context + `localStorage` persistence. Drawer opens from the drawn cart icon. All cart/checkout text in Zen Maru Gothic.
- Checkout: `POST /api/checkout` (Express) creates a Stripe Checkout Session from cart line items — `currency: 'cad'`, `shipping_address_collection` (CA at launch), flat-rate `shipping_options`, success/cancel URLs back to the site. Stripe hosts the payment page (cards, Apple/Google Pay, receipts, PCI).
- Orders: Stripe dashboard is the order book at launch. Add `POST /api/webhook` for `checkout.session.completed` → email notification to the artist (free email-relay service is fine; no database needed at this scale).
- Secrets: `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in `.env` only — gitignored, set as Railway variables in production. Never hardcode.
- No monthly fees anywhere: costs are Stripe's per-transaction fee only (~2.9% + C$0.30 domestic). If the shop later needs real inventory/admin, the upgrade path is self-hosted Medusa — do not add it now.

### Phase 3 — QA + deploy
- Playwright + axe + Lighthouse pass; keyboard focus visible (dashed charcoal outline); 0 npm vulnerabilities.
- Asset pass: re-export hero/product images as WebP, target 200KB or less each, lean repo overall.
- Deploy: Railway (Express serves the built frontend + API). Contact form (if the contact page ships now) via a free email-relay form service.

## Copy rules
- Use the mockup's exact strings (inventory in reference doc §7).
- The shop's voice is lowercase, casual, self-deprecating. Keep `i dunno what im doing` verbatim in the footer.
- Pages beyond the catalogue (about/contact/events) get placeholder content clearly marked `TODO: artist copy`.

## Open items (blockers to flag, not to guess)
- Artist's layered source file (Procreate/PSD) → high-res transparent signature + heart art for a layered hero rebuild
- Real product photos (lace/pearl fabric styling, per the mockup)
- Instagram handle URL for the top-bar link
- Final product list + prices (mockup shows $5.00 stickers)
- Shipping rates to charge (flat rate vs free-over-threshold)
- About / contact / events page copy

## Workflow
- Read tasks/todo.md before starting work
- Update tasks/status.md after each session
- Log decisions in tasks/decisions.md
- Run `npm run build` before committing
- Always deliver complete, runnable file versions — no partial snippets
- Don't invent design decisions: mockup first, `cey-build-reference.md` second, ask third
- Track progress against the phases above; when a step is done, mark it and continue from the updated state

## Do NOT
- Change existing styling, copy or behaviour the task did not ask about
- Install packages without documenting in tasks/decisions.md
- Modify deployment config without approval
- Delete .env files
- Use `#000` for text or ink (use `#5C5151`)
- Hardcode Stripe keys or any secret

## Lessons
<!-- added by /kc-workflow:reflect -->
