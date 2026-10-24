import {
  createAsyncThunk,
  createListenerMiddleware,
  createSlice,
  isAnyOf,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'
import type { NamedApiResource } from '../shared/pokeapi.utils'
import type { PokeType, PokeTypeCreate } from './type.model'
import { typeService } from './type.service'

// ─── State ───────────────────────────────────────────────────────────────────

interface TypeState {
  currentPage: number
  pageSize: number
  searchTerm: string
  results: NamedApiResource[]
  count: number
  selectedTypeName: string | null
  selectedType: PokeType | null
}

const initialState: TypeState = {
  currentPage: 1,
  pageSize: 20,
  searchTerm: '',
  results: [],
  count: 0,
  selectedTypeName: null,
  selectedType: null,
}

// ─── Thunks (equivalente NgRx Effects) ───────────────────────────────────────

export const fetchTypes = createAsyncThunk(
  'type/fetchTypes',
  async (_, { getState }) => {
    const { currentPage, pageSize, searchTerm } = (getState() as RootState).typeState
    return typeService.getPage(currentPage, pageSize, searchTerm)
  }
)

export const fetchTypeDetail = createAsyncThunk(
  'type/fetchTypeDetail',
  async (name: string) => typeService.getByName(name)
)

export const createType = createAsyncThunk(
  'type/create',
  async (payload: PokeTypeCreate) => typeService.create(payload)
)

export const updateType = createAsyncThunk(
  'type/update',
  async (payload: PokeTypeCreate) => typeService.update(payload)
)

export const deleteType = createAsyncThunk(
  'type/delete',
  async (name: string) => typeService.delete(name)
)

// ─── Slice ────────────────────────────────────────────────────────────────────

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.currentPage = 1
      state.pageSize = action.payload
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.currentPage = 1
      state.searchTerm = action.payload
    },
    selectType(state, action: PayloadAction<string>) {
      state.selectedTypeName = action.payload
      state.selectedType = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.results = action.payload.results
        state.count = action.payload.count
      })
      .addCase(fetchTypeDetail.fulfilled, (state, action) => {
        state.selectedType = action.payload
      })
  },
})

export const { setPage, setPageSize, setSearchTerm, selectType } = typeSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectCurrentPage = (state: RootState) => state.typeState.currentPage
export const selectPageSize = (state: RootState) => state.typeState.pageSize
export const selectSearchTerm = (state: RootState) => state.typeState.searchTerm
export const selectResults = (state: RootState) => state.typeState.results
export const selectCount = (state: RootState) => state.typeState.count
export const selectSelectedType = (state: RootState) => state.typeState.selectedType

// ─── Listener Middleware (NgRx Effects equivalente) ───────────────────────────
// Reagisce alle azioni e orchestra le chiamate asincrone, mantenendo i
// componenti privi di logica asincrona.

export const typeListenerMiddleware = createListenerMiddleware()

// Ricarica la lista quando cambia paginazione o ricerca
typeListenerMiddleware.startListening({
  matcher: isAnyOf(setPage, setPageSize, setSearchTerm),
  effect: (_action, api) => { api.dispatch(fetchTypes()) },
})

// Ricarica la lista dopo ogni mutazione
typeListenerMiddleware.startListening({
  matcher: isAnyOf(deleteType.fulfilled, createType.fulfilled, updateType.fulfilled),
  effect: (_action, api) => { api.dispatch(fetchTypes()) },
})

// Carica il dettaglio quando viene selezionato un tipo
typeListenerMiddleware.startListening({
  actionCreator: selectType,
  effect: (action, api) => { api.dispatch(fetchTypeDetail(action.payload)) },
})
