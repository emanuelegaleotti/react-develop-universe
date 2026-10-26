import { RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export interface UseIntersectionOptions {
  onItemIn?: () => void
  onItemOut?: () => void
  rootMargin?: string
  threshold?: number | number[]
  root?: Element | Document | null
}

/**
 * Observes an element with an IntersectionObserver and notifies when it enters (`onItemIn`)
 * or leaves (`onItemOut`) the viewport (or the `root` element).
 * Returns a callback ref to attach to the observed element.
 */
export function useIntersection<T extends Element = HTMLElement> ({
  onItemIn,
  onItemOut,
  rootMargin = '0px',
  threshold,
  root,
}: UseIntersectionOptions = {}): RefCallback<T> {
  const [element, setElement] = useState<T | null>(null)
  const handlers = useRef({ onItemIn, onItemOut })

  useEffect(() => {
    handlers.current = { onItemIn, onItemOut }
  })

  useEffect(() => {
    if (!element) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          handlers.current.onItemIn?.()
        } else {
          handlers.current.onItemOut?.()
        }
      })
    }, { rootMargin, threshold, root })

    observer.observe(element)
    return () => observer.disconnect()
  }, [element, rootMargin, threshold, root])

  return useCallback((node: T | null) => setElement(node), [])
}
