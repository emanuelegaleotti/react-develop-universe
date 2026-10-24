import type { Meta, StoryObj } from '@storybook/react';
import { RDU_InputCheckbox } from './input-checkbox.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_InputCheckbox> = {
  title: 'Components/CheckBox',
  component: RDU_InputCheckbox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RDU_InputCheckbox>;

export const CheckBox: Story = {
  render: () => {
    const SignUpSchema = z.object({
      checkbox: z.string(),
    });

    type SignUpSchemaType = z.infer<typeof SignUpSchema>;

    const {
      register,
      handleSubmit,
      formState,
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data: any) =>
      console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <RDU_InputCheckbox
          id={'checkbox'}
          name={'checkbox'}
          label={'CheckBox Label'}
          autoComplete={'none'}
          disabled={false}
          feature={'checkbox'}
          register={register}
          labelIsVisible={true}
          formState={formState}
          schema={SignUpSchema}/>
        <RDU_Button type={'submit'} variant={'primary'} text={'Submit'} />
      </form>
    );
  },
};
