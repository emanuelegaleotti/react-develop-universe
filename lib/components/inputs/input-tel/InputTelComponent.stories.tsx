import type { Meta, StoryObj } from '@storybook/react';
import { RDU_InputTel } from './InputTel.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_InputTel> = {
    title: 'Components/InputTel',
    component: RDU_InputTel,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputTel>;

export const InputTel: Story = {
    render: () => {
        const SignUpSchema = z.object({
            tel: z.string().nonempty({message: 'required'}).min(10, {message: 'minLength'}),
        });

        type SignUpSchemaType = z.infer<typeof SignUpSchema>;

        const {
            register,
            handleSubmit,
            formState
        } = useForm<SignUpSchemaType>({
            resolver: zodResolver(SignUpSchema),
        });

        const onSubmit: SubmitHandler<SignUpSchemaType> = (data: any) =>
            console.log(data);

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputTel
                    name={'tel'}
                    feature={'tel'}
                    id={'tel'}
                    maxLength={30}
                    autoComplete={'none'}
                    disabled={false}
                    register={register}
                    formState={formState}
                    schema={SignUpSchema}        />
                <RDU_Button type={'submit'} variant={'primary'} text={'Submit'} />
            </form>
        );
    },
};
