import axios from 'axios'
import { POKEAPI_URL, PAGE_SIZE, type PokeApiPage, type NamedApiResource } from '../shared/pokeapi.utils'
import type { PokeType, PokeTypeCreate } from './type.model'

async function getPage(
  page: number,
  limit: number = PAGE_SIZE,
  _search?: string
): Promise<PokeApiPage<NamedApiResource>> {
  const offset = (page - 1) * limit
  const { data } = await axios.get<PokeApiPage<NamedApiResource>>(`${POKEAPI_URL}/type`, {
    params: { limit, offset }
  })
  return data
}

async function getByName(name: string): Promise<PokeType> {
  const { data } = await axios.get<PokeType>(`${POKEAPI_URL}/type/${name}`)
  return data
}

async function create(_payload: PokeTypeCreate): Promise<void> {
  return Promise.resolve()
}

async function update(_payload: PokeTypeCreate): Promise<void> {
  return Promise.resolve()
}

async function deleteFn(_name: string): Promise<void> {
  return Promise.resolve()
}

export const typeService = {
  getPage,
  getByName,
  create,
  update,
  delete: deleteFn,
}
