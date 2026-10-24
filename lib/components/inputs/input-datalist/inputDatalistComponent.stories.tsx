import { RDU_InputDatalist } from './InputDatalist.tsx'
import { useForm } from 'react-hook-form'

export default {
  title: 'Components/Inputs/InputDatalist',
  component: RDU_InputDatalist,
}

export const Default = () => {
  const { register, formState } = useForm({
    mode: 'onChange',
    defaultValues: { datalist: '' }
  })

  // Mock schema per esempio
  const schema = {
    shape: {
      datalist: { isOptional: () => false }
    }
  }

  const options = [
    { value: 'Opzione 1' },
    { value: 'Opzione 2' },
    { value: 'Opzione 3' }
  ]

  return (
    <RDU_InputDatalist
      name="datalist"
      feature="datalistFeature"
      id="datalist"
      maxLength={50}
      autoFocus={false}
      autoComplete="none"
      register={register}
      formState={formState}
      schema={schema}
      successMsg={true}
      errorMsg={true}
      helpMsg={true}
      options={options}
    />
  )
}


