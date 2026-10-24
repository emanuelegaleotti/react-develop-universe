import {RDU_InputUrl} from "./InputUrl.tsx";
import {Meta, StoryObj} from "@storybook/react";
import * as z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../buttons/button/Button.tsx";

const meta: Meta<typeof RDU_InputUrl> = {
    title: 'Components/InputUrl',
    component: RDU_InputUrl,
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RDU_InputUrl>;

export const InputEmail: Story = {
    render: () => {
        const SignUpSchema = z.object({
            url: z.url({message: 'required'}).max(30, {message: 'maxLength'}),
        });

        type SignUpSchematype = z.infer<typeof SignUpSchema>

        const {
            register,
            handleSubmit,
            formState
        } = useForm<SignUpSchematype>({
            resolver: zodResolver(SignUpSchema),
        });

        const onSubmit: SubmitHandler<SignUpSchematype> = (data: any) => {
            console.log(data);
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputUrl
                    name={'url'}
                    feature={'url'}
                    id={'url'}
                    maxLength={30}
                    autoComplete={'none'}
                    disabled={false}
                    register={register}
                    formState={formState}
                    schema={SignUpSchema} />
                <RDU_Button type={"submit"} variant={"primary"} text={"Submit"}/>
            </form>
        )

    }
}
