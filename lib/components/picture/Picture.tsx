import { ImgHTMLAttributes } from 'react'
import clsx from 'clsx'
import './picture.scss'

export type PictureBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const PICTURE_BREAKPOINT_MAP: Record<PictureBreakpoint, string> = {
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1366px)',
  xl: '(min-width: 1920px)',
  '2xl': '(min-width: 2560px)',
}

// From the widest to the narrowest: the browser picks the first <source> whose media matches
const BREAKPOINT_ORDER: PictureBreakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm']

export interface RduPictureSource {
  srcSet: string
  srcSet2x?: string
  srcSet3x?: string
  type?: string
  sizes?: string
  width: number
  height: number
}

export interface RduPictureProps {
  id?: string
  src: string
  alt: string
  width: number
  height: number
  className?: string
  loading?: 'eager' | 'lazy'
  crossOrigin?: 'anonymous' | 'use-credentials'
  decoding?: 'sync' | 'async' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
  sourceSm?: RduPictureSource
  sourceMd?: RduPictureSource
  sourceLg?: RduPictureSource
  sourceXl?: RduPictureSource
  source2xl?: RduPictureSource
  onLoad?: ImgHTMLAttributes<HTMLImageElement>['onLoad']
}

export function buildSrcSet (source: RduPictureSource): string {
  const descriptors = [`${source.srcSet} 1x`]
  if (source.srcSet2x) descriptors.push(`${source.srcSet2x} 2x`)
  if (source.srcSet3x) descriptors.push(`${source.srcSet3x} 3x`)
  return descriptors.join(', ')
}

export function RDU_Picture ({
  id,
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  crossOrigin = 'anonymous',
  decoding,
  fetchPriority = 'auto',
  referrerPolicy,
  sourceSm,
  sourceMd,
  sourceLg,
  sourceXl,
  source2xl,
  onLoad,
}: RduPictureProps) {
  const sources: Record<PictureBreakpoint, RduPictureSource | undefined> = {
    sm: sourceSm,
    md: sourceMd,
    lg: sourceLg,
    xl: sourceXl,
    '2xl': source2xl,
  }

  return (
    <picture id={id} className={clsx('rdu-picture', className)}>
      {BREAKPOINT_ORDER.map(breakpoint => {
        const source = sources[breakpoint]
        if (!source) return null
        return (
          <source
            key={breakpoint}
            media={PICTURE_BREAKPOINT_MAP[breakpoint]}
            srcSet={buildSrcSet(source)}
            sizes={source.sizes}
            type={source.type}
            width={source.width}
            height={source.height}
          />
        )
      })}
      <img
        className="rdu-picture-img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        crossOrigin={crossOrigin}
        decoding={decoding}
        fetchPriority={fetchPriority}
        referrerPolicy={referrerPolicy}
        onLoad={onLoad}
      />
    </picture>
  )
}
