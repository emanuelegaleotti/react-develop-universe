import axios from 'axios'
import {
  PAGE_SIZE,
  POKEAPI_URL,
  extractId,
  getPokemonSpriteUrl,
  type NamedApiResource,
  type PokeApiPage
} from '../shared/pokeapi.utils'
import type { Pokemon, PokemonCreate, PokemonListItem } from './pokemon.model'

function mapPokemonListItem (resource: NamedApiResource): PokemonListItem {
  const id = extractId(resource.url)

  return {
    ...resource,
    spriteUrl: getPokemonSpriteUrl(id)
  }
}

async function getPage(
  page: number,
  limit: number = PAGE_SIZE,
  _search?: string
): Promise<PokeApiPage<PokemonListItem>> {
  const offset = (page - 1) * limit
  const { data } = await axios.get<PokeApiPage>(`${POKEAPI_URL}/pokemon`, {
    params: { limit, offset }
  })
  return {
    ...data,
    results: data.results.map(mapPokemonListItem)
  }
}

async function getByName (name: string): Promise<Pokemon> {
  const { data } = await axios.get<Pokemon>(`${POKEAPI_URL}/pokemon/${name.toLowerCase()}`)
  return data
}

function create (_payload: PokemonCreate): Promise<void> {
  return Promise.resolve()
}

function update (_payload: PokemonCreate): Promise<void> {
  return Promise.resolve()
}

function deletePokemon (_name: string): Promise<void> {
  return Promise.resolve()
}

export const pokemonService = {
  getPage,
  getByName,
  create,
  update,
  delete: deletePokemon
}
