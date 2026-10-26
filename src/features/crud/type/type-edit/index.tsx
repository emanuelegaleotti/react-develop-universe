import './type-edit.scss'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputText } from '../../../../../lib/components/inputs/input-text/InputText.tsx'
import { useAppDispatch } from '../../../../app/hooks.ts'
import { createType, updateType } from '../type-slice.ts'
import { typeService } from '../type.service'

const FEATURE = 'crud.type'

const TypeSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
})

type TypeFormData = z.infer<typeof TypeSchema>

export function TypeEdit() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isCreateMode = name === 'create'

  const { register, handleSubmit, reset, formState } = useForm<TypeFormData>({
    resolver: zodResolver(TypeSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (isCreateMode || !name) return
    let active = true
    typeService.getByName(name).then(type => {
      if (active) reset({ name: type.name })
    })
    return () => { active = false }
  }, [isCreateMode, name, reset])

  const onSubmit = handleSubmit(async data => {
    await dispatch(isCreateMode ? createType(data) : updateType(data))
    navigate('/crud/type')
  })

  return (
    <section id="ks-type-edit">
      <h2>{isCreateMode ? 'Crea tipo' : 'Modifica tipo'}</h2>
      <p>
        {isCreateMode ? 'Creazione' : 'Modifica'} di un&apos;entità tramite <strong>react-hook-form</strong> e <strong>zod</strong>.
        La chiamata al servizio è uno stub: i dati non vengono salvati.
      </p>

      <form className="ks-crud-form" onSubmit={onSubmit}>
        <h3>Dati del tipo</h3>
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
            schema={TypeSchema}
          />
        </div>
        <div className="ks-crud-form-actions">
          <RDU_Button type="button" variant="secondary" text="cancel" onClick={() => navigate('/crud/type')} />
          <RDU_Button type="submit" variant="primary" text={isCreateMode ? 'create' : 'save'} disabled={!formState.isValid || formState.isSubmitting} />
        </div>
      </form>
    </section>
  )
}
