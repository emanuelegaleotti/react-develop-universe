import type { Meta, StoryObj } from '@storybook/react';
import { RDU_InputText } from './InputText.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_InputText> = {
  title: 'Components/InputText',
  component: RDU_InputText,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputText>;

export const InputText: Story = {
  render: () => {
    const SignUpSchema = z.object({
      username: z.string().startsWith('a').min(2).max(5),
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
        <RDU_InputText
          name={'username'}
          feature={'username'}
          id={'username'}
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
