/** Spec §4.4 / §7 — exact strings from the mockup. */
const LINKS = [
  { label: 'catalogue', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'contact', href: '/contact' },
  { label: 'events', href: '/events' },
] as const

interface SidebarNavProps {
  /** Current page renders slightly bolder and darker. */
  current?: string
}

/**
 * Left nav — ~200px pink column running the full height of the grid section,
 * Gochi Hand lowercase and widely spaced. Collapses to a horizontal pill row
 * at ≤768px (spec §5).
 */
export function SidebarNav({ current = 'catalogue' }: SidebarNavProps) {
  return (
    <nav aria-label="Shop sections">
      {/* ≤768px: pill row under the marquee, tracking tightened one step */}
      <ul className="bg-pink-sidebar flex list-none items-center gap-1 overflow-x-auto px-4 py-3 md:hidden">
        {LINKS.map((link) => (
          <li key={link.label} className="shrink-0">
            <a
              href={link.href}
              aria-current={current === link.label ? 'page' : undefined}
              className={`font-nav block rounded-full px-3 py-1 text-[15px] lowercase transition-colors ${
                current === link.label
                  ? 'text-ink bg-white/70 font-bold'
                  : 'text-ink/75 hover:text-ink'
              }`}
              style={{ letterSpacing: '0.22em' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ≥768px: vertical column, ~43px line rhythm */}
      <ul className="relative hidden list-none flex-col gap-0 pt-[26px] pl-[46px] md:flex">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              aria-current={current === link.label ? 'page' : undefined}
              className={`font-nav block py-[12px] text-[20px] leading-none lowercase transition-colors ${
                current === link.label
                  ? 'text-ink font-bold'
                  : 'text-ink/80 hover:text-ink'
              }`}
              style={{ letterSpacing: '0.22em' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
