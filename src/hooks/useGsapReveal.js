import { useLayoutEffect } from 'react'
import { gsap } from '../animations/registerGsap'
import { revealSection } from '../animations/revealSection'

/**
 * Hook form of `revealSection` — keeps section files declarative.
 */
export function useGsapReveal(sectionRef, selector = '[data-reveal]') {
  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const ctx = gsap.context(() => revealSection(root, selector), root)
    return () => ctx.revert()
  }, [sectionRef, selector])
}
