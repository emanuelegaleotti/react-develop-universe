import {RDU_InputHidden} from "./InputHidden.tsx";
import {Meta, StoryObj} from "@storybook/react";
import * as z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../buttons/button/Button.tsx";

const meta: Meta<typeof RDU_InputHidden> = {
    title: 'Components/InputHidden',
    component: RDU_InputHidden,
    tags: ['autodocs'],
    argTypes: {}
}

export default meta;

type Story = StoryObj<typeof RDU_InputHidden>;

export const InputHidden: Story = {
    render: () => {
        const SignUpSchema = z.object({
            hidden: z.string(),
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
                <RDU_InputHidden
                    name={'hidden'}
                    feature={'hidden'}
                    id={'hidden'}
                    maxLength={30}
                    autoComplete={'none'}
                    aria-hidden={true}
                    disabled={false}
                    register={register}
                    formState={formState}
                    schema={SignUpSchema} />
                <RDU_Button type={"submit"} variant={"primary"} text={"Submit"}/>
            </form>
        )

    }
}
