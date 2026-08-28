interface GraphPaperFadeProps {
  /** How far up the panel the paper reaches, as a CSS length. */
  height?: string
  /** The mockup's lines are faint — keep well under 1. */
  opacity?: number
}

/**
 * The pink graph paper that fades in at the foot of the main area. It reaches
 * higher up the sidebar than the grid panel, which is how the mockup has it:
 * the product tiles stay on clean paper, the pink column rules earlier.
 * Spec §4.4.
 */
export function GraphPaperFade({
  height = '33%',
  opacity = 0.55,
}: GraphPaperFadeProps) {
  return (
    <div
      aria-hidden="true"
      className="graph-paper pointer-events-none absolute inset-x-0 bottom-0"
      style={{
        height,
        opacity,
        maskImage: 'linear-gradient(to bottom, transparent, black 88%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 88%)',
      }}
    />
  )
}
