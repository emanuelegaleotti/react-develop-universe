import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-radio.scss'

import { RDU_InputRadio } from '../../../../lib/components/inputs/input-radio/input-radio.tsx'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const OPTIONS = ['white', 'red', 'black', 'blue']

const RadioForm = z.object({
  radio: z.string().nonempty({ message: 'required' })
})

type FormControl = z.infer<typeof RadioForm>

export function InputRadio () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(RadioForm),
    mode: 'onChange',
    defaultValues: { radio: 'white' }
  })

  return (
    <section id="ks-input-radio">
      <h2>Input radio</h2>
      <p>Gruppo di radio button collegati allo stesso campo di <code>react-hook-form</code>: il valore è quello dell'opzione selezionata.</p>
      <form onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        {OPTIONS.map((option, index) => {
          const isLast = index === OPTIONS.length - 1
          return (
            <RDU_InputRadio key={option}
                            id={`radio-${option}`}
                            name={'radio'}
                            feature={'ks'}
                            value={option}
                            radioLabel={`ks.radio.options.${option}`}
                            disabled={disabled}
                            errorMsg={isLast}
                            successMsg={isLast}
                            helpMsg={isLast}
                            register={register}
                            formState={formState}
                            schema={RadioForm}
            />
          )
        })}
      </form>
      <ControlState control={control} name="radio" schema={RadioForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
