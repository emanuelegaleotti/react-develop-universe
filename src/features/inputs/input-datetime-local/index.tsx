import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-datetime-local.scss'

import { RDU_InputDatetimeLocal } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const DatetimeForm = z.object({
  datetime: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof DatetimeForm>

export function InputDatetimeLocal () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(DatetimeForm),
    mode: 'onChange',
    defaultValues: { datetime: '' }
  })

  return (
    <section id="ks-input-datetime-local">
      <h2>Input datetime-local</h2>
      <p>Selettore di data e ora locali. Il valore è una stringa <code>yyyy-mm-ddThh:mm</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputDatetimeLocal name={'datetime'}
                                feature={'ks'}
                                id={'datetime'}
                                autoComplete={'none'}
                                disabled={disabled}
                                errorMsg={true}
                                successMsg={true}
                                helpMsg={true}
                                register={register}
                                formState={formState}
                                schema={DatetimeForm}
        />
      </form>
      <ControlState control={control} name="datetime" schema={DatetimeForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
