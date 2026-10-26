import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './select.scss'

import { RDU_Select } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const OPTIONS = ['blue', 'black', 'red', 'white']

const SelectForm = z.object({
  select: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof SelectForm>

export function Select () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(SelectForm),
    mode: 'onChange',
    defaultValues: { select: '' }
  })

  return (
    <section id="ks-select">
      <h2>Select</h2>
      <p>Menu a tendina alimentato da un array di stringhe.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_Select name={'select'}
                    feature={'ks'}
                    id={'select'}
                    options={OPTIONS}
                    autoComplete={'none'}
                    disabled={disabled}
                    errorMsg={true}
                    successMsg={true}
                    helpMsg={true}
                    register={register}
                    formState={formState}
                    schema={SelectForm}
        />
      </form>
      <ControlState control={control} name="select" schema={SelectForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
