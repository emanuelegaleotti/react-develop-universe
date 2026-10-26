import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './textarea.scss'

import { RDU_Textarea } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const TextareaForm = z.object({
  textarea: z.string().nonempty({ message: 'required' }).max(256, { message: 'maxLength' })
})

type FormControl = z.infer<typeof TextareaForm>

export function Textarea () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(TextareaForm),
    mode: 'onChange',
    defaultValues: { textarea: '' }
  })

  return (
    <section id="ks-textarea">
      <h2>Textarea</h2>
      <p>Area di testo multilinea con limite di caratteri.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_Textarea name={'textarea'}
                      feature={'ks'}
                      id={'textarea'}
                      maxLength={256}
                      cols={5}
                      rows={5}
                      autoComplete={'none'}
                      disabled={disabled}
                      errorMsg={true}
                      successMsg={true}
                      helpMsg={true}
                      register={register}
                      formState={formState}
                      schema={TextareaForm}
        />
      </form>
      <ControlState control={control} name="textarea" schema={TextareaForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
