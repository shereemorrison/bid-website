import { cn } from '../lib/cn'

/**
 * Words/chars wrapped for clip + stagger reveals (`storyReveal.js`).
 */
export function SplitText({
  text,
  mode = 'words',
  className,
  emphasis = false,
  'data-split': dataSplit = '',
}) {
  const units =
    mode === 'chars'
      ? [...text]
      : text.split(/(\s+)/).filter((u) => u.length > 0)

  return (
    <span className={cn('split-text', className)} data-split={dataSplit || undefined}>
      {units.map((unit, i) => {
        const isSpace = /^\s+$/.test(unit)
        if (isSpace) {
          return (
            <span key={i} className="split-text__space">
              {unit}
            </span>
          )
        }

        return (
          <span key={i} className="split-text__unit">
            <span
              className={cn('split-text__inner', emphasis && 'split-text__inner--emphasis')}
            >
              {unit}
            </span>
          </span>
        )
      })}
    </span>
  )
}
