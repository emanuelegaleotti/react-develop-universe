import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-text.scss'

import {RDU_InputText} from "../../../../lib/components/inputs/input-text/InputText.tsx";
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";



export function InputText () {
  const TextForm = z.object({
    text: z.string().nonempty({message: 'required'}).max(5, {message: 'maxLength'}),
  })

  type FormControl = z.infer<typeof TextForm>;

  const {
    register,
    handleSubmit,
    formState
  } = useForm<FormControl>({
    resolver: zodResolver(TextForm),
    mode: 'onChange',
    defaultValues: {
      text: 'prova'
    }
  })

  const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
    console.log(data)

  return (
    <section className="ks-grid-main" id={'ks-input-text'}>
      <h2>Input text</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RDU_InputText name={'text'}
                      feature={'ks'}
                      id={'test'}
                      maxLength={256}
                      autoComplete={'none'}
                      disabled={false}
                      errorMsg={true}
                      successMsg={true}
                      helpMsg={true}
                      register={register}
                      formState={formState}
                      schema={TextForm}
        ></RDU_InputText>
        <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
      </form>
    </section>
  )
}