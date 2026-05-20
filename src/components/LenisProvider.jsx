import { useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AppScrollContext } from '../context/AppScrollContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Lenis: smooths wheel/touch momentum. Synced with GSAP’s global ticker so ScrollTrigger
 * scrub + Lenis use one clock (prevents jitter when timelines depend on scroll position).
 */

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) {
      const sync = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? window.scrollY / max : 0
        setScrollProgress(p)
        ScrollTrigger.update()
      }
      window.addEventListener('scroll', sync, { passive: true })
      window.addEventListener('resize', sync)
      sync()
      return () => {
        window.removeEventListener('scroll', sync)
        window.removeEventListener('resize', sync)
      }
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    const onScroll = (l) => {
      setScrollProgress(l.progress)
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', onLoad)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const value = useMemo(
    () => ({
      get lenis() {
        return lenisRef.current
      },
      scrollProgress,
    }),
    [scrollProgress],
  )

  return (
    <AppScrollContext.Provider value={value}>
      {children}
    </AppScrollContext.Provider>
  )
}
