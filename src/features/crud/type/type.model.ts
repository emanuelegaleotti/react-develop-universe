import type { NamedApiResource } from '../shared/pokeapi.utils'

export interface PokeTypeCreate {
  name: string
}

export interface DamageRelations {
  double_damage_from: NamedApiResource[]
  double_damage_to: NamedApiResource[]
  half_damage_from: NamedApiResource[]
  half_damage_to: NamedApiResource[]
  no_damage_from: NamedApiResource[]
  no_damage_to: NamedApiResource[]
}

export interface TypePokemon {
  slot: number
  pokemon: NamedApiResource
}

export interface PokeType {
  id: number
  name: string
  damage_relations: DamageRelations
  generation: NamedApiResource
  pokemon: TypePokemon[]
  moves: NamedApiResource[]
}
