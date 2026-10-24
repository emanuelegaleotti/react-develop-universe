import { AxiosStatic } from 'axios'
import { EnhancedStore } from '@reduxjs/toolkit'
import { showError } from './error-slice.ts'

export function setupErrorInterceptor(axios: AxiosStatic, store: EnhancedStore) {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      store.dispatch(showError({ status: error.status, message: error.message }))
    }
  )
}