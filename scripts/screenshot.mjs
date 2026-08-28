/**
 * Captures the shop at the mockup's reference width so it can be checked
 * side by side against reference/cey-mockup-full.jpg (spec §9 / CLAUDE.md
 * phase 1 verification).
 *
 * Usage: node scripts/screenshot.mjs [url]
 * Writes into screenshots/ (gitignored).
 */
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'screenshots')
const url = process.argv[2] ?? 'http://localhost:5173'

/** The mockup is 1178×1399; the smaller widths cover spec §5's breakpoints. */
const VIEWPORTS = [
  { name: 'desktop-1178', width: 1178, height: 1399 },
  { name: 'tablet-1000', width: 1000, height: 1200 },
  { name: 'mobile-430', width: 430, height: 932 },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  await page.goto(url, { waitUntil: 'networkidle' })
  // Let the webfonts settle so the handwriting renders, not the fallback.
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  // Freeze the marquee so screenshots are byte-stable between runs.
  await page.addStyleTag({
    content: '.cey-marquee-track { animation: none !important; }',
  })

  await page.screenshot({
    path: join(OUT, `${vp.name}.png`),
    fullPage: true,
  })
  console.log(`wrote screenshots/${vp.name}.png`)
  await page.close()
}

await browser.close()
