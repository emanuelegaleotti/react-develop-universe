import {RDU_InputMonth} from "./InputMonth.tsx";
import {Meta, StoryObj} from "@storybook/react";
import * as z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../buttons/button/Button.tsx";

const meta: Meta<typeof RDU_InputMonth> = {
    title: 'Components/InputMonth',
    component: RDU_InputMonth,
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RDU_InputMonth>;

export const InputMonth: Story = {
    render: () => {
        const SignUpSchema = z.object({
            month: z.string().nonempty({ message: "required"}),
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
                <RDU_InputMonth
                    name={'month'}
                    feature={'month'}
                    id={'month'}
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
