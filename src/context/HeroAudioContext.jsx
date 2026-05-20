import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  HERO_AUDIO_SRC,
  HERO_AUDIO_START_EVENT,
  HERO_AUDIO_START_SECONDS,
} from '../lib/heroMedia'

const HeroAudioContext = createContext(null)

export function HeroAudioProvider({ children }) {
  const audioRef = useRef(null)
  const userMutedRef = useRef(false)
  const soundEnabledRef = useRef(true)
  const hasStartedRef = useRef(false)
  const reduced = usePrefersReducedMotion()
  const [userMuted, setUserMuted] = useState(false)
  userMutedRef.current = userMuted

  const ensurePlaying = useCallback(
    async ({ audible = false } = {}) => {
      const audio = audioRef.current
      if (!audio || reduced || userMutedRef.current) return

      if (!hasStartedRef.current) {
        audio.currentTime = HERO_AUDIO_START_SECONDS
        hasStartedRef.current = true
      }

      audio.muted = !audible

      try {
        await audio.play()
      } catch {
        /* Audible play must be triggered from the enter button gesture. */
      }
    },
    [reduced],
  )

  /** Called from enter buttons — withSound must run inside the click handler. */
  const prepareEnter = useCallback(
    (withSound) => {
      soundEnabledRef.current = withSound
      setUserMuted(!withSound)
      userMutedRef.current = !withSound

      if (withSound) {
        ensurePlaying({ audible: true })
      }
    },
    [ensurePlaying],
  )

  const onReveal = useCallback(() => {
    if (!soundEnabledRef.current || userMutedRef.current) return

    const audio = audioRef.current
    if (!audio) return

    if (!hasStartedRef.current) {
      ensurePlaying({ audible: true })
      return
    }

    if (audio.muted) {
      audio.muted = false
      audio.play().catch(() => {})
    }
  }, [ensurePlaying])

  useEffect(() => {
    if (reduced) return

    window.addEventListener(HERO_AUDIO_START_EVENT, onReveal)
    return () => window.removeEventListener(HERO_AUDIO_START_EVENT, onReveal)
  }, [reduced, onReveal])

  useEffect(() => {
    if (!reduced) return
    soundEnabledRef.current = true
    hasStartedRef.current = true
    ensurePlaying({ audible: true })
  }, [reduced, ensurePlaying])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!userMuted && !audio.paused) {
      setUserMuted(true)
      userMutedRef.current = true
      soundEnabledRef.current = false
      audio.pause()
      audio.muted = false
      return
    }

    setUserMuted(false)
    userMutedRef.current = false
    soundEnabledRef.current = true

    if (!hasStartedRef.current) {
      ensurePlaying({ audible: true })
      return
    }

    audio.muted = false
    audio.play().catch(() => {})
  }, [ensurePlaying, userMuted])

  return (
    <HeroAudioContext.Provider value={{ userMuted, toggle, prepareEnter }}>
      <audio ref={audioRef} src={HERO_AUDIO_SRC} loop preload="auto" className="sr-only" />
      {children}
    </HeroAudioContext.Provider>
  )
}

export function useHeroAudio() {
  const ctx = useContext(HeroAudioContext)
  if (!ctx) throw new Error('useHeroAudio must be used within HeroAudioProvider')
  return ctx
}
