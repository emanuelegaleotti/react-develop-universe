import './pokemon-species-edit.scss'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputText } from '../../../../../lib/components/inputs/input-text/InputText.tsx'
import { RDU_InputNumber } from '../../../../../lib/components/inputs/input-number/InputNumber.tsx'
import { pokemonSpeciesService } from '../pokemon-species.service'

const FEATURE = 'crud.species'

const PokemonSpeciesSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  capture_rate: z.number({ message: 'required' }).min(0, { message: 'min' }),
  base_happiness: z.number().nullable().catch(null),
  gender_rate: z.number({ message: 'required' }),
})

type PokemonSpeciesFormData = z.infer<typeof PokemonSpeciesSchema>

export function PokemonSpeciesEdit() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const isCreateMode = name === 'create'

  const { register, handleSubmit, reset, formState } = useForm<PokemonSpeciesFormData>({
    resolver: zodResolver(PokemonSpeciesSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (!isCreateMode && name) {
      pokemonSpeciesService.getByName(name).then(species => {
        reset({
          name: species.name,
          capture_rate: species.capture_rate,
          base_happiness: species.base_happiness,
          gender_rate: species.gender_rate,
        })
      })
    }
  }, [isCreateMode, name, reset])

  const onSubmit = handleSubmit(async (data) => {
    if (isCreateMode) {
      await pokemonSpeciesService.create(data)
    } else {
      await pokemonSpeciesService.update(data)
    }
    navigate('/crud/pokemon-species')
  })

  return (
    <section className="rdu-grid-main" id="pokemon-species-edit">
      <hgroup>
        <h2>{isCreateMode ? 'Crea Pokémon Species' : 'Modifica Pokémon Species'}</h2>
        <p>
          {isCreateMode
            ? <>Esempio di creazione di una specie tramite <strong>form</strong>. La chiamata al servizio è uno stub.</>
            : <>Esempio di modifica di una specie tramite <strong>form</strong>. La chiamata al servizio è uno stub.</>}
        </p>
      </hgroup>

      <form onSubmit={onSubmit}>
        <RDU_InputText
          name="name"
          feature={FEATURE}
          id="species-name"
          maxLength={100}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
          schema={PokemonSpeciesSchema}
        />

        <RDU_InputNumber
          name="capture_rate"
          feature={FEATURE}
          id="species-capture-rate"
          min={0}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
        />

        <RDU_InputNumber
          name="base_happiness"
          feature={FEATURE}
          id="species-base-happiness"
          min={0}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={false}
          successMsg={false}
          helpMsg={false}
        />

        <RDU_InputNumber
          name="gender_rate"
          feature={FEATURE}
          id="species-gender-rate"
          min={-1}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
        />

        <fieldset>
          <RDU_Button type="button" variant="light" text="cancel" disabled={formState.isSubmitting} onClick={() => navigate('/crud/pokemon-species')} />
          <RDU_Button type="submit" variant="primary" text={isCreateMode ? 'create' : 'save'} disabled={formState.isSubmitting} />
        </fieldset>
      </form>
    </section>
  )
}
