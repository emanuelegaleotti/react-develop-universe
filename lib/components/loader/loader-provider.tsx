import { createContext, ReactNode, useContext } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoaderVisible } from './loader-slice.ts'
import './_loader.scss'

const LoaderContext = createContext({})

export function useLoader () {
  return useContext(LoaderContext)
}

export function LoaderProvider ({ children, loaderComponent }: { children: ReactNode, loaderComponent?: ReactNode }) {
  const isLoaderVisible: boolean = useSelector(selectIsLoaderVisible)
  const value = {}
  return (
    <LoaderContext.Provider value={value}>
      {children}
      {isLoaderVisible && <section id="rdu-loader">
        <div>
          {loaderComponent}
        </div>
      </section>}
    </LoaderContext.Provider>
  )
}
