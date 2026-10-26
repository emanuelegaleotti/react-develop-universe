import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-checkbox.scss'

import { RDU_InputCheckbox } from '../../../../lib/components/inputs/input-checkbox/input-checkbox.tsx'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

// The box must be checked: a plain boolean would also accept false
const CheckboxForm = z.object({
  checkbox: z.boolean().refine(value => value, { message: 'required' })
})

type FormControl = z.infer<typeof CheckboxForm>

export function InputCheckbox () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(CheckboxForm),
    mode: 'onChange',
    defaultValues: { checkbox: false }
  })

  return (
    <section id="ks-input-checkbox">
      <h2>Input checkbox</h2>
      <p>Casella booleana. Per obbligare l'utente a spuntarla si usa <code>refine</code>, perché un <code>boolean</code> semplice considera valido anche <code>false</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputCheckbox id={'checkbox'}
                           name={'checkbox'}
                           label={'checkbox'}
                           feature={'ks'}
                           autoComplete={'none'}
                           disabled={disabled}
                           errorMsg={true}
                           successMsg={true}
                           helpMsg={true}
                           register={register}
                           formState={formState}
                           schema={CheckboxForm}
        />
      </form>
      <ControlState control={control} name="checkbox" schema={CheckboxForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
