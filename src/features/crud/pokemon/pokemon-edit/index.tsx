import './pokemon-edit.scss'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputText } from '../../../../../lib/components/inputs/input-text/InputText.tsx'
import { RDU_InputNumber } from '../../../../../lib/components/inputs/input-number/InputNumber.tsx'
import { pokemonService } from '../pokemon.service'

const FEATURE = 'crud.pokemon'

const PokemonSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  height: z.number({ message: 'required' }).min(1, { message: 'min' }),
  weight: z.number({ message: 'required' }).min(1, { message: 'min' }),
  base_experience: z.number({ message: 'required' }).min(0, { message: 'min' }),
})

type PokemonFormData = z.infer<typeof PokemonSchema>

export function PokemonEdit() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const isCreateMode = name === 'create'

  const { register, handleSubmit, reset, formState } = useForm<PokemonFormData>({
    resolver: zodResolver(PokemonSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (!isCreateMode && name) {
      pokemonService.getByName(name).then(pokemon => {
        reset({
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          base_experience: pokemon.base_experience,
        })
      })
    }
  }, [isCreateMode, name, reset])

  const onSubmit = handleSubmit(async (data) => {
    if (isCreateMode) {
      await pokemonService.create(data)
    } else {
      await pokemonService.update(data)
    }
    navigate('/crud/pokemon')
  })

  return (
    <section className="rdu-grid-main" id="pokemon-edit">
      <hgroup>
        <h2>{isCreateMode ? 'Crea Pokémon' : 'Modifica Pokémon'}</h2>
        <p>
          {isCreateMode
            ? <>Esempio di creazione di un&apos;entità tramite <strong>form</strong>. La chiamata al servizio è uno stub.</>
            : <>Esempio di modifica di un&apos;entità tramite <strong>form</strong>. La chiamata al servizio è uno stub.</>}
        </p>
      </hgroup>

      <form onSubmit={onSubmit}>
        <RDU_InputText
          name="name"
          feature={FEATURE}
          id="pokemon-name"
          maxLength={100}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
          schema={PokemonSchema}
        />

        <RDU_InputNumber
          name="height"
          feature={FEATURE}
          id="pokemon-height"
          min={1}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
        />

        <RDU_InputNumber
          name="weight"
          feature={FEATURE}
          id="pokemon-weight"
          min={1}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
        />

        <RDU_InputNumber
          name="base_experience"
          feature={FEATURE}
          id="pokemon-base-experience"
          min={0}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
        />

        <fieldset>
          <RDU_Button type="button" variant="light" text="cancel" disabled={formState.isSubmitting} onClick={() => navigate('/crud/pokemon')} />
          <RDU_Button type="submit" variant="primary" text={isCreateMode ? 'create' : 'save'} disabled={formState.isSubmitting} />
        </fieldset>
      </form>
    </section>
  )
}

