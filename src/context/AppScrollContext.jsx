import { createContext } from 'react'

/**
 * Shared scroll surface: Lenis instance (when smooth) + normalized scroll progress for UI chrome.
 */
export const AppScrollContext = createContext({
  /** @type {import('lenis').default | null} */
  lenis: null,
  /** 0–1 page scroll (from Lenis or native fallback) */
  scrollProgress: 0,
})
