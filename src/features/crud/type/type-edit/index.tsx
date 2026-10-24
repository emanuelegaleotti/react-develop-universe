import './type-edit.scss'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputText } from '../../../../../lib/components/inputs/input-text/InputText.tsx'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts'
import { createType, selectSelectedType, selectType, updateType } from '../type-slice.ts'
import type { PokeTypeCreate } from '../type.model.ts'

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
  const selectedType = useAppSelector(selectSelectedType)

  const { register, handleSubmit, reset, formState } = useForm<TypeFormData>({
    resolver: zodResolver(TypeSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (!isCreateMode && name) {
      dispatch(selectType(name))
    } else {
      reset()
    }
  }, [dispatch, isCreateMode, name, reset])

  useEffect(() => {
    if (selectedType && !isCreateMode) {
      reset({ name: selectedType.name })
    }
  }, [selectedType, isCreateMode, reset])

  const onSubmit = handleSubmit(async (data: PokeTypeCreate) => {
    if (isCreateMode) {
      await dispatch(createType(data))
    } else {
      await dispatch(updateType(data))
    }
    navigate('/crud/type')
  })

  return (
    <section className="rdu-grid-main" id="type-edit">
      <hgroup>
        <h2>{isCreateMode ? 'Crea Type' : 'Modifica Type'}</h2>
        <p>
          {isCreateMode
            ? <>Esempio di creazione di un tipo tramite <strong>form</strong>. La chiamata al servizio è uno stub.</>
            : <>Esempio di modifica di un tipo tramite <strong>form</strong>. La chiamata al servizio è uno stub.</>}
        </p>
      </hgroup>

      <form onSubmit={onSubmit}>
        <RDU_InputText
          name="name"
          feature={FEATURE}
          id="type-name"
          maxLength={100}
          autoComplete="none"
          disabled={formState.isSubmitting}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={false}
          schema={TypeSchema}
        />

        <fieldset>
          <RDU_Button type="button" variant="light" text="cancel" disabled={formState.isSubmitting} onClick={() => navigate('/crud/type')} />
          <RDU_Button type="submit" variant="primary" text={isCreateMode ? 'create' : 'save'} disabled={formState.isSubmitting} />
        </fieldset>
      </form>
    </section>
  )
}
