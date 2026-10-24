import { createSelector, createSlice } from '@reduxjs/toolkit'

export interface ErrorState {
  error: { status: number, message: string } | null
}

const initialState: ErrorState = {
  error: null,
}

export const RduErrorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action) => {
      state.error = action.payload
    },
    hideError: (state) => {
      state.error = null
    },
  },
})

export const {
  showError, hideError
} = RduErrorSlice.actions

export default RduErrorSlice.reducer

export const selectErrorState = (state: any): ErrorState => state.errorState
export const selectError = createSelector(
  selectErrorState,
  (state: ErrorState): { status: number, message: string } | null => state?.error
)
export const selectIsErrorVisible = createSelector(
  selectErrorState,
  (state: ErrorState): boolean => !!state?.error
)


