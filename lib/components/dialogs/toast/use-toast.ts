import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { addToast, removeToast, type RduToastOptions } from './toast-slice.ts'
import { setToastIcon } from './toast-icon-registry.ts'

export function useToast () {
  const dispatch = useDispatch()

  return useMemo(() => ({
    // Shows the toast, replacing the one that is currently visible; returns its id
    showToast: ({ icon, ...options }: RduToastOptions): string => {
      const action = addToast(options)
      setToastIcon(action.payload.id, icon)
      dispatch(action)
      return action.payload.id
    },
    hideToast: () => {
      dispatch(removeToast())
    },
  }), [dispatch])
}
