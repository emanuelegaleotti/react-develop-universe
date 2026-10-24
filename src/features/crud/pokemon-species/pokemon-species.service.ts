import axios from 'axios'
import { POKEAPI_URL, PAGE_SIZE, type PokeApiPage, type NamedApiResource } from '../shared/pokeapi.utils'
import type { PokemonSpecies, PokemonSpeciesCreate } from './pokemon-species.model'

async function getPage(
  page: number,
  limit: number = PAGE_SIZE,
  _search?: string
): Promise<PokeApiPage<NamedApiResource>> {
  const offset = (page - 1) * limit
  const { data } = await axios.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/pokemon-species`, {
    params: { limit, offset }
  })
  return data
}

async function getByName(name: string): Promise<PokemonSpecies> {
  const { data } = await axios.get<PokemonSpecies>(`${POKEAPI_URL}/pokemon-species/${name}`)
  return data
}

async function create(_payload: PokemonSpeciesCreate): Promise<void> {
  return Promise.resolve()
}

async function update(_payload: PokemonSpeciesCreate): Promise<void> {
  return Promise.resolve()
}

async function deleteFn(_name: string): Promise<void> {
  return Promise.resolve()
}

export const pokemonSpeciesService = {
  getPage,
  getByName,
  create,
  update,
  delete: deleteFn,
}
