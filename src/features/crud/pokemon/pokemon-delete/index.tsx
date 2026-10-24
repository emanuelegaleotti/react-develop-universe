import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { pokemonService } from '../pokemon.service'

interface PokemonDeleteProps {
  name: string
  onDeleted: () => void
  onCancel: () => void
}

export function PokemonDelete({ name, onDeleted, onCancel }: PokemonDeleteProps) {
  const handleDelete = () => {
    pokemonService.delete(name).then(onDeleted)
  }

  return (
    <>
      <div className="rdu-dialog-body">
        <p>Sei sicuro di voler eliminare <strong>{name}</strong>?</p>
        <p>Questa operazione non può essere annullata.</p>
      </div>
      <div className="rdu-dialog-footer">
        <RDU_Button type="button" variant="light" text="cancel" onClick={onCancel} />
        <RDU_Button type="button" variant="error" text="delete" onClick={handleDelete} />
      </div>
    </>
  )
}

