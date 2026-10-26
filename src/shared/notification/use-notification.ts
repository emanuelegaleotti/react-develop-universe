import { useCallback, useEffect, useRef, useState } from 'react'

export type NotificationPermissionState = NotificationPermission | 'unsupported'

export type NotificationSendResult = { ok: true } | { ok: false, reason: 'unsupported' | 'not-granted' | 'error' }

const isSupported = () => typeof window !== 'undefined' && 'Notification' in window

const readPermission = (): NotificationPermissionState => isSupported() ? Notification.permission : 'unsupported'

// Thin wrapper around the browser Notification API (local notifications, no push)
export function useNotification () {
  const [permission, setPermission] = useState<NotificationPermissionState>(readPermission)
  const [isOpen, setIsOpen] = useState(false)
  const current = useRef<Notification | null>(null)

  // The user can change the permission from the browser UI while the page is open
  useEffect(() => {
    if (!isSupported() || !navigator.permissions) {
      return
    }
    let status: PermissionStatus | undefined
    const sync = () => setPermission(readPermission())
    navigator.permissions.query({ name: 'notifications' })
      .then(result => {
        status = result
        status.addEventListener('change', sync)
      })
      .catch(() => undefined)
    return () => status?.removeEventListener('change', sync)
  }, [])

  const requestPermission = useCallback(async (): Promise<NotificationPermissionState> => {
    if (!isSupported()) {
      return 'unsupported'
    }
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const close = useCallback(() => {
    current.current?.close()
    current.current = null
    setIsOpen(false)
  }, [])

  const send = useCallback((title: string, options?: NotificationOptions): NotificationSendResult => {
    if (!isSupported()) {
      return { ok: false, reason: 'unsupported' }
    }
    if (Notification.permission !== 'granted') {
      setPermission(readPermission())
      return { ok: false, reason: 'not-granted' }
    }
    try {
      current.current?.close()
      const notification = new Notification(title, options)
      notification.onclose = () => {
        if (current.current === notification) {
          current.current = null
          setIsOpen(false)
        }
      }
      notification.onclick = () => {
        window.focus()
        notification.close()
      }
      current.current = notification
      setIsOpen(true)
      return { ok: true }
    } catch {
      // Some browsers (e.g. Chrome on Android) only allow notifications through a service worker
      return { ok: false, reason: 'error' }
    }
  }, [])

  useEffect(() => () => current.current?.close(), [])

  return { permission, isSupported: permission !== 'unsupported', isOpen, requestPermission, send, close }
}
