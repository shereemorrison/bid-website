import { useState, useCallback } from 'react'
import { LenisProvider } from './components/LenisProvider'
import { HeroOpening } from './components/HeroOpening'
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
  const [introDone, setIntroDone] = useState(false)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <LenisProvider>
      <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#060304] text-zinc-100">
        {!introDone ? <HeroOpening onComplete={onIntroDone} /> : null}
        <div className="crt-scanlines" aria-hidden />
        {introDone ? <ScrollProgress /> : null}
        <Navigation introVisible={introDone} />
        <main>
          <HeroSection introComplete={introDone} />
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
