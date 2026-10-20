/** True when the visitor asked the system to reduce motion. Browser only. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
