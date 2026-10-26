import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-url.scss'

import { RDU_InputUrl } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const UrlForm = z.object({
  url: z.string().nonempty({ message: 'required' }).regex(/^http:\/\/.*$/, { message: 'pattern' })
})

type FormControl = z.infer<typeof UrlForm>

export function InputUrl () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(UrlForm),
    mode: 'onChange',
    defaultValues: { url: '' }
  })

  return (
    <section id="ks-input-url">
      <h2>Input url</h2>
      <p>Campo per indirizzi web, con validazione tramite uno schema <code>zod</code> con <code>regex</code> (deve iniziare con <code>http://</code>).</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputUrl name={'url'}
                      feature={'ks'}
                      id={'url'}
                      autoComplete={'none'}
                      disabled={disabled}
                      errorMsg={true}
                      successMsg={true}
                      helpMsg={true}
                      register={register}
                      formState={formState}
                      schema={UrlForm}
        />
      </form>
      <ControlState control={control} name="url" schema={UrlForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
