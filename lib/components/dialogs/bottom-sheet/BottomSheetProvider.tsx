import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetContext, type BottomSheetContextType } from './BottomSheetContext.tsx'
import { RDU_BottomSheet } from './BottomSheet.tsx'

export function BottomSheetProvider ({ children, closeIcon }: { children: ReactNode, closeIcon?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)
  const [id, setId] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [className, setClassName] = useState<string>()
  const resolver = useRef<((result: unknown) => void) | null>(null)
  const result = useRef<unknown>(undefined)

  const settle = useCallback(() => {
    resolver.current?.(result.current)
    resolver.current = null
    result.current = undefined
  }, [])

  const openBottomSheet = useCallback<BottomSheetContextType['openBottomSheet']>((node, sheetTitle, sheetId, sheetClassName) => {
    settle()
    setContent(node)
    setTitle(sheetTitle)
    setId(sheetId)
    setClassName(sheetClassName)
    setOpen(true)
    return new Promise(resolve => {
      resolver.current = resolve as (value: unknown) => void
    })
  }, [settle])

  const closeBottomSheet = useCallback((closeResult?: unknown) => {
    result.current = closeResult
    setOpen(false)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
    settle()
  }, [settle])

  const value = useMemo(() => ({ openBottomSheet, closeBottomSheet }), [openBottomSheet, closeBottomSheet])

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
      <RDU_BottomSheet open={open}
                       id={id}
                       title={title}
                       className={className}
                       closeIcon={closeIcon}
                       onClose={onClose}>
        {content}
      </RDU_BottomSheet>
    </BottomSheetContext.Provider>
  )
}
