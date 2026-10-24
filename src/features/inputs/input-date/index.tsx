import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-date.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputDate} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputDate() {
    const DateForm = z.object({
        date: z.string().nonempty({ message: "required"}),
    })

    type FormControl = z.infer<typeof DateForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(DateForm),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-date'}>
            <h2>Input Date</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputDate name={'date'} feature={'ks'} id={'test'} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={DateForm}></RDU_InputDate>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}