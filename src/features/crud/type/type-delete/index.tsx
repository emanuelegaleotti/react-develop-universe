import { useAppDispatch } from '../../../../app/hooks.ts'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { deleteType } from '../type-slice.ts'

interface TypeDeleteProps {
  name: string
  onCancel: () => void
}

export function TypeDelete({ name, onCancel }: TypeDeleteProps) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteType(name))
    onCancel()
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
