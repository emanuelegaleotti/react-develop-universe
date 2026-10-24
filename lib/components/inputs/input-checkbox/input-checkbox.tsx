import React from 'react'
import './input-checkbox.scss'
import { FormState, UseFormRegister } from 'react-hook-form'
import {useTranslation} from "react-i18next";

interface RduInputCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  autoComplete?: 'none' | 'inline' | 'list' | 'both' | undefined;
  disabled: boolean;
  feature: string;
  register: UseFormRegister<any>;
  formState: FormState<any>
  successMsg?: boolean;
  errorMsg?: boolean;
  helpMsg?: boolean;
  schema: any;
  labelIsVisible?: boolean;
}

export function RDU_InputCheckbox ({
  id,
  name,
  autoComplete,
  disabled,
  feature,
  register,
  errorMsg,
  successMsg,
  helpMsg,
  formState,
  schema,
  labelIsVisible = true,
}: RduInputCheckboxProps) {
  const { t } = useTranslation()

  return (
    <fieldset className={'rdu-input-checkbox'}>
      <input
        type={'checkbox'}
        id={id}
        className={`
          ${errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : ''}
          ${successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : ''}
          ${helpMsg && 'rdu-show-help'}`}
        autoComplete={autoComplete ?? 'none'}
        aria-disabled={disabled}
        aria-autocomplete={autoComplete ?? 'none'}
        disabled={disabled}
        {...register(name)}
      />
      <label htmlFor={id} className={'rdu-visible-checkbox'}></label>
      { labelIsVisible && <label htmlFor={id} className={'rdu-checkbox-label'}>
        {t(`${feature}.${name}.label`)}
        {!schema.shape[name]?.isOptional() && '*'}
      </label> }
      {
        helpMsg && <div className={'rdu-help-feedback'}>
          {t(`${feature}.${name}.help`)}
        </div>
      }
      {
        errorMsg && <div className={'rdu-invalid-feedback'}>
          {t(`${feature}.${name}.${formState.errors?.[name]?.message}`)}
        </div>
      }
      {
        successMsg && <div className={'rdu-valid-feedback'}>
          {t(`${feature}.${name}.success`)}
        </div>
      }
    </fieldset>
  )
}
