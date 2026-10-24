import type { Meta, StoryObj } from '@storybook/react';
import { RDU_InputNumber } from './InputNumber.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_InputNumber> = {
  title: 'Components/InputNumber',
  component: RDU_InputNumber,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputNumber>;

export const InputNumber: Story = {
  render: () => {
    const SignUpSchema = z.object({
      age: z.number({ message: 'required' }).min(0, { message: 'min' }),
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
        <RDU_InputNumber
          name={'age'}
          feature={'age'}
          id={'age'}
          min={0}
          max={150}
          step={1}
          autoComplete={'none'}
          disabled={false}
          register={register}
          formState={formState}
        />
        <RDU_Button type={'submit'} variant={'primary'} text={'Submit'} />
      </form>
    );
  },
};
