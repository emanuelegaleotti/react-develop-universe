import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-month.scss'

import { RDU_InputMonth } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const MonthForm = z.object({
  month: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof MonthForm>

export function InputMonth () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(MonthForm),
    mode: 'onChange',
    defaultValues: { month: '' }
  })

  return (
    <section id="ks-input-month">
      <h2>Input month</h2>
      <p>Selettore di mese e anno. Il valore è una stringa <code>yyyy-mm</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputMonth name={'month'}
                        feature={'ks'}
                        id={'month'}
                        autoComplete={'none'}
                        disabled={disabled}
                        errorMsg={true}
                        successMsg={true}
                        helpMsg={true}
                        register={register}
                        formState={formState}
                        schema={MonthForm}
        />
      </form>
      <ControlState control={control} name="month" schema={MonthForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
