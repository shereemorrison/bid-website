import { useLayoutEffect } from 'react'
import { gsap } from '../animations/registerGsap'
import { initStorySectionMotion } from '../animations/storyReveal'

/**
 * Story section GSAP — split text, title scale scrub, bracket parallax.
 */
export function useStorySectionMotion(sectionRef, reduced = false) {
  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return

    if (reduced) {
      gsap.set(
        root.querySelectorAll('.split-text__inner, [data-story-title], [data-story-frame], [data-reveal]'),
        {
        clearProps: 'all',
        opacity: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    const ctx = gsap.context(() => initStorySectionMotion(root), root)
    return () => ctx.revert()
  }, [sectionRef, reduced])
}
