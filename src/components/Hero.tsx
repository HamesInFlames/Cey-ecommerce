import heroLockup from '../assets/cey-hero-lockup.png'

/**
 * Hero — ~390px on near-white paper, the lockup centred at ~72% of page width.
 * Spec §4.2.
 *
 * TODO: shipping the lockup as one flat image, per the handoff. Once the
 * artist's layered source arrives, rebuild as layers (heart art behind, live
 * "artist shop" text, signature PNG on top) so it stays crisp at any scale.
 */
export function Hero() {
  return (
    <section className="bg-paper-hero">
      <div className="mx-auto flex max-w-[1178px] justify-center px-4 py-[15px]">
        <img
          src={heroLockup}
          alt="c.ey artist shop"
          width={840}
          height={360}
          className="h-auto w-[92vw] max-w-[840px]"
        />
      </div>
    </section>
  )
}
