import { ReactNode, useRef, useState } from 'react'
import { DialogContext } from './DialogContext'
import './dialog.scss'
import {useTranslation} from "react-i18next";

export function DialogProvider ({ children, closeIcon }: { children: ReactNode, closeIcon?: ReactNode }) {
  const { t } = useTranslation()

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [content, setContent] = useState<ReactNode>(null)
  const [id, setId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const openDialog = (node: ReactNode, title?: string, id?: string) => {
    setContent(node)
    if (title) {
      setTitle(title)
    }
    if (id) {
      setId(id)
    }
    dialogRef.current?.showModal()
  }

  const closeDialog = () => {
    dialogRef.current?.close()
    setContent(null)
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <dialog ref={dialogRef}
              className={'rdu-dialog'}
              id={id}>
        <div className={'rdu-dialog-header'}>
          <h4>{title}</h4>
          <button className={'rdu-dialog-button-close'}
                  title={t('rdu.button.close')}
                  onClick={closeDialog}>
            {closeIcon}
          </button>
        </div>
        {content}
      </dialog>
    </DialogContext.Provider>
  )
}
