import { useFormState, useWatch } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import type { ZodObject } from 'zod'
import { RDU_Button } from '../../../lib/main.ts'
import './control-state.scss'

type Tone = 'ok' | 'ko' | 'muted'

type StateRow = {
  label: string
  value: string
  tone?: Tone
}

type ControlStateProps = {
  // react-hook-form control of the form that owns the field
  control: Control<any>
  name: string
  // zod schema of the form, used to tell whether the current value is valid
  schema: ZodObject<any>
  disabled: boolean
  onToggleDisabled: () => void
}

function format(value: unknown): string {
  if (value === null || value === undefined) return 'null'
  if (typeof File !== 'undefined' && value instanceof File) return value.name
  if (typeof FileList !== 'undefined' && value instanceof FileList) return `[${Array.from(value).map(format).join(', ')}]`
  if (Array.isArray(value)) return `[${value.map(format).join(', ')}]`
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// Live state of a form control: value, validity and interaction flags
export function ControlState({ control, name, schema, disabled, onToggleDisabled }: ControlStateProps) {
  const value = useWatch({ control, name })
  const { touchedFields, dirtyFields } = useFormState({ control })

  const result = schema.shape[name].safeParse(value)
  const errors = result.success ? [] : result.error.issues.map((issue: { message: string }) => issue.message)

  const rows: StateRow[] = [
    { label: 'Valore', value: format(value) },
    { label: 'Valido', value: String(result.success), tone: result.success ? 'ok' : 'muted' },
    { label: 'Non valido', value: String(!result.success), tone: result.success ? 'muted' : 'ko' },
    { label: 'Disabilitato', value: String(disabled), tone: 'muted' },
    { label: 'Toccato', value: String(Boolean(touchedFields[name])), tone: 'muted' },
    { label: 'Modificato', value: String(Boolean(dirtyFields[name])), tone: 'muted' },
    { label: 'Errori', value: errors.length ? errors.join(', ') : '—', tone: errors.length ? 'ko' : 'muted' }
  ]

  return (
    <article className="ks-control-state">
      <h3>Stato del controllo</h3>
      <dl>
        {rows.map(row => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd data-tone={row.tone}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <RDU_Button type="button" variant="secondary" text={disabled ? 'enable' : 'disable'}
                  onClick={onToggleDisabled} />
    </article>
  )
}
