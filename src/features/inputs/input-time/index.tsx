import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-time.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputTime } from '../../../../lib/main.ts'


export function InputTime () {
    const TimeForm = z.object({
        time: z.string().nonempty({message: 'required'}),
    })

    type FormControl = z.infer<typeof TimeForm>;

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormControl>({
        resolver: zodResolver(TimeForm),
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
        console.log(data)

    return (
        <section className="ks-grid-main" id={'ks-input-time'}>
            <h2>Input Time</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputTime name={'time'}
                              feature={'ks'}
                              id={'test'}
                              autoComplete={'none'}
                              disabled={false}
                              errorMsg={true}
                              successMsg={true}
                              helpMsg={true}
                              register={register}
                              formState={formState}
                              schema={TimeForm}
                ></RDU_InputTime>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}