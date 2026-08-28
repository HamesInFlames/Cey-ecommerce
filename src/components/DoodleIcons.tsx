/**
 * Hand-drawn icons. Spec §3 / §6: doodle icons only — no geometric icon fonts.
 * Paths are deliberately a little wobbly and off-square; that imperfection is
 * the aesthetic.
 */

interface IconProps {
  className?: string
}

/** The top-bar cart: basket, handle, two wheels — as drawn on the mockup. */
export function CartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 30"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* handle, sweeping up to the left */}
      <path d="M1.6 2.3c1.9-.5 3.9-.2 4.9 1.1.7.9 1 2.2 1.3 3.4" />
      {/* basket rim, drawn slightly past the corners */}
      <path d="M7.2 7.4c5.6-.6 11.3-.9 17-1 1.9 0 3.9.1 5.8.4" />
      {/* basket body — trapezoid, left side steeper than the right */}
      <path d="M8 7.6c.9 4 1.9 8 3.1 11.9.2.6.6 1 1.2 1 4.6.1 9.2 0 13.8-.3" />
      <path d="M30 6.8c-.7 4.2-1.7 8.4-3 12.4" />
      {/* two ribs inside the basket */}
      <path d="M14.2 8.6c.4 3.4.9 6.8 1.4 10.2" />
      <path d="M21.6 8.5c-.1 3.4-.4 6.8-.8 10.1" />
      {/* wheels */}
      <circle cx="14.3" cy="26" r="2.4" />
      <circle cx="25" cy="25.7" r="2.4" />
    </svg>
  )
}

/**
 * The long drawn arrow that separates each marquee phrase:
 * a slightly bowed shaft with an open arrowhead.
 */
export function DrawnArrow({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 86 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* shaft, bowing a touch below centre the way a pen drags */}
      <path d="M1.5 7.4c14-.5 28-.9 42-1 12.6-.1 25.2.1 37.8.6" />
      {/* open arrowhead, upper and lower stroke drawn separately */}
      <path d="M74.5 2.2c2.4 1.7 4.7 3.4 7.2 4.9" />
      <path d="M74.2 12.6c2.6-1.9 5.2-3.6 7.8-5.3" />
    </svg>
  )
}
