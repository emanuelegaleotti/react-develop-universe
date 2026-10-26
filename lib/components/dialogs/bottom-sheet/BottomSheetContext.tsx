import { createContext, type ReactNode, useContext } from 'react'

export type BottomSheetContextType = {
  // Resolves with the value passed to closeBottomSheet, or undefined when closed with the close button or Esc
  openBottomSheet: <T = unknown>(content: ReactNode, title?: string, id?: string, className?: string) => Promise<T | undefined>
  closeBottomSheet: (result?: unknown) => void
}

export const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined)

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext)

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider')
  }

  return context
}
