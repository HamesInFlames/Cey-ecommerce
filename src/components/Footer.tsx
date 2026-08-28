/**
 * Footer — pink graph-paper band. The line `i dunno what im doing` is the
 * shop's voice; keep it verbatim (spec §4.5 / §7).
 */
export function Footer() {
  return (
    <footer className="bg-paper-footer graph-paper">
      <div className="mx-auto flex max-w-[1178px] items-center justify-between gap-4 px-4 py-[13px] sm:px-9">
        <p
          className="font-pen text-ink-soft text-[15px] leading-none lowercase"
          style={{ letterSpacing: '0.12em' }}
        >
          i dunno what im doing
        </p>
        <p className="font-body text-ink-soft/80 text-[10px] leading-none">
          © {new Date().getFullYear()} c.ey
        </p>
      </div>
    </footer>
  )
}
