import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-datetime-local.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";
import {RDU_InputDatetimeLocal} from "../../../../lib/main.ts";

export function InputDatetimeLocal() {
    const DatetimeForm = z.object({
        datetime: z.string().nonempty({ message: "required"}),
    })

    type FormControl = z.infer<typeof DatetimeForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(DatetimeForm),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-datetime'}>
            <h2>Input Datetime</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputDatetimeLocal name={'datetime'} feature={'ks'} id={'test'} autoComplete={'none'}
                              disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                              formState={formState} schema={DatetimeForm}></RDU_InputDatetimeLocal>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}