import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './select-object.scss'

import { RDU_SelectObject } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const OPTIONS = [
  { id: 1, color: 'white' },
  { id: 2, color: 'red' },
  { id: 3, color: 'black' },
  { id: 4, color: 'blue' }
]

const SelectObjectForm = z.object({
  selectObject: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof SelectObjectForm>

export function SelectObject () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(SelectObjectForm),
    mode: 'onChange',
    defaultValues: { selectObject: '' }
  })

  return (
    <section id="ks-select-object">
      <h2>Select object</h2>
      <p>Menu a tendina alimentato da un array di oggetti: il testo mostrato viene da <code>optionKey</code>, il valore salvato da <code>valueKey</code>.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_SelectObject name={'selectObject'}
                          feature={'ks'}
                          id={'selectObject'}
                          options={OPTIONS}
                          optionKey={'color'}
                          valueKey={'id'}
                          autoComplete={'none'}
                          disabled={disabled}
                          errorMsg={true}
                          successMsg={true}
                          helpMsg={true}
                          register={register}
                          formState={formState}
                          schema={SelectObjectForm}
        />
      </form>
      <ControlState control={control} name="selectObject" schema={SelectObjectForm} disabled={disabled}
                     onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
