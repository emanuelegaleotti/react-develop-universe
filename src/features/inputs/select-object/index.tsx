import * as z from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import './select-object.scss'
import {RDU_Button} from '../../../../lib/components/buttons/button/Button.tsx'
import {RDU_SelectObject} from '../../../../lib/main.ts'


export function SelectObject() {
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

    const options = [
        {id: 1, color: "blue"},
        {id: 2, color: "black"},
        {id: 3, color: "red"},
        {id: 4, color: "white"}
    ]

    return (
        <section className="ks-grid-main" id={'ks-select-object'}>
            <h2>Select Object</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_SelectObject name={'select'}
                                 feature={'ks'}
                                 id={'test'}
                                 options={options}
                                 valueKey={"id"}
                                 optionKey={"color"}
                                 autoComplete={'none'}
                                 disabled={false}
                                 errorMsg={true}
                                 successMsg={true}
                                 helpMsg={true}
                                 register={register}
                                 formState={formState}
                                 schema={SelectForm}
                ></RDU_SelectObject>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}