import './select.scss'
import {InputHTMLAttributes} from 'react'
import {FormState, UseFormRegister} from 'react-hook-form'
import {useTranslation} from "react-i18next";

interface RduSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    feature: string;
    id: string;
    options: string[];
    autoFocus?: boolean;
    autoComplete: 'none' | 'inline' | 'list' | 'both' | undefined;
    onInput?: () => void;
    disabled?: boolean;
    register: UseFormRegister<any>;
    formState: FormState<any>
    successMsg?: boolean;
    errorMsg?: boolean;
    helpMsg?: boolean;
    schema: any;
}

export function RDU_Select({
                              name,
                              feature,
                              id,
                              options,
                              autoFocus,
                              autoComplete,
                              onInput,
                              disabled,
                              register,
                              formState,
                              successMsg,
                              errorMsg,
                              helpMsg,
                              schema,
                          }: RduSelectProps) {
    const { t } = useTranslation()

    return (
        <fieldset className={'rdu-select'}>
            <label htmlFor={id}>
                { t(`${feature}.${name}.label`) }
                {!schema.shape[name]?.isOptional() && '*'}
            </label>
            <select
                minLength={0}
                className={`
          ${errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : ''}
          ${successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : ''}
          ${helpMsg && 'rdu-show-help'}`}
                id={id}
                autoFocus={autoFocus}
                autoComplete={autoComplete ?? 'none'}
                aria-autocomplete={autoComplete ?? 'none'}
                aria-disabled={disabled}
                onInput={onInput}
                disabled={disabled}
                required={!schema.shape[name]?.isOptional()}
                {...register(name)}
            >
                <option value=""></option>
                {options.map(opt => (
                    <option key={opt} value={opt}> {opt} </option>
                ))}
            </select>

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
