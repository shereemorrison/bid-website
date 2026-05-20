import { cn } from '../lib/cn'

/**
 * 12-column section rack — matches hero: main (7) + aside (5), shared gutters.
 */
export function SectionGrid({ children, className }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SectionMain({ children, className }) {
  return <div className={cn('lg:col-span-7 lg:col-start-1', className)}>{children}</div>
}

export function SectionAside({ children, className }) {
  return (
    <div
      className={cn(
        'flex justify-start lg:col-span-5 lg:col-start-8 lg:justify-end',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SectionFull({ children, className }) {
  return <div className={cn('lg:col-span-12 lg:col-start-1', className)}>{children}</div>
}
