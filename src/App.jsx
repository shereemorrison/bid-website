import { LenisProvider } from './components/LenisProvider'
import { Navigation } from './components/Navigation'
import { ScrollProgress } from './components/ScrollProgress'
import { SiteFooter } from './components/SiteFooter'
import { HeroSection } from './sections/HeroSection'
import { StorySection } from './sections/StorySection'
import { RingSection } from './sections/RingSection'
import { MerchSection } from './sections/MerchSection'

/**
 * Application shell — composition only. Each `src/sections/*` file should stay focused:
 * content + hooks, while cross-cutting scroll logic flows through `LenisProvider`.
 */
function App() {
  return (
    <LenisProvider>
      <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#060304] text-zinc-100">
        <ScrollProgress />
        <Navigation />
        <main>
          <HeroSection />
          <StorySection />
          <RingSection />
          <MerchSection />
        </main>
        <SiteFooter />
      </div>
    </LenisProvider>
  )
}

export default App
