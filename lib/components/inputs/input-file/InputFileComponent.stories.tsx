import type {Meta, StoryObj} from '@storybook/react';
import {RDU_InputFile} from './InputFile.tsx';
import * as z from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {RDU_Button} from '../../buttons/button/Button.tsx';

const meta: Meta<typeof RDU_InputFile> = {
    title: 'Components/InputFile',
    component: RDU_InputFile,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RDU_InputFile>;

export const InputFile: Story = {
    render: () => {

        const SignUpSchema = z.object({
            file: z.instanceof(FileList).refine((v) => v.length > 0, "required")
        });
        type SignUpSchemaType = z.infer<typeof SignUpSchema>;

        const {
            setValue,
            trigger,
            handleSubmit, formState
        } = useForm<SignUpSchemaType>({
            resolver: zodResolver(SignUpSchema)
        });

        const onSubmit: SubmitHandler<SignUpSchemaType> = (data: any) =>
            console.log(data);


        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputFile
                    id={'file'}
                    name={'file'}
                    feature={'file'}
                    autoComplete={'none'}
                    disabled={false}
                    accept={''}
                    formState={formState}
                    successMsg={true}
                    helpMsg={true}
                    errorMsg={true}
                    setValue={setValue}
                    trigger={trigger}
                    multiple={true}
                    schema={SignUpSchema}
                />
                <RDU_Button type={'submit'} variant={'primary'} text={'Submit'}/>
            </form>
        );
    },
};
