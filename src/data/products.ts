/**
 * Catalogue data for the c.ey artist shop.
 *
 * TODO: artist to confirm the real product list, names and prices.
 * The mockup shows twelve $5.00 sticker tiles; only the first is named
 * ("NANA SINGLE GLITTER STICKER"). Everything else below is a placeholder
 * holding the mockup's shape until the real catalogue arrives.
 *
 * TODO: real product photos — shot on the lace/pearl fabric, per spec §6.
 * `image: null` renders the drawn placeholder tile.
 */

export interface Product {
  id: string
  name: string
  /** CAD, in cents — the currency Stripe Checkout is configured for. */
  priceCents: number
  image: string | null
  description: string
  /**
   * Handwritten title drawn over the tile itself, as on the mockup's first
   * card. Only the featured card variant uses this.
   */
  featuredLabel?: string
}

export const products: Product[] = [
  {
    id: 'nana-single-glitter-sticker',
    name: 'Nana Single Glitter Sticker',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
    featuredLabel: 'NANA SINGLE GLITTER STICKER',
  },
  {
    id: 'sticker-02',
    name: 'Sticker 02',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-03',
    name: 'Sticker 03',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-04',
    name: 'Sticker 04',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-05',
    name: 'Sticker 05',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-06',
    name: 'Sticker 06',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-07',
    name: 'Sticker 07',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-08',
    name: 'Sticker 08',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-09',
    name: 'Sticker 09',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-10',
    name: 'Sticker 10',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-11',
    name: 'Sticker 11',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
  {
    id: 'sticker-12',
    name: 'Sticker 12',
    priceCents: 500,
    image: null,
    description: 'TODO: artist copy',
  },
]

/** `500` → `$5.00`, matching the mockup's price caption. */
export function formatPrice(priceCents: number): string {
  return `$${(priceCents / 100).toFixed(2)}`
}
