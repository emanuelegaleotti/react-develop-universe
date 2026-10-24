import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-hidden.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputHidden} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputHidden() {
    const HiddenForm = z.object({
        hidden: z.string(),
    })

    type FormControl = z.infer<typeof HiddenForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(HiddenForm),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-hidden'}>
            <h2>Input Hidden</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputHidden name={'hidden'} feature={'ks'} id={'test'} maxLength={30} autoComplete={'none'} aria-hidden={true}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={HiddenForm}></RDU_InputHidden>
                <RDU_Button type={'submit'} text={'submit'} disabled={true}/>
            </form>
        </section>
    );


}