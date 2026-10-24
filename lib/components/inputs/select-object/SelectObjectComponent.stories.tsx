import type { Meta, StoryObj } from '@storybook/react';
import { RDU_SelectObject } from './SelectObject.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_SelectObject> = {
    title: 'Components/SelectObject',
    component: RDU_SelectObject,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_SelectObject>;

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
            { id: 1, value: 'Opzione 1' },
            { id: 2, value: 'Opzione 2' },
            { id: 3, value: 'Opzione 3' },
        ]

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_SelectObject
                    name={'select'}
                    feature={'select'}
                    id={'select'}
                    options={options}
                    valueKey={"id"}
                    optionKey={"value"}
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
