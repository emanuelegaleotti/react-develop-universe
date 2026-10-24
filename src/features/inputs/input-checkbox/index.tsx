import { RDU_InputCheckbox } from '../../../../lib/components/inputs/input-checkbox/input-checkbox.tsx'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import './input-checkbox.scss'

export function InputCheckbox () {
  const CheckboxForm = z.object({
    checkbox: z.boolean(),
  })

  type FormControl = z.infer<typeof CheckboxForm>;

  const {
    register,
    handleSubmit,
    formState
  } = useForm<FormControl>({
    resolver: zodResolver(CheckboxForm),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
    console.log(data)

  return (
    <section className="ks-grid-main" id={'ks-input-checkbox'}>
      <h2>Input checkbox</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RDU_InputCheckbox id={'test'}
                          name={'checkbox'}
                          label={'checkbox'}
                          disabled={false}
                          feature={'ks'}
                          register={register}
                          errorMsg={true}
                          successMsg={true}
                          helpMsg={true}
                          formState={formState}
                          schema={CheckboxForm}
        ></RDU_InputCheckbox>
        <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
      </form>
    </section>
  )
}