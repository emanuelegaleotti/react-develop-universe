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

const SpeciesSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  capture_rate: z.number({ message: 'required' }).min(0, { message: 'min' }),
  base_happiness: z.number({ message: 'required' }).min(0, { message: 'min' }),
  gender_rate: z.number({ message: 'required' }).min(-1, { message: 'min' }),
})

type SpeciesFormData = z.infer<typeof SpeciesSchema>

export function PokemonSpeciesEdit() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const isCreateMode = name === 'create'

  const { register, handleSubmit, reset, formState } = useForm<SpeciesFormData>({
    resolver: zodResolver(SpeciesSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (isCreateMode || !name) return
    let active = true
    pokemonSpeciesService.getByName(name).then(species => {
      if (!active) return
      reset({
        name: species.name,
        capture_rate: species.capture_rate,
        base_happiness: species.base_happiness ?? 0,
        gender_rate: species.gender_rate,
      })
    })
    return () => { active = false }
  }, [isCreateMode, name, reset])

  const onSubmit = handleSubmit(async data => {
    if (isCreateMode) {
      await pokemonSpeciesService.create(data)
    } else {
      await pokemonSpeciesService.update(data)
    }
    navigate('/crud/pokemon-species')
  })

  return (
    <section id="ks-species-edit">
      <h2>{isCreateMode ? 'Crea specie' : 'Modifica specie'}</h2>
      <p>
        {isCreateMode ? 'Creazione' : 'Modifica'} di un&apos;entità tramite <strong>react-hook-form</strong> e <strong>zod</strong>.
        La chiamata al servizio è uno stub: i dati non vengono salvati.
      </p>

      <form className="ks-crud-form" onSubmit={onSubmit}>
        <h3>Dati della specie</h3>
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
            schema={SpeciesSchema}
          />
          <RDU_InputNumber
            name="capture_rate"
            feature={FEATURE}
            id="capture_rate"
            min={0}
            autoComplete="none"
            disabled={formState.isSubmitting}
            register={register}
            formState={formState}
            errorMsg={true}
            successMsg={false}
            helpMsg={false}
          />
          <RDU_InputNumber
            name="base_happiness"
            feature={FEATURE}
            id="base_happiness"
            min={0}
            autoComplete="none"
            disabled={formState.isSubmitting}
            register={register}
            formState={formState}
            errorMsg={true}
            successMsg={false}
            helpMsg={false}
          />
          <RDU_InputNumber
            name="gender_rate"
            feature={FEATURE}
            id="gender_rate"
            min={-1}
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
          <RDU_Button type="button" variant="secondary" text="cancel" onClick={() => navigate('/crud/pokemon-species')} />
          <RDU_Button type="submit" variant="primary" text={isCreateMode ? 'create' : 'save'} disabled={!formState.isValid || formState.isSubmitting} />
        </div>
      </form>
    </section>
  )
}
