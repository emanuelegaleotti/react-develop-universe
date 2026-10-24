import type { Meta, StoryObj } from '@storybook/react';
import { RDU_InputSearch } from './InputSearch.tsx';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RDU_Button } from '../../../main';

const meta: Meta<typeof RDU_InputSearch> = {
  title: 'Components/InputSearch',
  component: RDU_InputSearch,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputSearch>;

export const InputSearch: Story = {
  render: () => {
    const SearchSchema = z.object({
      query: z.string().nonempty({message: 'required'}),
    });

    type SearchSchemaType = z.infer<typeof SearchSchema>;

    const {
      register,
      handleSubmit,
      formState
    } = useForm<SearchSchemaType>({
      resolver: zodResolver(SearchSchema),
    });

    const onSubmit: SubmitHandler<SearchSchemaType> = (data: any) =>
      console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <RDU_InputSearch
          name={'query'}
          feature={'search'}
          id={'query'}
          maxLength={100}
          autoComplete={'none'}
          disabled={false}
          register={register}
          formState={formState}
          schema={SearchSchema}
        />
        <RDU_Button type={'submit'} variant={'primary'} text={'Search'} />
      </form>
    );
  },
};


