import './toast.scss'
import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { removeToast, selectToast, type RduToast } from './toast-slice.ts'
import { getToastIcon } from './toast-icon-registry.ts'

const pad = (value: number) => String(value).padStart(2, '0')

// dd/MM/yyyy HH:mm
function formatDateTime (value: string): string {
  const date = new Date(value)
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

type ToastItemProps = {
  toast: RduToast
  closeIcon?: ReactNode
  onClose: () => void
}

// Non-modal native <dialog>: opened with show() and closed with close()
function ToastItem ({ toast, closeIcon, onClose }: ToastItemProps) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const icon = getToastIcon(toast.id)
  const { duration } = toast

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.show()
    const timer = duration === null ? undefined : setTimeout(onClose, duration)
    return () => {
      clearTimeout(timer)
      dialog?.close()
    }
  }, [duration, onClose])

  return (
    <dialog ref={dialogRef}
            id={toast.id}
            className={clsx('rdu-toast', toast.className)}>
      <div className="rdu-toast-content">
        <div className="rdu-toast-header">
          {icon && <span className="rdu-toast-icon">{icon}</span>}
          {toast.title && <h4 className="rdu-toast-title">{toast.title}</h4>}
          <button type="button"
                  className="rdu-toast-close"
                  title={t('rdu.button.close')}
                  aria-label={t('rdu.button.close')}
                  onClick={onClose}>
            {closeIcon}
          </button>
        </div>
        {toast.message && <p className="rdu-toast-message">{toast.message}</p>}
        {toast.dateTime && (
          <time className="rdu-toast-datetime" dateTime={toast.dateTime}>{formatDateTime(toast.dateTime)}</time>
        )}
      </div>
    </dialog>
  )
}

export function ToastProvider ({ children, closeIcon }: { children: ReactNode, closeIcon?: ReactNode }) {
  const dispatch = useDispatch()
  const toast = useSelector(selectToast)
  const onClose = useCallback(() => {
    dispatch(removeToast())
  }, [dispatch])

  return (
    <>
      {children}
      {toast && (
        <div key={toast.id}
             className={clsx('rdu-toast-stack', `rdu-toast-stack-${toast.position}`)}>
          <ToastItem toast={toast} closeIcon={closeIcon} onClose={onClose}/>
        </div>
      )}
    </>
  )
}
