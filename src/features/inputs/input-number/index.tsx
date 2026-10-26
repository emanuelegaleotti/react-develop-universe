import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-number.scss'

import { RDU_InputNumber } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const NumberForm = z.object({
  number: z.number({ message: 'required' }).min(0, { message: 'min' }).max(15, { message: 'max' })
})

type FormControl = z.infer<typeof NumberForm>

export function InputNumber () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(NumberForm),
    mode: 'onChange',
    defaultValues: { number: 0 }
  })

  return (
    <section id="ks-input-number">
      <h2>Input number</h2>
      <p>Campo numerico con validazione di minimo e massimo (da 0 a 15).</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputNumber name={'number'}
                         feature={'ks'}
                         id={'number'}
                         min={0}
                         max={15}
                         autoComplete={'none'}
                         disabled={disabled}
                         errorMsg={true}
                         successMsg={true}
                         helpMsg={true}
                         register={register}
                         formState={formState}
        />
      </form>
      <ControlState control={control} name="number" schema={NumberForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
