import * as z from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import './input-datalist.scss'
import {RDU_Button} from '../../../../lib/components/buttons/button/Button.tsx'
import {RDU_InputDatalist} from '../../../../lib/main.ts'

export function InputDataList() {
    const DataListForm = z.object({
        datalist: z.string().nonempty({message: 'required'}),
    })

    type FormControl = z.infer<typeof DataListForm>;

    const {
        register,
        handleSubmit,
        formState
    } = useForm<FormControl>({
        resolver: zodResolver(DataListForm),
        mode: 'onChange',
    })

    const datalist: { value: string; label?: string }[] = [
        {value: 'Edge'},
        {value: 'Firefox'},
        {value:'Chrome'},
        {value: 'Opera'},
        {value: 'Safari'}
    ]

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) =>
        console.log(data.datalist)

    return (
        <section className="ks-grid-main" id={'ks-input-datalist'}>
            <h2>Input Datalist</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RDU_InputDatalist name={'datalist'}
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
                                  schema={DataListForm}
                                  options={datalist}
                ></RDU_InputDatalist>
                <RDU_Button type={'submit'} text={'submit'}></RDU_Button>
            </form>
        </section>
    )
}