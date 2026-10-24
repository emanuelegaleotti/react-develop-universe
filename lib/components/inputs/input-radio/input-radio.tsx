import './input-radio.scss'
import { FormState, UseFormRegister } from 'react-hook-form'
import {useTranslation} from "react-i18next";

interface RduInputRadioProps {
  id: string;
  name: string;
  feature: string;
  value?: string;
  disabled: boolean;
  autoComplete?: 'radio';
  register: UseFormRegister<any>;
  formState: FormState<any>
  successMsg?: boolean;
  errorMsg?: boolean;
  helpMsg?: boolean;
  schema: any;
  labelIsVisible?: boolean;
}

export function RDU_InputRadio ({
  id,
  name,
  feature,
  value,
  disabled,
  autoComplete,
  register,
  formState,
  errorMsg,
  successMsg,
  helpMsg,
  labelIsVisible = true,
}: RduInputRadioProps) {
  const { t } = useTranslation()

  return (
    <fieldset className={'rdu-input-radio'}>
      <input
        type={'radio'}
        id={id}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-placeholder={ t(`${feature}.${name}.placeHolder`) }
        aria-disabled={disabled}
        {...register(`${name}`)}
      />
      <label
        htmlFor={id}
        id={`${id}-visible-radio`}
        className={'rdu-visible-radio'}
      />
      {labelIsVisible && (
        <label htmlFor={id} id={`${id}-label`} className={'rdu-radio-label'}>
          { t(`${feature}.${name}.label`) }
        </label>
      )}
      {
        helpMsg && <div className={'rdu-help-feedback'}>
          { t(`${feature}.${name}.help`) }
        </div>
      }
      {
        errorMsg && <div className={'rdu-invalid-feedback'}>
          { t(`${feature}.${name}.${formState.errors?.[name]?.message}`) }
        </div>
      }
      {
        successMsg && <div className={'rdu-valid-feedback'}>
          { t(`${feature}.${name}.success`) }
        </div>
      }
    </fieldset>
  )
}
