import './type-delete.scss'

import { useAppDispatch } from '../../../../app/hooks.ts'
import { CrudConfirm } from '../../shared/crud-confirm.tsx'
import { deleteType } from '../type-slice.ts'

interface TypeDeleteProps {
  name: string
  onDeleted: () => void
  onCancel: () => void
}

export function TypeDelete({ name, onDeleted, onCancel }: TypeDeleteProps) {
  const dispatch = useAppDispatch()

  return (
    <CrudConfirm
      id="ks-type-delete"
      name={name}
      onConfirm={() => dispatch(deleteType(name)).then(onDeleted)}
      onCancel={onCancel}
    />
  )
}
