import { useCallback } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { cn } from '../lib/cn'

/** Mute / unmute hero soundtrack. */
export function HeroVolumeToggle({ muted, onToggle, className }) {
  const toggle = useCallback(() => onToggle(), [onToggle])

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'pointer-events-auto flex size-9 shrink-0 items-center justify-center rounded',
        'border border-dashed border-white/35 bg-black/25 text-zinc-200',
        'transition hover:border-red-500/50 hover:bg-red-950/60 hover:text-white',
        className,
      )}
      aria-pressed={!muted}
      aria-label={muted ? 'Unmute soundtrack' : 'Mute soundtrack'}
    >
      {muted ? <FiVolumeX className="size-4" aria-hidden /> : <FiVolume2 className="size-4" aria-hidden />}
    </button>
  )
}
