import { useRef, useLayoutEffect, useCallback } from 'react'
import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import { FiPlay } from 'react-icons/fi'
import { gsap } from '../animations/registerGsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useParallaxScrub } from '../hooks/useParallaxScrub'
import { LayoutContainer } from '../components/LayoutContainer'
import { cn } from '../lib/cn'
import {
  ATHLETE_FIRST_NAME,
  ATHLETE_SURNAME,
} from '../lib/athlete'

/**
 * Hero: headline + **video shell** (full trailer / fight reel later — modal, embed, or `<video>`).
 * Moody red environment + light GSAP intro; no WebGL chunk here to keep first paint lean.
 */
export function HeroSection() {
  const root = useRef(null)
  const layerBack = useRef(null)
  const layerMid = useRef(null)
  const reduced = usePrefersReducedMotion()

  const pointerX = useSpring(0, { stiffness: 80, damping: 25 })
  const pointerY = useSpring(0, { stiffness: 80, damping: 25 })
  const glow = useMotionTemplate`radial-gradient(520px at ${pointerX}px ${pointerY}px, rgba(153,27,27,0.22), transparent 58%)`

  useParallaxScrub(layerBack, {
    triggerRef: root,
    yPercent: reduced ? 0 : 7,
  })
  useParallaxScrub(layerMid, {
    triggerRef: root,
    yPercent: reduced ? 0 : 12,
  })

  useLayoutEffect(() => {
    if (!root.current || reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-line]', {
        y: 86,
        opacity: 0,
        duration: 1.05,
      }).from(
        ['[data-hero-kicker]', '[data-hero-blurb]'],
        {
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.1,
        },
        '-=0.55',
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  const onMove = useCallback(
    (e) => {
      if (reduced || !root.current) return
      const r = root.current.getBoundingClientRect()
      pointerX.set(e.clientX - r.left)
      pointerY.set(e.clientY - r.top)
    },
    [pointerX, pointerY, reduced],
  )

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#060304] pt-24 md:pt-28"
      onPointerMove={onMove}
    >
      {/* Deep red atmosphere — parallax wash */}
      <div
        ref={layerBack}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(127,29,29,0.35),transparent_50%),radial-gradient(ellipse_90%_60%_at_100%_100%,rgba(69,10,10,0.55),transparent_55%),radial-gradient(ellipse_80%_50%_at_0%_80%,rgba(24,6,6,0.5),transparent_50%)]"
      />
      {!reduced && (
        <motion.div
          ref={layerMid}
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-90"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <LayoutContainer className="relative z-10 flex flex-1 flex-col gap-12 pb-16 lg:flex-row lg:items-stretch lg:gap-12 lg:pb-24">
        <div className="flex max-w-xl flex-1 flex-col justify-center">
          <p
            data-hero-kicker
            className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-rose-400/85"
          >
            Professional boxer
          </p>
          <h1 className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-[1.06] tracking-tight">
            <span className="block overflow-hidden">
              <span
                data-hero-line
                lang="sr-Latn"
                className="inline-block pt-[0.14em] -mt-[0.14em]"
              >
                <span className="text-white">{ATHLETE_FIRST_NAME}</span>
                {' '}
                <span className="text-rose-100 [text-shadow:0_0_42px_rgba(220,38,38,0.45)]">
                  {ATHLETE_SURNAME}
                </span>
              </span>
            </span>
          </h1>
          <p
            data-hero-blurb
            className="mt-8 max-w-md text-pretty text-base leading-relaxed text-zinc-500 md:text-lg"
          >
            Immersive chronicle of a fighter’s path — ring physics, grit, and the craft of the
            comeback. Full hero film lives beside this headline.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#story"
              className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur transition hover:border-red-500/40 hover:bg-red-950/40"
            >
              The story
            </a>
            <a
              href="#merch"
              className="rounded-full bg-red-900 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-red-50 shadow-[0_0_36px_rgba(127,29,29,0.45)] transition hover:bg-red-800"
            >
              View merch
            </a>
          </div>
        </div>

        {/* Video placeholder: wire to modal, `/video` route, or `<video>` when assets exist */}
        <div className="flex w-full flex-1 items-center lg:min-h-[min(52vh,520px)] lg:max-w-[58%]">
          <div className="relative w-full">
            <div
              className={cn(
                'aspect-video w-full overflow-hidden rounded-2xl border border-red-950/70',
                'bg-gradient-to-br from-red-950/80 via-[#0f0505] to-black',
                'shadow-[0_0_80px_-12px_rgba(127,29,29,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]',
              )}
            >
              <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-5 px-6 py-10 sm:min-h-0 sm:py-14">
                <button
                  type="button"
                  className="group flex size-16 items-center justify-center rounded-full border border-red-500/25 bg-red-950/60 text-red-100 shadow-inner transition hover:border-red-400/50 hover:bg-red-950/90"
                  aria-label="Play hero video (placeholder)"
                  disabled
                >
                  <FiPlay
                    className="size-7 translate-x-0.5 opacity-80 transition group-hover:opacity-100"
                    aria-hidden
                  />
                </button>
                <div className="text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-red-300/75">
                    Hero film
                  </p>
                  <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-zinc-500">
                    Drop in trailer, embedded player, or modal opener here — shell only for now.
                  </p>
                </div>
                <p className="rounded-full border border-dashed border-red-900/50 bg-black/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-red-900/90">
                  Video mount point
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-600">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-red-600/70 to-transparent" />
      </div>
    </section>
  )
}
