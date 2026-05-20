import { cn } from '../lib/cn'

export function BracketFrame({ children, align = 'left', className }) {
  const isRight = align === 'right'

  return (
    <div
      className={cn(
        'relative max-w-[min(100%,28rem)] text-sm leading-snug text-zinc-400',
        isRight && 'ml-auto text-right',
        className,
      )}
    >
      <span
        className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-white/40"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-r border-b border-white/40"
        aria-hidden
      />
      <div className={cn('py-4', isRight ? 'pl-7 pr-3' : 'pl-7 pr-5')}>{children}</div>
    </div>
  )
}
