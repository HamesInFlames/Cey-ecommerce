import { DrawnArrow } from './DoodleIcons'

/**
 * TODO: replace with real announcements — new drops, shipping threshold,
 * events. The mockup's literal placeholder string is `scroll text`.
 */
const MESSAGES = ['scroll text', 'scroll text', 'scroll text']

/**
 * Scroll-text marquee — ~35px pink strip, pencil-gray pen hand, drawn arrows.
 * Spec §4.3. The track is duplicated so the CSS translateX(-50%) loop wraps
 * seamlessly; `prefers-reduced-motion` stops it (see index.css).
 */
export function Marquee() {
  const track = [...MESSAGES, ...MESSAGES]

  return (
    <div
      className="bg-pink-marquee overflow-hidden py-[8px]"
      role="marquee"
      aria-label="Shop announcements"
    >
      <div className="cey-marquee-track flex w-max items-center">
        {track.map((message, i) => (
          <div key={i} className="flex shrink-0 items-center">
            <DrawnArrow className="text-ink-pencil mx-7 h-4 w-[96px] shrink-0" />
            <span
              className="font-pen text-ink-pencil text-[19px] leading-none whitespace-nowrap"
              style={{ letterSpacing: '0.18em' }}
            >
              {message}
            </span>
          </div>
        ))}
        <DrawnArrow className="text-ink-pencil mx-7 h-4 w-[96px] shrink-0" />
      </div>
    </div>
  )
}
