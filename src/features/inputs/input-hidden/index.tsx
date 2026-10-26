import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-hidden.scss'

import { RDU_Button, RDU_InputHidden } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const HiddenForm = z.object({
  hidden: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof HiddenForm>

export function InputHidden () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control, setValue } = useForm<FormControl>({
    resolver: zodResolver(HiddenForm),
    mode: 'onChange',
    defaultValues: { hidden: '' }
  })

  const fill = () => setValue('hidden', 'segreto-123', { shouldDirty: true, shouldValidate: true })

  return (
    <section id="ks-input-hidden">
      <h2>Input hidden</h2>
      <p>Campo nascosto: non è visibile all'utente ma partecipa alla validazione del form. Usa il pulsante per impostarne il valore.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputHidden name={'hidden'}
                         feature={'ks'}
                         id={'hidden'}
                         maxLength={30}
                         autoComplete={'none'}
                         disabled={disabled}
                         errorMsg={true}
                         successMsg={true}
                         register={register}
                         formState={formState}
                         schema={HiddenForm}
        />
        <RDU_Button type={'button'} text={'set-value'} disabled={disabled} onClick={fill} />
      </form>
      <ControlState control={control} name="hidden" schema={HiddenForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
