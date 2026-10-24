import { ReactNode, useRef, useState } from 'react'
import { OffcanvasContext } from './OffcanvasContext.tsx'
import './offcanvas.scss'
import {useTranslation} from "react-i18next";

 export function OffcanvasProvider ({ children, closeIcon }: { children: ReactNode, closeIcon?: ReactNode }) {
  const { t } = useTranslation()

  const offcanvasRef = useRef<HTMLDialogElement>(null)
  const [content, setContent] = useState<ReactNode>(null)
  const [id, setId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [position, setPosition] = useState<'left' | 'right'>('right')

  const openOffcanvas = (
    node: ReactNode,
    position: 'left' | 'right',
    title?: string,
    id?: string
  ) => {
    setContent(node)
    if (title) {
      setTitle(title)
    }
    if (id) {
      setId(id)
    }
    setPosition(position)
    offcanvasRef.current?.showModal()
  }

  const closeOffcanvas = () => {
    offcanvasRef.current?.close()
    setContent(null)
  }

  return (
    <OffcanvasContext.Provider value={{ openOffcanvas, closeOffcanvas }}>
      {children}
      <dialog ref={offcanvasRef}
              className={`rdu-offcanvas rdu-${position}`}
              id={id}>
        <div className="rdu-offcanvas-content">
        <div className={'rdu-offcanvas-header'}>
          <h4>{title}</h4>
          <button className={'rdu-offcanvas-button-close'}
                  title={t('rdu.button.close')}
                  onClick={closeOffcanvas}>
            {closeIcon}
          </button>
        </div>
        {content}
        </div>
      </dialog>
    </OffcanvasContext.Provider>
  )
}
