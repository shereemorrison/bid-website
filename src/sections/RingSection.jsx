import { useRef } from 'react'
import { cn } from '../lib/cn'
import { LayoutContainer } from '../components/LayoutContainer'
import { BracketFrame } from '../components/BracketFrame'
import { MotionLabCarousel } from '../components/MotionLabCarousel'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { sectionKickerClass, sectionTitleClass } from '../lib/sectionLayout'

/** Motion lab — headline, copy, and 3D session clip carousel. */
export function RingSection() {
  const ref = useRef(null)
  useGsapReveal(ref)

  return (
    <section
      ref={ref}
      id="ring"
      className={cn(
        'scroll-mt-24 border-t border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950',
        'py-7 md:py-9',
      )}
    >
      <LayoutContainer className="flex flex-col gap-5 md:gap-6">
        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <p data-reveal className={sectionKickerClass}>
              Motion lab
            </p>
            <h2 data-reveal className={cn(sectionTitleClass, 'mt-1')}>
              Enter the Ring
            </h2>
          </div>

          <div className="flex justify-start lg:col-span-5 lg:justify-end">
            <BracketFrame
              align="right"
              className="max-w-xl text-sm uppercase leading-snug tracking-[0.12em] text-zinc-400"
            >
              <p data-reveal>Footwork, balance, and angles</p>
            </BracketFrame>
          </div>
        </div>

        <div data-reveal className="mt-3 md:mt-5">
          <MotionLabCarousel />
        </div>
      </LayoutContainer>
    </section>
  )
}
