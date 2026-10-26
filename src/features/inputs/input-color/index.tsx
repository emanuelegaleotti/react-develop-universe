import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-color.scss'

import { RDU_InputColor } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const ColorForm = z.object({
  color: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof ColorForm>

export function InputColor () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(ColorForm),
    mode: 'onChange',
    defaultValues: { color: '' }
  })

  return (
    <section id="ks-input-color">
      <h2>Input color</h2>
      <p>Selettore di colore nativo. Il valore è una stringa esadecimale <code>#rrggbb</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputColor name={'color'}
                        feature={'ks'}
                        id={'color'}
                        autoComplete={'none'}
                        disabled={disabled}
                        errorMsg={true}
                        successMsg={true}
                        helpMsg={true}
                        register={register}
                        formState={formState}
                        schema={ColorForm}
        />
      </form>
      <ControlState control={control} name="color" schema={ColorForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
