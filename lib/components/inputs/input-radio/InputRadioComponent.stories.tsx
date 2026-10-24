import type {Meta, StoryObj} from '@storybook/react';
import {RDU_InputRadio} from './input-radio.tsx';
import * as z from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {RDU_Button} from '../../buttons/button/Button.tsx';

const meta: Meta<typeof RDU_InputRadio> = {
    title: 'Components/InputRadio',
    component: RDU_InputRadio,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputRadio>;

export const InputRadio: Story = {
    render: () => {
        const SignUpSchema = z.object({
            radio: z.boolean(),
        });

        type SignUpSchemaType = z.infer<typeof SignUpSchema>;

        const {
            register,
            handleSubmit,
            formState,
        } = useForm<SignUpSchemaType>({resolver: zodResolver(SignUpSchema)});

        const onSubmit: SubmitHandler<SignUpSchemaType> = (data: any) =>
            console.log(data);

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputRadio
                    id={'radio'}
                    name={'radio'}
                    feature={'radio'}
                    labelIsVisible={true}
                    disabled={false}
                    autoComplete={'radio'}
                    register={register}
                    formState={formState}
                    errorMsg={true}
                    successMsg={true}
                    helpMsg={true}
                    schema={SignUpSchema}
                />
                <RDU_Button type={'submit'} variant={'primary'} text={'Submit'}/>
            </form>
        );
    },
};
