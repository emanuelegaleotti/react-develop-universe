import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './input-file.scss'

import { RDU_InputFile } from '../../../../lib/main.ts'
import { ControlState } from '../../../shared/control-state/control-state.tsx'
import { DeleteIcon } from '../../../shared/icons.tsx'

const DELETE_ICON = DeleteIcon()

const FileForm = z.object({
  file: z.custom<FileList>(value => value instanceof FileList && value.length > 0, { message: 'required' })
})

type FormControl = z.infer<typeof FileForm>

export function InputFile () {
  const [singleDisabled, setSingleDisabled] = useState(false)
  const [multipleDisabled, setMultipleDisabled] = useState(false)

  const single = useForm<FormControl>({ resolver: zodResolver(FileForm), mode: 'onChange' })
  const multiple = useForm<FormControl>({ resolver: zodResolver(FileForm), mode: 'onChange' })

  return (
    <>
      <section id="ks-input-file">
        <h2>Input file</h2>
        <p>Caricamento di un singolo file tramite pulsante o drag &amp; drop.</p>
        <form onSubmit={event => event.preventDefault()}>
          <h3>Singolo file</h3>
          <RDU_InputFile name={'file'}
                         feature={'ks'}
                         id={'file-single'}
                         multiple={false}
                         accept={''}
                         autoComplete={'none'}
                         disabled={singleDisabled}
                         errorMsg={true}
                         successMsg={true}
                         helpMsg={true}
                         setValue={single.setValue}
                         trigger={single.trigger}
                         formState={single.formState}
                         schema={FileForm}
                         deleteIcon={DELETE_ICON}
          />
        </form>
        <ControlState control={single.control} name="file" schema={FileForm} disabled={singleDisabled}
                      onToggleDisabled={() => setSingleDisabled(value => !value)} />
      </section>

      <section id="ks-input-file-multiple">
        <h2>Input file (multiple)</h2>
        <p>Con <code>multiple</code> attivo il controllo contiene l'elenco di tutti i file selezionati.</p>
        <form onSubmit={event => event.preventDefault()}>
          <h3>File multipli</h3>
          <RDU_InputFile name={'file'}
                         feature={'ks'}
                         id={'file-multiple'}
                         multiple={true}
                         accept={''}
                         autoComplete={'none'}
                         disabled={multipleDisabled}
                         errorMsg={true}
                         successMsg={true}
                         helpMsg={true}
                         setValue={multiple.setValue}
                         trigger={multiple.trigger}
                         formState={multiple.formState}
                         schema={FileForm}
                         deleteIcon={DELETE_ICON}
          />
        </form>
        <ControlState control={multiple.control} name="file" schema={FileForm} disabled={multipleDisabled}
                      onToggleDisabled={() => setMultipleDisabled(value => !value)} />
      </section>
    </>
  )
}
