import './input-number.scss'
import { InputHTMLAttributes } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import {useTranslation} from "react-i18next";

interface RduInputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  feature: string;
  id: string;
  min?: number;
  max?: number;
  step?: number;
  autoFocus?: boolean;
  autoComplete: 'none' | 'inline' | 'list' | 'both' | undefined;
  onInput?: () => void;
  disabled?: boolean;
  register: UseFormRegister<any>;
  formState: FormState<any>
  successMsg?: boolean;
  errorMsg?: boolean;
  helpMsg?: boolean;
}

export function RDU_InputNumber ({
  name,
  feature,
  id,
  min,
  max,
  step,
  autoFocus,
  autoComplete,
  onInput,
  disabled,
  register,
  formState,
  successMsg,
  errorMsg,
  helpMsg,
}: RduInputNumberProps) {
  const { t } = useTranslation()

  return (
    <fieldset className={'rdu-input-number'}>
      <label htmlFor={id}>{ t(`${feature}.${name}.label`) }</label>
      <input
        type={'number'}
        id={id}
        className={`
          ${errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : ''}
          ${successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : ''}
          ${helpMsg && 'rdu-show-help'}`}
        placeholder={ t(`${feature}.${name}.placeHolder`) }
        min={min}
        max={max}
        step={step ?? 1}
        autoFocus={autoFocus}
        autoComplete={autoComplete ?? 'none'}
        aria-placeholder={ t(`${feature}.${name}.placeHolder`) }
        aria-disabled={disabled}
        aria-autocomplete={autoComplete ?? 'none'}
        onInput={onInput}
        disabled={disabled}
        {...register(name, { valueAsNumber: true })}
      />
      <div className={'rdu-help-feedback'}>
        { t(`${feature}.${name}.help`) }
      </div>
      <div className={'rdu-invalid-feedback'}>
        { t(`${feature}.${name}.${formState.errors?.[name]?.message}`) }
      </div>
      <div className={'rdu-valid-feedback'}>
        { t(`${feature}.${name}.success`) }
      </div>
    </fieldset>
  )
}

