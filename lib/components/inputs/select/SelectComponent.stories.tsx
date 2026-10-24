import type { Meta, StoryObj } from '@storybook/react';
import { RDU_Select } from './Select.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_Select> = {
    title: 'Components/Select',
    component: RDU_Select,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_Select>;

export const Select: Story = {
    render: () => {
        const SignUpSchema = z.object({
            select: z.string().nonempty({message: 'required'})
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

        const options = [
            'Opzione 1', 'Opzione 2', 'Opzione 3'
        ]

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_Select
                    name={'select'}
                    feature={'select'}
                    id={'select'}
                    options={options}
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
