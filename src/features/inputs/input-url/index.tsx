import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-url.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputUrl} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputUrl() {
    const UrlForm = z.object({
        url: z.url({message: 'required'}).max(30, {message: 'maxLength'}),
    })

    type FormControl = z.infer<typeof UrlForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(UrlForm),
        mode: 'onChange',
        defaultValues: {
            url: 'http://prova.com'
        }
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-url'}>
            <h2>Input Url</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputUrl name={'url'} feature={'ks'} id={'test'} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={UrlForm}></RDU_InputUrl>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}