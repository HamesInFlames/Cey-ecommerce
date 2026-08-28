# c.ey artist shop — exact-replica build reference

**Goal:** rebuild the attached mockup (`reference/cey-mockup-full.jpg`) as a working
ecommerce site, replicating it **exactly** — same layout, colors, hand-drawn feel,
proportions, and copy. The mockup is the single source of truth; when this document
and the image disagree, follow the image.

**Stack:** React 19 + Vite + TypeScript (strict) + Tailwind + Motion (`motion`
package, not framer-motion). Repo under the `HamesInFlames` GitHub org.

---

## 1 · Reference assets (in `/reference`)

| File | What it is | Use |
|---|---|---|
| `cey-mockup-full.jpg` | The full 1178×1399 mockup | Master visual reference |
| `cey-hero-lockup.png` | Heart artwork + "artist shop" + signature + byline (840×360) | The hero, as designed — use as one image block |
| `cey-signature.png` | The big signature scrawl (over the heart art) | Reference only |
| `cey-logo-transparent.png` | Header signature, background removed, 3× upscaled | Top-bar logo, favicon source |
| `cey-logo-topbar.png` | Original header logo crop | Reference |

> **Ask the artist for:** the original layered file (Procreate/PSD) so the big
> signature and heart artwork can be exported as separate high-res transparent
> PNGs/SVG, plus real product photos. Until then, build with the crops above.

---

## 2 · Color tokens (sampled from the mockup — do not substitute)

```css
:root{
  --pink-topbar:  #F9E8EA;  /* top bar + marquee strip */
  --pink-sidebar: #F6E8EB;  /* left nav column */
  --pink-marquee: #FBECEF;  /* scroll-text strip fill */
  --paper-hero:   #FFFDFE;  /* hero area, near-white */
  --paper-grid:   #FCFAF9;  /* product-grid background */
  --paper-footer: #F0E9EA;  /* footer band */
  --ink:          #5C5151;  /* primary "black" — warm charcoal, NEVER #000 */
  --ink-soft:     #8D8B8B;  /* price captions */
  --ink-pencil:   #BFB0B3;  /* scroll-text pencil gray */
  --grid-line:    #F3CBD8;  /* graph-paper lines (footer + lower grid area) */
}
```

Key detail: everything "black" in the mockup is warm charcoal `#5C5151`.
Using true black will instantly break the hand-drawn feel.

---

## 3 · Typography (system already defined — reuse as-is)

| Role | Face | Rules |
|---|---|---|
| Signature / logo | **image asset** (`cey-logo-transparent.png`), text fallback `Ms Madi` | The drawn scrawl IS the brand — never set it in a font |
| Nav, labels, buttons | `Gochi Hand` | Always lowercase; letter-spacing `.38em` for nav, `.22em` for labels; min 13px |
| Prices, scroll text, footer note | `Annie Use Your Telescope` | The tall skinny pen hand; min 15px |
| Body, forms, cart, checkout | `Zen Maru Gothic` 400/500/700 | All purchase-critical text lives here, never in handwriting |

