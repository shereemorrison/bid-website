import { useRef } from 'react'
import { cn } from '../lib/cn'
import { LayoutContainer } from '../components/LayoutContainer'
import { SectionGrid, SectionMain, SectionAside, SectionFull } from '../components/SectionGrid'
import { BracketFrame } from '../components/BracketFrame'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { sectionKickerClass, sectionPadClass, sectionTitleClass } from '../lib/sectionLayout'

/**
 * Placeholder chapter — headline + framed copy on the shared 12-column rack.
 */
export function RingSection() {
  const ref = useRef(null)
  useGsapReveal(ref)

  return (
    <section
      ref={ref}
      id="ring"
      className={cn(
        'scroll-mt-24 border-t border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950',
        sectionPadClass,
      )}
    >
      <LayoutContainer>
        <SectionGrid>
          <SectionMain>
            <p data-reveal className={sectionKickerClass}>
              Motion lab
            </p>
            <h2 data-reveal className={sectionTitleClass}>
              Ring telemetry & lighting
            </h2>
          </SectionMain>

          <SectionAside className="lg:pt-1">
            <BracketFrame
              align="right"
              className="max-w-xl text-sm uppercase leading-snug tracking-[0.12em] text-zinc-400"
            >
              <p data-reveal>
                Drop scroll-linked camera moves and volumetric effects here. Co-locate GSAP
                timelines in{' '}
                <code className="mx-0.5 rounded bg-white/5 px-1 py-0.5 font-mono text-[0.85em] normal-case tracking-normal">
                  src/animations/
                </code>{' '}
                and bind them with{' '}
                <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[0.85em] normal-case tracking-normal">
                  ScrollTrigger
                </code>
                ; stage WebGL in{' '}
                <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[0.85em] normal-case tracking-normal">
                  src/scenes/
                </code>
                .
              </p>
            </BracketFrame>
          </SectionAside>

          <SectionFull className="mt-8 lg:mt-10">
            <div
              data-reveal
              className="flex min-h-[220px] w-full items-center justify-center rounded-3xl border border-dashed border-white/20 bg-zinc-900/50 text-sm uppercase tracking-[0.3em] text-zinc-500"
            >
              Future canvas mount
            </div>
          </SectionFull>
        </SectionGrid>
      </LayoutContainer>
    </section>
  )
}
