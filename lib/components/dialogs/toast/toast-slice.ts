import type { ReactNode } from 'react'
import { createSelector, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type RduToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

export interface RduToastOptions {
  position?: RduToastPosition
  id?: string
  className?: string
  title?: string
  message?: string
  // Not serializable, so it never goes through the store (see toast-icon-registry)
  icon?: ReactNode
  dateTime?: Date | string | number
  // Milliseconds before the toast closes by itself; null or undefined keeps it until it is closed
  duration?: number | null
}

export interface RduToast {
  id: string
  position: RduToastPosition
  className?: string
  title?: string
  message?: string
  dateTime?: string
  duration: number | null
}

export interface ToastState {
  toast: RduToast | null
}

const initialState: ToastState = {
  toast: null,
}

export const RduToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    // A new toast replaces the active one
    addToast: {
      reducer: (state, action: PayloadAction<RduToast>) => {
        state.toast = action.payload
      },
      prepare: (options: RduToastOptions) => ({
        payload: {
          id: options.id ?? nanoid(),
          position: options.position ?? 'top-right',
          className: options.className,
          title: options.title,
          message: options.message,
          dateTime: options.dateTime === undefined ? undefined : new Date(options.dateTime).toISOString(),
          duration: options.duration ?? null,
        } satisfies RduToast,
      }),
    },
    removeToast: (state) => {
      state.toast = null
    },
  },
})

export const {
  addToast, removeToast
} = RduToastSlice.actions

export default RduToastSlice.reducer

export const selectToastState = (state: { toastState: ToastState }): ToastState => state.toastState
export const selectToast = createSelector(
  selectToastState,
  (state: ToastState): RduToast | null => state?.toast ?? null
)
