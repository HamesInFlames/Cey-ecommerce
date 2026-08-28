import { CartIcon } from './DoodleIcons'
import logo from '../assets/cey-logo-transparent.png'

/** TODO: artist's Instagram URL — spec, open items. */
const INSTAGRAM_URL = '#'

/**
 * Top bar — ~40px, flat pink, no border or shadow. Spec §4.1.
 * Left: signature logo · divider · instagram.
 * Right: contact | about | cart.
 *
 * The right-hand nav is tracked wider than "instagram" on the left; that
 * difference is visible in the mockup, so it is deliberate.
 */
export function TopBar() {
  return (
    <header className="bg-pink-topbar">
      <div className="mx-auto flex h-10 max-w-[1178px] items-center justify-between px-4 sm:px-7">
        <div className="flex items-center gap-3 sm:gap-4">
          <a href="/" aria-label="c.ey artist shop — home" className="shrink-0">
            <img
              src={logo}
              alt="c.ey"
              className="h-[26px] w-auto object-contain"
            />
          </a>
          <span
            aria-hidden="true"
            className="text-ink/45 text-[15px] leading-none"
          >
            |
          </span>
          <a
            href={INSTAGRAM_URL}
            className="font-nav text-ink hover:text-ink/70 text-[13px] leading-none lowercase transition-colors"
            style={{ letterSpacing: '0.22em' }}
          >
            instagram
          </a>
        </div>

        <nav className="flex items-center gap-3 sm:gap-5">
          <a
            href="/contact"
            className="font-nav text-ink hover:text-ink/70 hidden text-[13px] leading-none lowercase transition-colors sm:inline"
            style={{ letterSpacing: '0.38em' }}
          >
            contact
          </a>
          <span
            aria-hidden="true"
            className="text-ink/45 hidden text-[15px] leading-none sm:inline"
          >
            |
          </span>
          <a
            href="/about"
            className="font-nav text-ink hover:text-ink/70 hidden text-[13px] leading-none lowercase transition-colors sm:inline"
            style={{ letterSpacing: '0.38em' }}
          >
            about
          </a>
          <span
            aria-hidden="true"
            className="text-ink/45 hidden text-[15px] leading-none sm:inline"
          >
            |
          </span>
          <button
            type="button"
            aria-label="Open cart"
            className="text-ink hover:text-ink/70 transition-colors"
          >
            <CartIcon className="h-[21px] w-[22px]" />
          </button>
        </nav>
      </div>
    </header>
  )
}
