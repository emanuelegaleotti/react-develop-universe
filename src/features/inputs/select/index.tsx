import * as z from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import './select.scss'
import {RDU_Button} from '../../../../lib/components/buttons/button/Button.tsx'
import {RDU_Select} from '../../../../lib/main.ts'


export function Select() {
    const SelectForm = z.object({
        select: z.string().nonempty({message: 'required'})
    })

    type FormControl = z.infer<typeof SelectForm>;

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormControl>({
        resolver: zodResolver(SelectForm),
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
        console.log(data)

    const options = ['blue', 'black', 'red', 'white']

    return (
        <section className="ks-grid-main" id={'ks-select'}>
            <h2>Select</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_Select name={'select'}
                           feature={'ks'}
                           id={'test'}
                           options={options}
                           autoComplete={'none'}
                           disabled={false}
                           errorMsg={true}
                           successMsg={true}
                           helpMsg={true}
                           register={register}
                           formState={formState}
                           schema={SelectForm}
                ></RDU_Select>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}