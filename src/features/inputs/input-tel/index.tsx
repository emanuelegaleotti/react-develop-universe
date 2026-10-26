import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-tel.scss'

import { RDU_InputTel } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const TelForm = z.object({
  tel: z.string().nonempty({ message: 'required' }).max(36, { message: 'maxLength' })
})

type FormControl = z.infer<typeof TelForm>

export function InputTel () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(TelForm),
    mode: 'onChange',
    defaultValues: { tel: '' }
  })

  return (
    <section id="ks-input-tel">
      <h2>Input tel</h2>
      <p>Campo per numeri di telefono, con tastiera numerica sui dispositivi mobili.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputTel name={'tel'}
                      feature={'ks'}
                      id={'tel'}
                      maxLength={36}
                      autoComplete={'none'}
                      disabled={disabled}
                      errorMsg={true}
                      successMsg={true}
                      helpMsg={true}
                      register={register}
                      formState={formState}
                      schema={TelForm}
        />
      </form>
      <ControlState control={control} name="tel" schema={TelForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