```html
<link href="https://fonts.googleapis.com/css2?family=Ms+Madi&family=Gochi+Hand&family=Annie+Use+Your+Telescope&family=Zen+Maru+Gothic:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## 4 · Page anatomy (top → bottom, desktop = 1178px reference width)

### 4.1 Top bar — ~40px tall, `--pink-topbar`
- Left: signature logo (`cey-logo-transparent.png`, ~28px tall) · thin vertical
  divider `|` · `instagram` (Gochi, lowercase, spaced, links to the IG profile).
- Right: `c o n t a c t | a b o u t |` + hand-drawn cart icon 🛒 (use a drawn/
  doodle-style cart SVG, not a geometric icon; charcoal stroke).
- No border/shadow — it sits flat on the page.

### 4.2 Hero — ~370px tall, `--paper-hero`
- Centered: `reference/cey-hero-lockup.png` rendered ~840px wide (72% of page).
  Contains: small doodle (mountain/easel) on top, halftone heart collage of three
  chibi characters, "a r t i s t  s h o p" arched text, the giant signature, and
  `by @c.ey———` underneath in pen hand.
- Until layered art arrives, ship the lockup as a single `<img>` with alt
  "c.ey artist shop". Later: rebuild as layers (heart art behind, live text
  "artist shop", signature PNG on top) for crisp scaling.

### 4.3 Scroll-text marquee — ~34px strip, `--pink-marquee`
- Infinite horizontal marquee: `→  scroll text  →  scroll text  →` — in production
  replace with real announcements (new drops, shipping threshold, events).
- Face: Annie Use Your Telescope, color `--ink-pencil` (it reads as pencil, lighter
  than the ink). Arrows are drawn arrows (→ glyph is fine at this size).
- CSS keyframe translateX loop, duplicated track for seamless wrap.
- `prefers-reduced-motion: reduce` → animation off, static single line.

### 4.4 Main area — 2 columns
**Left sidebar** (~190px, `--pink-sidebar`, full height of grid section):
- Vertical nav, Gochi Hand lowercase, spaced: `catalogue / about / contact /
  events`, top-aligned, ~34px line rhythm. Current page = slightly bolder/darker.

**Product grid** (right, `--paper-grid`):
- 4 columns × N rows, ~22px gaps, cards ~205px wide.
- The lower third of the grid area fades into pink graph-paper
  (repeating-linear-gradient with `--grid-line`, 24px cell) — visible in mockup.
- **Card spec:** rounded-square photo tile (radius ~22px), product photo fills
  tile (mockup shows sticker pairs on a lace/pearl fabric background — that's the
  actual product photography style, keep it), below: `$5.00 sticker` in Annie
  hand, `--ink-soft`, centered, spaced.
- First card in mockup carries an overlaid handwritten title
  ("NANA SINGLE GLITTER STICKER") — treat as a "featured/label" card variant.
- Hover: tile lifts 3px + rotates −1°, 150ms ease. Click → product page/modal.

### 4.5 Footer — ~45px band
- Pink graph-paper background (`--paper-footer` + `--grid-line` grid).
- Left-aligned: `i dunno what im doing` in Annie hand, `--ink-soft`, lowercase.
  Keep this exact line — it's the shop's voice. Append legal/copyright in tiny
  Zen Maru to the right if needed.

---

## 5 · Responsive behavior (mockup is desktop; derive smaller sizes)
- ≤1024px: grid 3 columns.
- ≤768px: sidebar collapses to a horizontal pill row under the marquee; grid 2 col.
- ≤480px: grid 1–2 columns (2 works — cards are small); hero lockup scales to 92vw;
  top-bar nav collapses to cart + menu.
- Letter-spacing tightens one step on mobile (`.38em → .22em`) so nav fits.

## 6 · Feel & motion rules
- Hand-drawn = imperfect: allow ±1° rotations on cards/labels, wobbly drawn
  dividers, doodle icons. No geometric icon fonts anywhere.
- Motion is gentle and sparse: marquee drift, card lift, soft page fade-in.
  No scroll-hijacking. Respect `prefers-reduced-motion` globally.
- Photography style: products shot on the lace/pearl fabric — request all product
  photos in this style for grid consistency.

## 7 · Copy inventory (exact strings from the mockup)
`instagram` · `contact | about |` · `artist shop` · `by @c.ey———` ·
`scroll text` · `catalogue` · `about` · `contact` · `events` ·
`$5.00 sticker` · `NANA SINGLE GLITTER STICKER` · `i dunno what im doing`

## 8 · Ecommerce scope (phase 2 — after the visual replica)
Cart + checkout are custom (no Wix/Shopify/GoDaddy). Planned approach: static
catalog in the repo (JSON/TS product data) + Stripe Checkout for payment, orders
land in Stripe dashboard + email. Keep the cart state client-side (React context).
Details are decided in the project chat — build the replica first with a
non-functional cart icon and `add to cart` buttons wired to local cart state.

## 9 · QA before delivery
Playwright + axe + Lighthouse pass; assets compressed (aim lean, e.g. hero lockup
re-exported ≤200KB WebP); 0 npm vulnerabilities; keyboard focus visible
(dashed charcoal outline fits the aesthetic).
