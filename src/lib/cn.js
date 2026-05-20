/**
 * Tiny className helper — avoids adding `clsx` while keeping section markup readable.
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}
