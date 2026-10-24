import './input-radio.scss'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputRadio } from '../../../../lib/components/inputs/input-radio/input-radio.tsx'

export function InputRadio () {
  const RadioForm = z.object({
    radio: z.string(),
  })

  type FormControl = z.infer<typeof RadioForm>;

  const {
    register,
    handleSubmit,
    formState
  } = useForm<FormControl>({
    resolver: zodResolver(RadioForm),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
    console.log(data)

  return (
    <section className="ks-grid-main" id={'ks-input-radio'}>
      <h2>Input radio</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RDU_InputRadio id={'test1'}
                       name={'radio'}
                       disabled={false}
                       feature={'ks'}
                       register={register}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       value={'option1'}
                       formState={formState}
                       schema={RadioForm}
        ></RDU_InputRadio>
        <RDU_InputRadio id={'test2'}
                       name={'radio'}
                       disabled={false}
                       feature={'ks'}
                       register={register}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       value={'option2'}
                       formState={formState}
                       schema={RadioForm}
        ></RDU_InputRadio>
        <RDU_InputRadio id={'test3'}
                       name={'radio'}
                       disabled={false}
                       feature={'ks'}
                       register={register}
                       errorMsg={true}
                       successMsg={true}
                       helpMsg={true}
                       value={'option3'}
                       formState={formState}
                       schema={RadioForm}
        ></RDU_InputRadio>
        <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
      </form>
    </section>
  )
}