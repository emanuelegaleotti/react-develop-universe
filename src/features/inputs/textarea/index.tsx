import * as z from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import './textarea.scss'
import {RDU_Button} from '../../../../lib/components/buttons/button/Button.tsx'
import {RDU_Textarea} from '../../../../lib/main.ts'


export function Textarea() {
    const TextareaForm = z.object({
        textarea: z.string().nonempty({message: 'required'}).max(256, {message: 'maxLength'}),
    })

    type FormControl = z.infer<typeof TextareaForm>;

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormControl>({
        resolver: zodResolver(TextareaForm),
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
        console.log(data)

    return (
        <section className="ks-grid-main" id={'ks-textarea'}>
            <h2>Textarea</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_Textarea name={'textarea'}
                             feature={'ks'}
                             id={'test'}
                             maxLength={256}
                             cols={10}
                             rows={10}
                             autoComplete={'none'}
                             disabled={false}
                             errorMsg={true}
                             successMsg={true}
                             helpMsg={true}
                             register={register}
                             formState={formState}
                             schema={TextareaForm}
                ></RDU_Textarea>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}