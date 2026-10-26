import './pokemon-delete.scss'

import { CrudConfirm } from '../../shared/crud-confirm.tsx'
import { pokemonService } from '../pokemon.service'

interface PokemonDeleteProps {
  name: string
  onDeleted: () => void
  onCancel: () => void
}

export function PokemonDelete({ name, onDeleted, onCancel }: PokemonDeleteProps) {
  return (
    <CrudConfirm
      id="ks-pokemon-delete"
      name={name}
      onConfirm={() => pokemonService.delete(name).then(onDeleted)}
      onCancel={onCancel}
    />
  )
}
