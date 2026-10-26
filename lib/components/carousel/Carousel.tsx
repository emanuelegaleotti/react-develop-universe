import { Children, CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import './carousel.scss'

export interface RduCarouselProps {
  id: string
  children?: ReactNode
  slidesPerView?: number
  scrollButtons?: boolean
  scrollMarker?: boolean
  container?: boolean
  inert?: boolean
}

export function RDU_Carousel ({
  id,
  children,
  slidesPerView = 3,
  scrollButtons = false,
  scrollMarker = false,
  container = false,
  inert = false,
}: RduCarouselProps) {
  if (slidesPerView <= 0) {
    throw new Error('Il valore deve essere maggiore di zero')
  }

  return (
    <div
      id={id}
      className={clsx(
        'rdu-carousel',
        'rdu-carousel--no-pages',
        container && 'rdu-carousel--container',
        scrollButtons && 'rdu-carousel--scroll-buttons',
        scrollMarker && 'rdu-carousel--scroll-marker rdu-carousel--scroll-marker-no-pages',
        inert && 'rdu-carousel--inert',
      )}
      style={{
        '--rdu-carousel-anchor-name': `--rdu-carousel-${id}`,
        '--rdu-carousel-slides-per-view': slidesPerView,
      } as CSSProperties}
    >
      {Children.map(children, child => (
        <div className="rdu-carousel-item">{child}</div>
      ))}
    </div>
  )
}
