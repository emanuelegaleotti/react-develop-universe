import type { ReactNode } from 'react'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { DeleteIcon } from '../../../shared/icons.tsx'

interface CrudConfirmProps {
  id: string
  name: string
  onConfirm: () => void
  onCancel: () => void
}

export function CrudConfirm({ id, name, onConfirm, onCancel }: CrudConfirmProps): ReactNode {
  return (
    <div className="ks-confirm" id={id}>
      <div className="ks-confirm-body">
        <span className="ks-confirm-icon" aria-hidden="true"><DeleteIcon /></span>
        <div>
          <p>Sei sicuro di voler eliminare <strong>{name}</strong>?</p>
          <p>Questa operazione non può essere annullata.</p>
        </div>
      </div>
      <div className="ks-confirm-footer">
        <RDU_Button type="button" variant="secondary" text="cancel" onClick={onCancel} />
        <RDU_Button type="button" variant="error" text="delete" onClick={onConfirm} />
      </div>
    </div>
  )
}
