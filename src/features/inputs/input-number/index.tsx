import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-number.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputNumber } from '../../../../lib/components/inputs/input-number/InputNumber.tsx'

export function InputNumber () {
  const NumberForm = z.object({
    number: z.number({ message: 'required' }).min(0, { message: 'min' })
  })

  type FormControl = z.infer<typeof NumberForm>;

  const {
    register,
    handleSubmit,
    formState
  } = useForm<FormControl>({
    resolver: zodResolver(NumberForm),
    mode: 'onChange',
    defaultValues: {
      number: 12
    }
  })

  const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
    console.log(data)

  return (
    <section className="ks-grid-main" id={'ks-input-number'}>
      <h2>Input number</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RDU_InputNumber
          name={'number'}
          feature={'ks'}
          id={'test'}
          max={256}
          autoComplete={'none'}
          disabled={false}
          register={register}
          formState={formState}
          errorMsg={true}
          successMsg={true}
          helpMsg={true}
        ></RDU_InputNumber>
        <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
      </form>
    </section>
  )
}