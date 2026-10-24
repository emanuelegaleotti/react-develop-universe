import * as z from "zod";
import './input-password.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";
import {RDU_InputPassword} from "../../../../lib/components/inputs/input-password/InputPassword.tsx";

export function InputPassword() {
    const PasswordForm = z.object({
        password: z.string().nonempty({message: 'required'}).min(5, {message: 'minLength'}).max(15, {message: 'maxLength'}),
    })

    type FormControl = z.infer<typeof PasswordForm>;

    const {
        register, handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(PasswordForm),
        mode: 'onChange',
        defaultValues: {
            password: 'prova'
        }
    });

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }

    return (
        <section className={'ks-grid-main'} id={'ks-input-password'}>
            <h2>Input Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputPassword name={'password'} feature={'ks'} id={'test'} maxLength={15} autoComplete={'none'}
                               disabled={false} successMsg={true} helpMsg={true} errorMsg={true} register={register}
                               formState={formState} schema={PasswordForm}></RDU_InputPassword>
                <RDU_Button type={'submit'} text={'submit'}/>
            </form>
        </section>
    );
}