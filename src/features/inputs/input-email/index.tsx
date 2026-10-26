import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-email.scss'

import { RDU_InputEmail } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

// pipe: the format check runs only on a non empty value, like Validators.email
const EmailForm = z.object({
  email: z.string().nonempty({ message: 'required' }).max(30, { message: 'maxLength' }).pipe(z.email({ message: 'email' }))
})

type FormControl = z.infer<typeof EmailForm>

export function InputEmail () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(EmailForm),
    mode: 'onChange',
    defaultValues: { email: '' }
  })

  return (
    <section id="ks-input-email">
      <h2>Input email</h2>
      <p>Campo email con validazione del formato tramite <code>zod</code> (<code>z.email</code>).</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputEmail name={'email'}
                        feature={'ks'}
                        id={'email'}
                        maxLength={30}
                        autoComplete={'none'}
                        disabled={disabled}
                        errorMsg={true}
                        successMsg={true}
                        helpMsg={true}
                        register={register}
                        formState={formState}
                        schema={EmailForm}
        />
      </form>
      <ControlState control={control} name="email" schema={EmailForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
