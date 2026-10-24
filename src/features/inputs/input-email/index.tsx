import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-email.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputEmail} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputEmail() {
    const EmailForm = z.object({
        email: z.email({message: 'required'}).max(30, {message: 'maxLength'}),
    })

    type FormControl = z.infer<typeof EmailForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(EmailForm),
        mode: 'onChange',
        defaultValues: {
            email: 'prova@prova.com'
        }
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-email'}>
            <h2>Input Email</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputEmail name={'email'} feature={'ks'} id={'test'} maxLength={30} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={EmailForm}></RDU_InputEmail>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}