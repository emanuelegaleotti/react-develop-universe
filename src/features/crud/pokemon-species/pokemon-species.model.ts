import type { NamedApiResource } from '../shared/pokeapi.utils'

export interface PokemonSpeciesCreate {
  name: string
  capture_rate: number
  base_happiness: number | null
  gender_rate: number
}

export interface FlavorTextEntry {
  flavor_text: string
  language: NamedApiResource
  version: NamedApiResource
}

export interface PokemonSpecies {
  id: number
  name: string
  base_happiness: number | null
  capture_rate: number
  color: NamedApiResource
  habitat: NamedApiResource | null
  is_legendary: boolean
  is_mythical: boolean
  gender_rate: number
  flavor_text_entries: FlavorTextEntry[]
  evolution_chain: { url: string }
  evolves_from_species: NamedApiResource | null
  egg_groups: NamedApiResource[]
}
