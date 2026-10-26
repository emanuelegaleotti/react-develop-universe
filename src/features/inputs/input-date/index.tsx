import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-date.scss'

import { RDU_InputDate } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const DateForm = z.object({
  date: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof DateForm>

export function InputDate () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(DateForm),
    mode: 'onChange',
    defaultValues: { date: '' }
  })

  return (
    <section id="ks-input-date">
      <h2>Input date</h2>
      <p>Selettore di data nativo del browser. Il valore è una stringa ISO <code>yyyy-mm-dd</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputDate name={'date'}
                       feature={'ks'}
                       id={'date'}
                       autoComplete={'none'}
                       disabled={disabled}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       register={register}
                       formState={formState}
                       schema={DateForm}
        />
      </form>
      <ControlState control={control} name="date" schema={DateForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
