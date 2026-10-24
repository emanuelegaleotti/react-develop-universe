import axios from 'axios'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { DialogProvider } from '../../lib/components/dialogs/dialog/DialogProvider.tsx'
import { OffcanvasProvider } from '../../lib/components/dialogs/offcanvas/OffcanvasProvider.tsx'
import { ErrorProvider } from '../../lib/components/error/error-provider.tsx'
import { LoaderProvider } from '../../lib/components/loader/loader-provider.tsx'
import { setupLoaderInterceptor } from '../../lib/components/loader/loader-interceptor.ts'
import { setupErrorInterceptor } from '../../lib/components/error/error-interceptor.ts'
import i18n from '../i18n'
import { CloseIcon } from '../shared/icons.tsx'
import store from './store.ts'

setupLoaderInterceptor(axios, store)
setupErrorInterceptor(axios, store)

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <LoaderProvider>
          <OffcanvasProvider closeIcon={CloseIcon()}>
            <DialogProvider closeIcon={CloseIcon()}>
              <ErrorProvider closeIcon={CloseIcon()}>
                {children}
              </ErrorProvider>
            </DialogProvider>
          </OffcanvasProvider>
        </LoaderProvider>
      </Provider>
    </I18nextProvider>
  )
}
