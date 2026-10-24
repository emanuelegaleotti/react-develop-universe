import { createContext, type ReactNode, useContext } from 'react'

type DialogContextType = {
  openDialog: (content: ReactNode, title?: string, id?: string) => void
  closeDialog: () => void
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  return context
}
