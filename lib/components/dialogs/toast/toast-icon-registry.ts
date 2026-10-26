import type { ReactNode } from 'react'

// React nodes can't live in the redux store: the icon of the active toast is kept here, keyed by toast id
let current: { id: string, icon: ReactNode } | null = null

export const setToastIcon = (id: string, icon: ReactNode) => {
  current = icon ? { id, icon } : null
}

export const getToastIcon = (id: string): ReactNode => current?.id === id ? current.icon : null
