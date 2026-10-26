import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-text.scss'

import { RDU_InputText } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const TextForm = z.object({
  text: z.string().nonempty({ message: 'required' }).max(36, { message: 'maxLength' })
})

type FormControl = z.infer<typeof TextForm>

export function InputText () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(TextForm),
    mode: 'onChange',
    defaultValues: { text: '' }
  })

  return (
    <section id="ks-input-text">
      <h2>Input text</h2>
      <p>Campo di testo libero con label, help, messaggio di successo ed errore generati dalle traduzioni.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputText name={'text'}
                       feature={'ks'}
                       id={'text'}
                       maxLength={36}
                       autoComplete={'none'}
                       disabled={disabled}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       register={register}
                       formState={formState}
                       schema={TextForm}
        />
      </form>
      <ControlState control={control} name="text" schema={TextForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
