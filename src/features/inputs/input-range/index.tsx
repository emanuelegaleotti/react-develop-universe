import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-range.scss'

import { RDU_InputRange } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const RangeForm = z.object({
  range: z.number({ message: 'required' })
})

type FormControl = z.infer<typeof RangeForm>

export function InputRange () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(RangeForm),
    mode: 'onChange',
    defaultValues: { range: 0 }
  })

  return (
    <section id="ks-input-range">
      <h2>Input range</h2>
      <p>Cursore per scegliere un valore numerico in un intervallo.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputRange name={'range'}
                        feature={'ks'}
                        id={'range'}
                        autoComplete={'none'}
                        disabled={disabled}
                        errorMsg={true}
                        successMsg={true}
                        helpMsg={true}
                        register={register}
                        formState={formState}
                        schema={RangeForm}
        />
      </form>
      <ControlState control={control} name="range" schema={RangeForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
