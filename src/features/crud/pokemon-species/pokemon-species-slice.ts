import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store'

interface PokemonSpeciesState {
  currentPage: number
  pageSize: number
  searchTerm: string
}

const initialState: PokemonSpeciesState = {
  currentPage: 1,
  pageSize: 20,
  searchTerm: '',
}

export const pokemonSpeciesSlice = createSlice({
  name: 'pokemonSpecies',
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
  },
})

export const { setPage, setPageSize, setSearchTerm } = pokemonSpeciesSlice.actions

export const selectCurrentPage = (state: RootState) => state.pokemonSpeciesState.currentPage
export const selectPageSize = (state: RootState) => state.pokemonSpeciesState.pageSize
export const selectSearchTerm = (state: RootState) => state.pokemonSpeciesState.searchTerm
