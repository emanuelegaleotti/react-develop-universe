import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-week.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_InputWeek} from '../../../../lib/main.ts';
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";

export function InputWeek() {
    const WeekForm = z.object({
        week: z.string().nonempty({ message: "required"}),
    })

    type FormControl = z.infer<typeof WeekForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(WeekForm),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-week'}>
            <h2>Input Week</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputWeek name={'week'} feature={'ks'} id={'test'} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={WeekForm}></RDU_InputWeek>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );


}