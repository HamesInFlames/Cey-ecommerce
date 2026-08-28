import { motion, useReducedMotion } from 'motion/react'
import { formatPrice, type Product } from '../data/products'
import { PlaceholderTile } from './PlaceholderTile'

interface ProductCardProps {
  product: Product
  /** Position in the grid — seeds the placeholder so tiles differ. */
  index: number
}

/**
 * Product card — rounded-square photo tile, price caption in the pen hand
 * below. Hover lifts 3px and tilts −1° over 150ms. Spec §4.4.
 */
export function ProductCard({ product, index }: ProductCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={`/product/${product.id}`}
      className="group block"
      whileHover={reduceMotion ? undefined : { y: -3, rotate: -1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <div className="relative aspect-square overflow-hidden rounded-[22px]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        ) : (
          <PlaceholderTile seed={index + 1} />
        )}

        {product.featuredLabel && (
          <span
            className="font-nav text-ink absolute top-[27%] left-1/2 w-[62%] -translate-x-1/2 text-center text-[15px] leading-[1.5] font-bold uppercase"
            style={{ letterSpacing: '0.01em' }}
          >
            {product.featuredLabel}
          </span>
        )}
      </div>

      <p
        className="font-pen text-ink-soft mt-[13px] text-center text-[15px] leading-none"
        style={{ letterSpacing: '0.16em' }}
      >
        {formatPrice(product.priceCents)} sticker
      </p>
    </motion.a>
  )
}
