import type { Meta, StoryObj } from '@storybook/react';
import { RDU_InputPassword } from './InputPassword.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_InputPassword> = {
  title: 'Components/InputPassword',
  component: RDU_InputPassword,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputPassword>;

export const InputPassword: Story = {
  render: () => {
    const SignUpSchema = z.object({
      password: z.string().nonempty({message: 'required'}).min(5, {message: 'minLength'}).max(15, {message: 'maxLength'}),
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
        <RDU_InputPassword
          name={'password'}
          feature={'password'}
          id={'password'}
          maxLength={15}
          autoComplete={'none'}
          disabled={false}
          register={register}
          formState={formState}
          schema={SignUpSchema}
        />
        <RDU_Button type={'submit'} variant={'primary'} text={'Submit'} />
      </form>
    );
  },
};


