import { AxiosStatic } from 'axios'
import { EnhancedStore } from '@reduxjs/toolkit'
import { hideLoader, showLoader } from './loader-slice.ts'

export function setupLoaderInterceptor(axios: AxiosStatic, store: EnhancedStore) {
  axios.interceptors.request.use(
    (request) => {
      store.dispatch(showLoader())
      return request
    },
    () => {
      store.dispatch(hideLoader())
    }
  )

  axios.interceptors.response.use(
    (response) => {
      store.dispatch(hideLoader())
      return response
    },
    () => {
      store.dispatch(hideLoader())
    }
  )
}