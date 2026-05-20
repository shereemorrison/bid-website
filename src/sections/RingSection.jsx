import { useRef } from 'react'
import { LayoutContainer } from '../components/LayoutContainer'
import { useGsapReveal } from '../hooks/useGsapReveal'

/**
 * Placeholder for a future immersive “ring” chapter (rope shaders, crowd pulse, punch flurries).
 * Wire heavy R3F scenes through `src/scenes/` + lazy boundaries similar to the hero canvas.
 */
export function RingSection() {
  const ref = useRef(null)
  useGsapReveal(ref)

  return (
    <section
      ref={ref}
      id="ring"
      className="scroll-mt-24 border-t border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 py-24 md:py-32"
    >
      <LayoutContainer>
        <p
          data-reveal
          className="font-mono text-xs uppercase tracking-[0.35em] text-rose-400/85"
        >
          Motion lab
        </p>
        <h2
          data-reveal
          className="mt-3 max-w-3xl font-display text-5xl text-white md:text-6xl"
        >
          Ring telemetry & lighting
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          Drop scroll-linked camera moves and volumetric effects here. Co-locate GSAP timelines in{' '}
          <code className="mx-1 rounded bg-white/5 px-1 py-0.5 font-mono text-sm">
            src/animations/
          </code>
          and bind them with <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-sm">ScrollTrigger</code>; stage WebGL in{' '}
          <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-sm">src/scenes/</code>.
        </p>
        <div
          data-reveal
          className="mt-12 flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-white/20 bg-zinc-900/50 text-sm uppercase tracking-[0.3em] text-zinc-500"
        >
          Future canvas mount
        </div>
      </LayoutContainer>
    </section>
  )
}
