import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { HeroCopy } from '../components/HeroCopy'
import { useHeroCopyReveal } from '../hooks/useHeroCopyReveal'
import { useParallaxScrub } from '../hooks/useParallaxScrub'
import { HERO_PARALLAX } from '../animations/timings'
import { LayoutContainer } from '../components/LayoutContainer'
import { BracketFrame } from '../components/BracketFrame'
import { HERO_VIDEO_SRC } from '../lib/heroMedia'

/** Full-bleed hero video + separate MP3 soundtrack (video always muted). */
export function HeroSection({ introComplete = true }) {
  const root = useRef(null)
  const videoRef = useRef(null)
  const layerBack = useRef(null)
  const layerMid = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [videoError, setVideoError] = useState(false)

  useHeroCopyReveal(root, introComplete, reduced)

  const pointerX = useSpring(0, { stiffness: 80, damping: 25 })
  const pointerY = useSpring(0, { stiffness: 80, damping: 25 })
  const glow = useMotionTemplate`radial-gradient(520px at ${pointerX}px ${pointerY}px, rgba(153,27,27,0.22), transparent 58%)`

  useParallaxScrub(layerBack, {
    triggerRef: root,
    yPercent: reduced ? 0 : HERO_PARALLAX.layerBackY,
    start: HERO_PARALLAX.start,
    end: HERO_PARALLAX.end,
  })
  useParallaxScrub(layerMid, {
    triggerRef: root,
    yPercent: reduced ? 0 : HERO_PARALLAX.layerMidY,
    start: HERO_PARALLAX.start,
    end: HERO_PARALLAX.end,
  })

  /** Muted video during iris so the window shows the reel. */
  useEffect(() => {
    const video = videoRef.current
    if (!video || videoError || reduced) return

    video.muted = true
    const p = video.play()
    if (p !== undefined) p.catch(() => {})
  }, [videoError, reduced])

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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#060304]"
      onPointerMove={onMove}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-28 bg-gradient-to-b from-[#060304] via-[#060304]/80 to-transparent sm:h-32"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0 min-h-[100svh]">
        {!videoError ? (
          <video
            ref={videoRef}
            key={HERO_VIDEO_SRC}
            className="h-full min-h-[100svh] w-full object-cover"
            src={HERO_VIDEO_SRC}
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Hero background film"
            onError={() => setVideoError(true)}
          />
        ) : (
          <div
            className="flex h-full min-h-[100svh] w-full items-center justify-center bg-gradient-to-br from-red-950/40 via-[#0a0505] to-black"
            aria-hidden
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">
              No reel loaded
            </span>
          </div>
        )}
        {videoError && import.meta.env.DEV ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-28 z-[5] flex justify-center px-4">
            <p className="max-w-lg rounded-lg border border-amber-700/50 bg-black/80 px-4 py-3 text-center font-mono text-[11px] leading-relaxed text-amber-100/95">
              <span className="font-semibold text-amber-400">Video did not load.</span> Add{' '}
              <code className="text-rose-300">public/hero.mp4</code> or set{' '}
              <code className="text-rose-300">VITE_HERO_VIDEO</code> in{' '}
              <code className="text-rose-300">.env</code> (see{' '}
              <code className="text-rose-300">.env.example</code>). Current URL:{' '}
              <code className="break-all text-zinc-400">{HERO_VIDEO_SRC}</code>
            </p>
          </div>
        ) : null}
      </div>

      <div
        ref={layerBack}
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#060304] via-[#060304]/50 to-[#060304]/75"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-90 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(127,29,29,0.45), transparent 50%), radial-gradient(ellipse 90% 60% at 100% 100%, rgba(69,10,10,0.5), transparent 55%)',
        }}
      />

      {!reduced && (
        <motion.div
          ref={layerMid}
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen opacity-80"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <LayoutContainer className="relative z-10 flex min-h-0 flex-1 flex-col justify-center pb-20 pt-16 sm:pb-24 sm:pt-20 lg:min-h-[min(100svh,900px)]">
        <HeroCopy />

        <div data-hero-aside className="hero-aside">
          <BracketFrame
            align="right"
            className="hero-aside__frame ml-auto max-w-none font-mono text-base leading-snug text-zinc-200 md:text-lg"
          >
            <p className="text-pretty text-right drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Talent can open doors. But grit keeps you standing when everything else falls
              apart.
            </p>
          </BracketFrame>
        </div>
      </LayoutContainer>

      <div
        data-hero-scroll
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400 drop-shadow"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-red-500/90 to-transparent" />
      </div>
    </section>
  )
}
