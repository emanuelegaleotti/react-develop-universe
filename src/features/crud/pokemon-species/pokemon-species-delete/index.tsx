import './pokemon-species-delete.scss'

import { CrudConfirm } from '../../shared/crud-confirm.tsx'
import { pokemonSpeciesService } from '../pokemon-species.service'

interface PokemonSpeciesDeleteProps {
  name: string
  onDeleted: () => void
  onCancel: () => void
}

export function PokemonSpeciesDelete({ name, onDeleted, onCancel }: PokemonSpeciesDeleteProps) {
  return (
    <CrudConfirm
      id="ks-species-delete"
      name={name}
      onConfirm={() => pokemonSpeciesService.delete(name).then(onDeleted)}
      onCancel={onCancel}
    />
  )
}
