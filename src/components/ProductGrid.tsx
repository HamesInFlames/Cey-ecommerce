import { products } from '../data/products'
import { ProductCard } from './ProductCard'
import { GraphPaperFade } from './GraphPaperFade'

/**
 * Product grid — 4 columns, dropping to 3 at ≤1024px and 2 at ≤768px
 * (spec §5). The lower third of the panel fades into pink graph paper.
 */
export function ProductGrid() {
  return (
    <section
      aria-label="Catalogue"
      className="bg-paper-grid relative px-6 pt-8 pb-14 sm:px-10 sm:pt-9"
    >
      <GraphPaperFade height="16%" opacity={0.5} />

      <ul className="relative grid list-none grid-cols-2 gap-x-[26px] gap-y-[26px] md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </section>
  )
}
