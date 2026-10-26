import { ElementType, ReactNode } from 'react'
import { useIntersection, UseIntersectionOptions } from './useIntersection.ts'

export interface RduIntersectionProps extends UseIntersectionOptions {
  as?: ElementType
  className?: string
  children?: ReactNode
}

export function RDU_Intersection ({ as: Tag = 'div', className, children, ...options }: RduIntersectionProps) {
  const ref = useIntersection<HTMLElement>(options)

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
