import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-search.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import {RDU_InputSearch} from '../../../../lib/main.ts'


export function InputSearch () {
    const SearchForm = z.object({
        query: z.string().nonempty({message: 'required'}),
    })

    type FormControl = z.infer<typeof SearchForm>;

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormControl>({
        resolver: zodResolver(SearchForm),
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
        console.log(data)

    return (
        <section className="ks-grid-main" id={'ks-input-search'}>
            <h2>Input Search</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputSearch name={'query'}
                              feature={'ks'}
                              id={'test'}
                              maxLength={256}
                              autoComplete={'none'}
                              disabled={false}
                              errorMsg={true}
                              successMsg={true}
                              helpMsg={true}
                              register={register}
                              formState={formState}
                              schema={SearchForm}
                ></RDU_InputSearch>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}