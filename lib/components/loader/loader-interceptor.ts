import { AxiosStatic, InternalAxiosRequestConfig } from 'axios'
import { EnhancedStore } from '@reduxjs/toolkit'
import { hideLoader, showLoader } from './loader-slice.ts'

declare module 'axios' {
  interface AxiosRequestConfig {
    rduNoLoader?: boolean
  }
}

export interface LoaderInterceptorConfig {
  // Requests carrying this header skip the loader (the header is removed before sending)
  excludeHeader?: string
  // Requests matching method and url fragment skip the loader
  excludeUrls?: { method: string, url: string }[]
}

export function setupLoaderInterceptor(axios: AxiosStatic, store: EnhancedStore, config: LoaderInterceptorConfig = {}) {
  const { excludeHeader = 'No-Loader', excludeUrls = [] } = config

  const isExcluded = (request: InternalAxiosRequestConfig): boolean => {
    if (request.headers?.has(excludeHeader)) {
      request.headers.delete(excludeHeader)
      return true
    }
    return excludeUrls.some(u =>
      request.method?.toLowerCase() === u.method.toLowerCase() && !!request.url?.includes(u.url)
    )
  }

  axios.interceptors.request.use(
    (request) => {
      if (isExcluded(request)) {
        request.rduNoLoader = true
        return request
      }
      store.dispatch(showLoader())
      return request
    },
    () => {
      store.dispatch(hideLoader())
    }
  )

  axios.interceptors.response.use(
    (response) => {
      if (!response.config?.rduNoLoader) {
        store.dispatch(hideLoader())
      }
      return response
    },
    (error) => {
      if (!error?.config?.rduNoLoader) {
        store.dispatch(hideLoader())
      }
    }
  )
}