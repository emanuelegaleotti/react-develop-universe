import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-password.scss'

import { RDU_InputPassword } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const PasswordForm = z.object({
  password: z.string().nonempty({ message: 'required' }).max(30, { message: 'maxLength' })
})

type FormControl = z.infer<typeof PasswordForm>

export function InputPassword () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(PasswordForm),
    mode: 'onChange',
    defaultValues: { password: '' }
  })

  return (
    <section id="ks-input-password">
      <h2>Input password</h2>
      <p>Campo password con pulsante per mostrare o nascondere il testo.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputPassword name={'password'}
                           feature={'ks'}
                           id={'password'}
                           maxLength={30}
                           autoComplete={'none'}
                           disabled={disabled}
                           errorMsg={true}
                           successMsg={true}
                           helpMsg={true}
                           register={register}
                           formState={formState}
                           schema={PasswordForm}
        />
      </form>
      <ControlState control={control} name="password" schema={PasswordForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
