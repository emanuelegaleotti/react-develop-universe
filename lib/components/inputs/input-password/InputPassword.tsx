import './input-password.scss'
import {InputHTMLAttributes} from 'react'
import {FormState, UseFormRegister} from 'react-hook-form'
import {useTranslation} from "react-i18next";

interface RduInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    feature: string;
    id: string;
    maxLength: number;
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

export function RDU_InputPassword({
    name,
    feature,
    id,
    maxLength,
    autoFocus,
    autoComplete,
    onInput,
    disabled,
    register,
    formState,
    successMsg,
    errorMsg,
    helpMsg,
    schema
}: RduInputPasswordProps) {
    const { t } = useTranslation()

    return (
        <fieldset className={'rdu-input-password'}>
            <label htmlFor={id}>
                { t(`${feature}.${name}.label`) }
                {!schema.shape[name]?.isOptional() && '*'}
            </label>
            <input
                type={'password'}
                id={id}
                className={`
          ${errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : ''}
          ${successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : ''}
          ${helpMsg && 'rdu-show-help'}`}
                placeholder={ t(`${feature}.${name}.placeHolder`) }
                minLength={0}
                maxLength={maxLength ?? 0}
                autoFocus={autoFocus}
                autoComplete={autoComplete ?? 'none'}
                aria-placeholder={ t(`${feature}.${name}.placeHolder`) }
                aria-disabled={disabled}
                aria-autocomplete={autoComplete ?? 'none'}
                onInput={onInput}
                disabled={disabled}
                {...register(name)}
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

