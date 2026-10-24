export const POKEAPI_URL = 'https://pokeapi.co/api/v2'
export const PAGE_SIZE = 20

export interface NamedApiResource {
  name: string
  url: string
}

export interface PokeApiPage<T = NamedApiResource> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export function extractId (url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : 0
}

export function getPokemonSpriteUrl (id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
