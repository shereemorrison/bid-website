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
  return `${normalizedBase}${clean}`.replace(/\/{2,}/g, '/')
}

const fromEnv = import.meta.env.VITE_HERO_VIDEO?.trim()

export const HERO_VIDEO_SRC = (() => {
  if (!fromEnv) return joinPublic('hero.mp4')
  if (fromEnv.startsWith('http://') || fromEnv.startsWith('https://')) return fromEnv
  if (fromEnv.startsWith('/')) return joinPublic(fromEnv.slice(1))
  return joinPublic(fromEnv)
})()
