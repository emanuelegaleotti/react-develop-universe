import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-range.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputRange} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputRange() {
    const RangeForm = z.object({
        range: z.string().nonempty({message: 'required'}),
    })

    type FormControl = z.infer<typeof RangeForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(RangeForm),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-range'}>
            <h2>Input Range</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputRange name={'range'} feature={'ks'} id={'test'} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={RangeForm}></RDU_InputRange>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}