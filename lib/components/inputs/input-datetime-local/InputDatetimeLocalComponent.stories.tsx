import {RDU_InputDatetimeLocal} from "./InputDatetimeLocal.tsx";
import {Meta, StoryObj} from "@storybook/react";
import * as z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../buttons/button/Button.tsx";

const meta: Meta<typeof RDU_InputDatetimeLocal> = {
    title: 'Components/InputDatetimeLocal',
    component: RDU_InputDatetimeLocal,
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RDU_InputDatetimeLocal>;

export const InputDate: Story = {
    render: () => {
        const SignUpSchema = z.object({
            datetime: z.string().nonempty({ message: "required"}),
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
                <RDU_InputDatetimeLocal
                    name={'datetime'}
                    feature={'datetime'}
                    id={'datetime'}
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
