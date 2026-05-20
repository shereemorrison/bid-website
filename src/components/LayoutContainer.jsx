import { cn } from '../lib/cn'

/**
 * Responsive width constraint + gutters — wrap new sections for consistent rhythm.
 */
export function LayoutContainer({ children, as: Comp = 'div', className, ...rest }) {
  return (
    <Comp className={cn('layout-container', className)} {...rest}>
      {children}
    </Comp>
  )
}
