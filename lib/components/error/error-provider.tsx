import './_error.scss'
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideError, selectError, selectIsErrorVisible } from './error-slice.ts'
import {useTranslation} from "react-i18next";

const ErrorContext = createContext({})

export function useError () {
  return useContext(ErrorContext)
}

export function ErrorProvider ({ children, closeIcon }: { children: ReactNode, closeIcon?: ReactNode }) {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const isErrorVisible: boolean = useSelector(selectIsErrorVisible)
  const errorDialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (isErrorVisible) {
      errorDialog.current?.showModal()
    } else {
      errorDialog.current?.close()
    }
  }, [isErrorVisible])
  const value = {}

  const closeDialog = () => {
    dispatch(hideError())

  }

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <dialog id="rdu-error-dialog"
              ref={errorDialog}
              className="rdu-dialog">
        <div className={'rdu-dialog-header'}>
          <h4>{error?.status}</h4>
          <h5>{t(`error.${error?.status}.title`)}</h5>
          <button className={'rdu-dialog-button-close'}
                  title={t('rdu.button.close')}
                  onClick={closeDialog}>
            {closeIcon}
          </button>
        </div>
        <div className={'rdu-dialog-body'}>
          <p>{t(`error.${error?.status}.message`)}</p>
        </div>
        <div className={'rdu-dialog-footer'}>
          <button type={'button'} onClick={closeDialog}
                  title={t('rdu.button.close')}>
            {t('rdu.button.close')}
          </button>
        </div>
      </dialog>
    </ErrorContext.Provider>
  )
}