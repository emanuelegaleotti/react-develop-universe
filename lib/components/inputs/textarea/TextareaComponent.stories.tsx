import type { Meta, StoryObj } from '@storybook/react';
import { RDU_Textarea } from './Textarea.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_Textarea> = {
    title: 'Components/Textarea',
    component: RDU_Textarea,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_Textarea>;

export const Textarea: Story = {
    render: () => {
        const SignUpSchema = z.object({
            textarea: z.string().nonempty({message: 'required'}).max(256, {message: 'maxLength'}),
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
                <RDU_Textarea
                    name={'textarea'}
                    feature={'textarea'}
                    id={'textarea'}
                    maxLength={256}
                    cols={10}
                    rows={10}
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
