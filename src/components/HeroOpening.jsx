import { useCallback, useLayoutEffect, useRef } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { gsap } from '../animations/registerGsap'
import { runHeroOpening } from '../animations/heroOpening'
import { HERO_AUDIO_START_EVENT } from '../lib/heroMedia'
import { useHeroAudio } from '../context/HeroAudioContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { cn } from '../lib/cn'

const enterBtnClass = cn(
  'font-mono text-[10px] uppercase tracking-[0.28em] transition',
  'rounded border border-dashed px-5 py-2.5 will-change-transform',
  'hover:border-red-500/50 hover:bg-red-950/40 hover:text-white',
)

/**
 * Reveal: centred window on hero video → full bleed → overlay fades out.
 * @see https://www.awwwards.com/inspiration/loading-animation-teletech
 */
export function HeroOpening({ onComplete }) {
  const reduced = usePrefersReducedMotion()
  const { prepareEnter } = useHeroAudio()
  const rootRef = useRef(null)
  const windowRef = useRef(null)
  const flashRef = useRef(null)
  const shockwaveRef = useRef(null)
  const loadingRef = useRef(null)
  const buttonsRef = useRef(null)
  const timelineRef = useRef(null)
  const startedRef = useRef(false)

  const beginIntro = useCallback(
    (withSound, event) => {
      if (startedRef.current) return

      const root = rootRef.current
      const win = windowRef.current
      if (!root || !win) return

      startedRef.current = true
      prepareEnter(withSound)

      const clickedButton = event?.currentTarget ?? null
      if (clickedButton) clickedButton.disabled = true
      buttonsRef.current?.querySelectorAll('button').forEach((btn) => {
        if (btn !== clickedButton) btn.disabled = true
      })

      timelineRef.current = runHeroOpening({
        root,
        windowEl: win,
        loading: loadingRef.current,
        buttons: buttonsRef.current,
        shockwave: shockwaveRef.current,
        flash: flashRef.current,
        clickedButton,
        onComplete,
      })
    },
    [onComplete, prepareEnter],
  )

  useLayoutEffect(() => {
    if (reduced) {
      window.dispatchEvent(new CustomEvent(HERO_AUDIO_START_EVENT))
      onComplete()
      return
    }

    const root = rootRef.current
    const win = windowRef.current
    if (!root || !win) return

    const extras = [
      flashRef.current,
      shockwaveRef.current,
      loadingRef.current,
      buttonsRef.current,
    ].filter(Boolean)

    document.body.style.overflow = 'hidden'

    return () => {
      timelineRef.current?.kill()
      gsap.killTweensOf([root, win, ...extras])
      document.body.style.overflow = ''
    }
  }, [reduced, onComplete])

  if (reduced) return null

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-red-700 opacity-0 mix-blend-screen"
        aria-hidden
      />

      <div
        ref={windowRef}
        className="pointer-events-none shrink-0 rounded-[2px] bg-transparent shadow-[0_0_0_120vmax_#060304]"
        aria-hidden
      />

      <div
        ref={shockwaveRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border-2 border-red-500/70 opacity-0 shadow-[0_0_40px_rgba(220,38,38,0.35)]"
        aria-hidden
      />

      <div className="absolute z-10 flex flex-col items-center gap-5 px-4">
        <p
          ref={loadingRef}
          className="font-mono text-[11px] uppercase tracking-[0.55em] text-red-500/95 will-change-transform"
        >
          Enter the Experience
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3"
        >
          <button
            type="button"
            className={cn(
              enterBtnClass,
              'border-red-500/45 bg-red-950/30 text-red-100',
            )}
            onClick={(e) => beginIntro(true, e)}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <FiVolume2 className="size-3.5 shrink-0" aria-hidden />
              Enter with sound
            </span>
          </button>
          <button
            type="button"
            className={cn(enterBtnClass, 'border-white/30 bg-black/30 text-zinc-300')}
            onClick={(e) => beginIntro(false, e)}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <FiVolumeX className="size-3.5 shrink-0" aria-hidden />
              Enter without sound
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
