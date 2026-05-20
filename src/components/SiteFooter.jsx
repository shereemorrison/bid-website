import { LayoutContainer } from './LayoutContainer'
import { ATHLETE_FULL_NAME } from '../lib/athlete'

/** Minimal closing band — legal, socials, etc. */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-sm text-zinc-500">
      <LayoutContainer className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p lang="sr-Latn">
          © {new Date().getFullYear()} {ATHLETE_FULL_NAME}. All rights reserved.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
          Built for motion-first storytelling
        </p>
      </LayoutContainer>
    </footer>
  )
}
