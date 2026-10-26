import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-week.scss'

import { RDU_InputWeek } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const WeekForm = z.object({
  week: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof WeekForm>

export function InputWeek () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(WeekForm),
    mode: 'onChange',
    defaultValues: { week: '' }
  })

  return (
    <section id="ks-input-week">
      <h2>Input week</h2>
      <p>Selettore di settimana dell'anno. Il valore è una stringa <code>yyyy-Www</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputWeek name={'week'}
                       feature={'ks'}
                       id={'week'}
                       autoComplete={'none'}
                       disabled={disabled}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       register={register}
                       formState={formState}
                       schema={WeekForm}
        />
      </form>
      <ControlState control={control} name="week" schema={WeekForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
