import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { DeleteIcon, EditIcon, VisibilityIcon } from '../../../shared/icons.tsx'

interface CrudRowActionsProps {
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function CrudRowActions({ onView, onEdit, onDelete }: CrudRowActionsProps) {
  return (
    <span className="ks-crud-row-actions">
      <RDU_Button type="button" variant="tertiary" text="details" icon={<VisibilityIcon />} iconPosition="only" onClick={onView} />
      <RDU_Button type="button" variant="tertiary" text="edit" icon={<EditIcon />} iconPosition="only" onClick={onEdit} />
      <RDU_Button type="button" variant="error" text="delete" icon={<DeleteIcon />} iconPosition="only" onClick={onDelete} />
    </span>
  )
}
