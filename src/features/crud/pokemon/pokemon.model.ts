import type { NamedApiResource } from '../shared/pokeapi.utils'

export interface PokemonListItem extends NamedApiResource {
  spriteUrl: string
}

export interface PokemonAbility {
  ability: NamedApiResource
  is_hidden: boolean
  slot: number
}

export interface PokemonType {
  slot: number
  type: NamedApiResource
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedApiResource
}

export interface PokemonSprites {
  front_default: string | null
  back_default: string | null
  front_shiny: string | null
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  is_default: boolean
  abilities: PokemonAbility[]
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
}

export interface PokemonCreate {
  name: string
  height: number
  weight: number
  base_experience: number
}
