import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-search.scss'

import { RDU_InputSearch } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'

const SearchForm = z.object({
  query: z.string().nonempty({ message: 'required' }).max(36, { message: 'maxLength' })
})

type FormControl = z.infer<typeof SearchForm>

export function InputSearch () {
  const [disabled, setDisabled] = useState(false)

  const { register, formState, control } = useForm<FormControl>({
    resolver: zodResolver(SearchForm),
    mode: 'onChange',
    defaultValues: { query: '' }
  })

  return (
    <section id="ks-input-search">
      <h2>Input search</h2>
      <p>Campo di ricerca con ruolo <code>search</code> e pulsante di cancellazione.</p>
      <form role="search" onSubmit={event => event.preventDefault()}>
        <h3>Esempio</h3>
        <RDU_InputSearch name={'query'}
                         feature={'ks'}
                         id={'search'}
                         maxLength={36}
                         autoComplete={'none'}
                         disabled={disabled}
                         errorMsg={true}
                         successMsg={true}
                         helpMsg={true}
                         register={register}
                         formState={formState}
                         schema={SearchForm}
        />
      </form>
      <ControlState control={control} name="query" schema={SearchForm} disabled={disabled}
                    onToggleDisabled={() => setDisabled(value => !value)} />
    </section>
  )
}
