import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-time.scss'

import { RDU_InputTime } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const TimeForm = z.object({
  time: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof TimeForm>

export function InputTime () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(TimeForm),
    mode: 'onChange',
    defaultValues: { time: '' }
  })

  return (
    <section id="ks-input-time">
      <h2>Input time</h2>
      <p>Selettore di orario nativo del browser, con validazione di campo obbligatorio.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputTime name={'time'}
                       feature={'ks'}
                       id={'time'}
                       autoComplete={'none'}
                       disabled={disabled}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       register={register}
                       formState={formState}
                       schema={TimeForm}
        />
      </form>
      <ControlState control={control} name="time" schema={TimeForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
