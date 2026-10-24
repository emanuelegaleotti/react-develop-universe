import * as z from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import './input-file.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {RDU_Button} from "../../../../lib/components/buttons/button/Button.tsx";
import {RDU_InputFile} from "../../../../lib/main.ts";
import { DeleteIcon} from "../../../shared/icons.tsx";

export function InputFile() {
    const FileForm = z.object({
        file: z.instanceof(FileList).refine((v) => v.length > 0, "required")
    });

    const {
        setValue,
        trigger,
        handleSubmit, formState
    } = useForm<FormControl>({
        resolver: zodResolver(FileForm),
        mode: 'onChange'
    });

    const {
        setValue: setValueMultiple,
        trigger: triggerMultiple,
        handleSubmit: handleSubmitMultiple,
        formState: formStateMultiple
    } = useForm<FormControl>({
        resolver: zodResolver(FileForm),
        mode: 'onChange'
    });

    type FormControl = z.infer<typeof FileForm>;

    const onSubmit: SubmitHandler<FormControl> = (data: FormControl) => {
        console.log(data);
    }


    return (
        <>
            <section className={'ks-grid-main'} id={'ks-input-file'}>
                <h2>Input File</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <RDU_InputFile
                        id={'test'}
                        name={'file'}
                        feature={'ks'}
                        autoComplete={'none'}
                        disabled={false}
                        accept={''}
                        formState={formState}
                        successMsg={true}
                        helpMsg={true}
                        errorMsg={true}
                        setValue={setValue}
                        trigger={trigger}
                        multiple={false}
                        schema={FileForm}
                        deleteIcon={DeleteIcon()}
                    />
                    <RDU_Button type={'submit'} variant={'primary'} text={'submit'}/>
                </form>
            </section>
            <section className={'ks-grid-main'} id={'ks-input-file'}>
                <h2>Input File (multiple)</h2>
                <form onSubmit={handleSubmitMultiple(onSubmit)}>
                    <RDU_InputFile
                        id={'test'}
                        name={'file'}
                        feature={'ks'}
                        autoComplete={'none'}
                        disabled={false}
                        accept={''}
                        formState={formStateMultiple}
                        successMsg={true}
                        helpMsg={true}
                        errorMsg={true}
                        setValue={setValueMultiple}
                        trigger={triggerMultiple}
                        multiple={true}
                        schema={FileForm}
                        deleteIcon={DeleteIcon()}
                    />
                    <RDU_Button type={'submit'} variant={'primary'} text={'submit'}/>
                </form>
            </section>
        </>

    );


}