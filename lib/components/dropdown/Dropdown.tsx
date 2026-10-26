import './dropdown.scss'
import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'
import clsx from 'clsx'

type RduDropdownProps = {
  // Used to build the CSS anchor name that ties the menu to the summary button
  id: string
  label?: ReactNode
  children?: ReactNode
  className?: string
}

// <details>/<summary> with the menu placed through CSS anchor positioning; the content is free
export function RDU_Dropdown ({ id, label = '', children, className }: RduDropdownProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const anchorName = `--${id}`

  useEffect(() => {
    const details = detailsRef.current
    if (!details) {
      return
    }
    const close = () => details.removeAttribute('open')
    const onDocumentClick = (event: MouseEvent) => {
      if (!details.contains(event.target as Node)) {
        close()
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && details.open) {
        details.querySelector('summary')?.focus()
        close()
      }
    }
    document.addEventListener('click', onDocumentClick)
    details.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', onDocumentClick)
      details.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <details ref={detailsRef} className={clsx('rdu-dropdown', className)}>
      <summary className="rdu-dropdown-button" style={{ anchorName } as CSSProperties}>
        {label}
      </summary>
      <div className="rdu-dropdown-menu" style={{ positionAnchor: anchorName } as CSSProperties}>
        {children}
      </div>
    </details>
  )
}
