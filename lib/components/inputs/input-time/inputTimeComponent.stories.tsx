import { RDU_InputTime } from './InputTime.tsx'
import { useForm } from 'react-hook-form'

export default {
  title: 'Components/Inputs/InputTime',
  component: RDU_InputTime,
}

export const Default = () => {
  const { register, formState } = useForm({
    mode: 'onChange',
    defaultValues: { time: '' }
  })

  // Mock schema per esempio
  const schema = {
    shape: {
      time: { isOptional: () => false }
    }
  }

  return (
    <RDU_InputTime
      name="time"
      feature="timeFeature"
      id="time"
      autoFocus={false}
      autoComplete="none"
      register={register}
      formState={formState}
      schema={schema}
      successMsg={true}
      errorMsg={true}
      helpMsg={true}
    />
  )
}
