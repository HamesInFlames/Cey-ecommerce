import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { SidebarNav } from './components/SidebarNav'
import { ProductGrid } from './components/ProductGrid'
import { GraphPaperFade } from './components/GraphPaperFade'
import { Footer } from './components/Footer'

/**
 * Page assembly, top to bottom, per spec §4:
 * top bar → hero → marquee → sidebar + product grid → footer.
 */
export default function App() {
  return (
    <div className="bg-paper-footer flex min-h-screen flex-col">
      <TopBar />
      <Hero />
      <Marquee />

      <main className="mx-auto w-full max-w-[1178px] flex-1">
        {/* sidebar is a pill row below the marquee at ≤768px, a column above */}
        <div className="md:hidden">
          <SidebarNav current="catalogue" />
        </div>

        <div className="h-full md:grid md:grid-cols-[200px_1fr]">
          <div className="bg-pink-sidebar relative hidden md:block">
            <SidebarNav current="catalogue" />
            <GraphPaperFade height="42%" opacity={0.5} />
          </div>
          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  )
}
