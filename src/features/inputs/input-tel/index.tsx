import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-tel.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputTel } from '../../../../lib/main.ts'


export function InputTel () {
    const TelForm = z.object({
        tel: z.string().nonempty({message: 'required'}).min(10, {message: 'minLength'}),
    })

    type FormControl = z.infer<typeof TelForm>;

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormControl>({
        resolver: zodResolver(TelForm),
        mode: 'onChange',
        defaultValues: {
            tel: '1234567890'
        }
    })

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
        console.log(data)

    return (
        <section className="ks-grid-main" id={'ks-input-tel'}>
            <h2>Input Tel</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputTel name={'tel'}
                              feature={'ks'}
                              id={'test'}
                              maxLength={30}
                              autoComplete={'none'}
                              disabled={false}
                              errorMsg={true}
                              successMsg={true}
                              helpMsg={true}
                              register={register}
                              formState={formState}
                              schema={TelForm}
                ></RDU_InputTel>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}