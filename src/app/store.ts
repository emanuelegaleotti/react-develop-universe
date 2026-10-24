import { configureStore } from '@reduxjs/toolkit'
import {RduChatSlice } from '../../lib/components/chat/store/chat-slice.ts'
import { RduErrorSlice } from '../../lib/components/error/error-slice.ts'
import { RduLoaderSlice } from '../../lib/components/loader/loader-slice.ts'
import { pokemonSpeciesSlice } from '../features/crud/pokemon-species/pokemon-species-slice.ts'
import { typeSlice, typeListenerMiddleware } from '../features/crud/type/type-slice.ts'

export const store = configureStore({
  reducer: {
    loaderState: RduLoaderSlice.reducer,
    chatState: RduChatSlice.reducer,
    errorState: RduErrorSlice.reducer,
    pokemonSpeciesState: pokemonSpeciesSlice.reducer,
    typeState: typeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(typeListenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store