import {RDU_InputColor} from "./InputColor.tsx";
import {Meta, StoryObj} from "@storybook/react";
import * as z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../buttons/button/Button.tsx";

const meta: Meta<typeof RDU_InputColor> = {
    title: 'Components/InputColor',
    component: RDU_InputColor,
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RDU_InputColor>;

export const InputColor: Story = {
    render: () => {
        const SignUpSchema = z.object({
            color: z.string({message: 'required'}),
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
                <RDU_InputColor
                    name={'color'}
                    feature={'color'}
                    id={'color'}
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
