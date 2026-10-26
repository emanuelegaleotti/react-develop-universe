import './bottom-sheet.scss'
import { type ReactNode, useEffect, useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

export type RduBottomSheetProps = {
  open: boolean
  onClose: () => void
  children?: ReactNode
  title?: string
  id?: string
  className?: string
  closeIcon?: ReactNode
}

// Modal native <dialog> (showModal) closed by the close button, Esc or the `open` prop
export function RDU_BottomSheet ({ open, onClose, children, title, id, className, closeIcon }: RduBottomSheetProps) {
  const { t } = useTranslation()
  const sheetRef = useRef<HTMLDialogElement>(null)
  const generatedId = useId()
  const titleId = `rdu-bottom-sheet-title-${generatedId.replace(/:/g, '')}`

  useEffect(() => {
    const sheet = sheetRef.current
    if (!sheet) {
      return
    }
    if (open && !sheet.open) {
      sheet.showModal()
    } else if (!open && sheet.open) {
      sheet.close()
    }
  }, [open])

  return (
    <dialog ref={sheetRef}
            id={id}
            className={clsx('rdu-bottom-sheet', className)}
            aria-labelledby={title ? titleId : undefined}
            onClose={onClose}>
      <header className="rdu-bottom-sheet-header">
        <span className="rdu-bottom-sheet-handle" aria-hidden="true"/>
        {title && <h4 id={titleId}>{title}</h4>}
        <button type="button"
                className="rdu-bottom-sheet-close"
                title={t('rdu.button.close')}
                aria-label={t('rdu.button.close')}
                onClick={() => sheetRef.current?.close()}>
          {closeIcon}
        </button>
      </header>
      {children}
    </dialog>
  )
}
