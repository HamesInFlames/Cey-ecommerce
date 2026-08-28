/**
 * Stand-in for a product photo until the artist's real shots arrive.
 *
 * The mockup's photography style is sticker pairs on a lace/pearl fabric
 * (spec §4.4 / §6), so the placeholder evokes that — pearl-toned cloth with
 * scattered beads and two die-cut sticker shapes — rather than showing a grey
 * box. Deliberately soft and out of focus: it should read as "photo pending",
 * never as artwork. Swap for `<img>` once `product.image` is populated.
 */

interface PlaceholderTileProps {
  /** Varies the bead scatter per card so the grid does not look tiled. */
  seed: number
}

/** Small deterministic PRNG — same seed always yields the same cloth. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function PlaceholderTile({ seed }: PlaceholderTileProps) {
  const rand = mulberry32(seed * 2654435761)

  const beads = Array.from({ length: 80 }, () => ({
    cx: rand() * 200,
    cy: rand() * 200,
    r: 1 + rand() * 2.8,
    o: 0.3 + rand() * 0.55,
  }))

  /* Loose folds in the cloth, blurred so they read as fabric not as stripes. */
  const folds = Array.from({ length: 5 }, (_, i) => ({
    d:
      `M${-20 + rand() * 20} ${26 + i * 40 + rand() * 10}` +
      ` q ${44 + rand() * 20} ${-16 - rand() * 14}, ${88 + rand() * 16} ${4 + rand() * 8}` +
      ` t ${78 + rand() * 20} ${-4 + rand() * 12}` +
      ` t ${70 + rand() * 20} ${6 + rand() * 6}`,
    o: 0.16 + rand() * 0.16,
  }))

  const gid = `ph-${seed}`

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Product photo coming soon"
    >
      <defs>
        <linearGradient id={`${gid}-cloth`} x1="0.15" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FAF5F5" />
          <stop offset="42%" stopColor="#EFE7E8" />
          <stop offset="100%" stopColor="#E2D8DA" />
        </linearGradient>
        <radialGradient id={`${gid}-sheen`} cx="0.3" cy="0.22" r="0.8">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id={`${gid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      {/* pearl cloth ground */}
      <rect width="200" height="200" fill={`url(#${gid}-cloth)`} />

      {/* soft folds in the fabric */}
      <g
        stroke="#E9C9D2"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        filter={`url(#${gid}-soft)`}
      >
        {folds.map((f, i) => (
          <path key={i} d={f.d} opacity={f.o} />
        ))}
      </g>

      {/* scattered pearls */}
      <g fill="#FFFFFF">
        {beads.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} opacity={b.o} />
        ))}
      </g>

      {/* the two die-cut stickers, sitting slightly off-square as they fall */}
      <g transform="translate(74 92) rotate(-8)">
        <circle r="34" fill="#FFFFFF" opacity="0.96" />
        <circle r="27" fill="#E3BCC7" opacity="0.7" />
      </g>
      <g transform="translate(130 104) rotate(7)">
        <circle r="33" fill="#FFFFFF" opacity="0.96" />
        <circle r="26" fill="#B9A9AD" opacity="0.62" />
      </g>

      {/* soft top-left sheen over everything */}
      <rect width="200" height="200" fill={`url(#${gid}-sheen)`} />
    </svg>
  )
}
