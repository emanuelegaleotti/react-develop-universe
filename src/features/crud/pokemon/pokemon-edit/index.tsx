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
    if (isCreateMode || !name) return
    let active = true
    pokemonService.getByName(name).then(pokemon => {
      if (!active) return
      reset({
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        base_experience: pokemon.base_experience,
      })
    })
    return () => { active = false }
  }, [isCreateMode, name, reset])

  const onSubmit = handleSubmit(async data => {
    if (isCreateMode) {
      await pokemonService.create(data)
    } else {
      await pokemonService.update(data)
    }
    navigate('/crud/pokemon')
  })

  return (
    <section id="ks-pokemon-edit">
      <h2>{isCreateMode ? 'Crea Pokémon' : 'Modifica Pokémon'}</h2>
      <p>
        {isCreateMode ? 'Creazione' : 'Modifica'} di un&apos;entità tramite <strong>react-hook-form</strong> e <strong>zod</strong>.
        La chiamata al servizio è uno stub: i dati non vengono salvati.
      </p>

      <form className="ks-crud-form" onSubmit={onSubmit}>
        <h3>Dati del Pokémon</h3>
        <div className="ks-crud-fields">
          <RDU_InputText
            name="name"
            feature={FEATURE}
            id="name"
            maxLength={100}
            autoComplete="none"
            disabled={formState.isSubmitting}
            register={register}
            formState={formState}
            errorMsg={true}
            successMsg={false}
            helpMsg={false}
            schema={PokemonSchema}
          />
          <RDU_InputNumber
            name="height"
            feature={FEATURE}
            id="height"
            min={1}
            autoComplete="none"
            disabled={formState.isSubmitting}
            register={register}
            formState={formState}
            errorMsg={true}
            successMsg={false}
            helpMsg={false}
          />
          <RDU_InputNumber
            name="weight"
            feature={FEATURE}
            id="weight"
            min={1}
            autoComplete="none"
            disabled={formState.isSubmitting}
            register={register}
            formState={formState}
            errorMsg={true}
            successMsg={false}
            helpMsg={false}
          />
          <RDU_InputNumber
            name="base_experience"
            feature={FEATURE}
            id="base_experience"
            min={0}
            autoComplete="none"
            disabled={formState.isSubmitting}
            register={register}
            formState={formState}
            errorMsg={true}
            successMsg={false}
            helpMsg={false}
          />
        </div>
        <div className="ks-crud-form-actions">
          <RDU_Button type="button" variant="secondary" text="cancel" onClick={() => navigate('/crud/pokemon')} />
          <RDU_Button type="submit" variant="primary" text={isCreateMode ? 'create' : 'save'} disabled={!formState.isValid || formState.isSubmitting} />
        </div>
      </form>
    </section>
  )
}
