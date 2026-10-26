import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-datalist.scss'

import { RDU_InputDatalist } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const OPTIONS = ['Edge', 'Firefox', 'Chrome', 'Opera', 'Safari'].map(value => ({ value }))

const DatalistForm = z.object({
  datalist: z.string().nonempty({ message: 'required' }).max(36, { message: 'maxLength' })
})

type FormControl = z.infer<typeof DatalistForm>

export function InputDataList () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(DatalistForm),
    mode: 'onChange',
    defaultValues: { datalist: '' }
  })

  return (
    <section id="ks-input-datalist">
      <h2>Input datalist</h2>
      <p>Campo di testo con suggerimenti: l'utente può scegliere un valore dall'elenco o scrivere liberamente.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputDatalist name={'datalist'}
                           feature={'ks'}
                           id={'datalist'}
                           maxLength={36}
                           options={OPTIONS}
                           autoComplete={'none'}
                           disabled={disabled}
                           errorMsg={true}
                           successMsg={true}
                           helpMsg={true}
                           register={register}
                           formState={formState}
                           schema={DatalistForm}
        />
      </form>
      <ControlState control={control} name="datalist" schema={DatalistForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
