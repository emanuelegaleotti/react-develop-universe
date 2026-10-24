import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-month.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputMonth} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputMonth() {
    const MonthForm = z.object({
        month: z.string().nonempty({ message: "required"}),
    })

    type FormControl = z.infer<typeof MonthForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(MonthForm),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-month'}>
            <h2>Input Month</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputMonth name={'month'} feature={'ks'} id={'test'} autoComplete={'none'}
                              disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                              formState={formState} schema={MonthForm}></RDU_InputMonth>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}