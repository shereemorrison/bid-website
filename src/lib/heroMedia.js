/**
 * Hero background video URL.
 *
 * 1. Default: `public/hero.mp4` → served at `/hero.mp4` (respects Vite `BASE_URL`).
 * 2. Override: set `VITE_HERO_VIDEO` in `.env` — e.g. `/promo.mp4` or `https://…` (full URL).
 *
 */
const base = import.meta.env.BASE_URL ?? '/'
const normalizedBase = base.endsWith('/') ? base : `${base}/`

/** @param {string} path */
function joinPublic(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const encoded = clean.split('/').map((segment) => encodeURIComponent(segment)).join('/')
  return `${normalizedBase}${encoded}`.replace(/\/{2,}/g, '/')
}

const fromEnv = import.meta.env.VITE_HERO_VIDEO?.trim()

export const HERO_VIDEO_SRC = (() => {
  if (!fromEnv) return joinPublic('hero.mp4')
  if (fromEnv.startsWith('http://') || fromEnv.startsWith('https://')) return fromEnv
  if (fromEnv.startsWith('/')) return joinPublic(fromEnv.slice(1))
  return joinPublic(fromEnv)
})()

const audioFromEnv = import.meta.env.VITE_HERO_AUDIO?.trim()

/** Hero soundtrack — file in `public/` (default: ES_WON'T STOP - Bhris Drip.mp3) */
export const HERO_AUDIO_SRC = (() => {
  if (!audioFromEnv) return joinPublic("ES_WON'T STOP - Bhris Drip.mp3")
  if (audioFromEnv.startsWith('http://') || audioFromEnv.startsWith('https://')) return audioFromEnv
  if (audioFromEnv.startsWith('/')) return joinPublic(audioFromEnv.slice(1))
  return joinPublic(audioFromEnv)
})()

/** Seconds into the track when the reel starts (after intro) */
export const HERO_AUDIO_START_SECONDS = Number(
  import.meta.env.VITE_HERO_AUDIO_START_SECONDS ?? 0,
)

/** Fired when the iris window begins growing — soundtrack should start here. */
export const HERO_AUDIO_START_EVENT = 'bid:hero-audio-start'

