import { createSelector, createSlice } from '@reduxjs/toolkit'


export interface LoaderState {
  loaders: number
}

const initialState: LoaderState = {
  loaders: 0,
}

export const RduLoaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loaders++
    },
    hideLoader: (state) => {
      state.loaders--
    },
  },
})

export const {
  showLoader, hideLoader
} = RduLoaderSlice.actions

export default RduLoaderSlice.reducer

export const selectLoaderState = (state: any): LoaderState => state.loaderState
export const selectLoaders = createSelector(
  selectLoaderState,
  (state: LoaderState): number => state.loaders
)
export const selectIsLoaderVisible = createSelector(
  selectLoaderState,
  (state: LoaderState): boolean => !!state.loaders
)


