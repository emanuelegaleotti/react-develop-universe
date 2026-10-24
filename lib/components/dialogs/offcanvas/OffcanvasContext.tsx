import { createContext, useContext } from 'react'

type OffcanvasContextType = {
  openOffcanvas: (
    content: React.ReactNode,
    position: 'left' | 'right',
    title?: string,
    id?: string
  ) => void;
  closeOffcanvas: () => void;
};

export const OffcanvasContext = createContext<OffcanvasContextType | undefined>(undefined)

export function useOffcanvas () {
  const context = useContext(OffcanvasContext)
  if (!context) {
    throw new Error('useOffcanvas must be used within a OffcanvasProvider')
  }
  return context
}
