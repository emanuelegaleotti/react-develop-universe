import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-color.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputColor} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputColor() {
    const ColorForm = z.object({
        color: z.string({message: 'required'}),
    })

    type FormControl = z.infer<typeof ColorForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(ColorForm),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-color'}>
            <h2>Input Color</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputColor name={'color'} feature={'ks'} id={'test'} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={ColorForm}></RDU_InputColor>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}