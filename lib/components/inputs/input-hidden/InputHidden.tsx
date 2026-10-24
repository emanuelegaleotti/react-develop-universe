import './input-hidden.scss'
import {InputHTMLAttributes} from "react";
import {FormState, UseFormRegister} from "react-hook-form";
import {useTranslation} from "react-i18next";

interface RduInputHiddenProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    feature: string;
    id: string;
    maxLength: number;
    autoFocus?: boolean;
    autoComplete: 'none' | 'inline' | 'both' | undefined;
    onInput?: () => void;
    disabled?: boolean;
    register: UseFormRegister<any>;
    formState: FormState<any>
    successMsg?: boolean;
    errorMsg?: boolean;
    helpMsg?: boolean;
    schema: any;
}

export function RDU_InputHidden({
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
                              }: RduInputHiddenProps) {
    const { t } = useTranslation()

    return (
        <fieldset className={'rdu-input-hidden'}>
            <input
                type={'hidden'}
                minLength={0}
                className={`
              ${ errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : '' }
              ${ successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : '' }
              ${ helpMsg && 'rdu-show-help'}
              `}
                id={id}
                maxLength={maxLength ?? 0}
                autoComplete={autoComplete ?? 'none'}
                autoFocus={autoFocus}
                aria-autocomplete={autoComplete ?? 'none'}
                aria-disabled={disabled}
                onInput={onInput}
                disabled={disabled}
                required={!schema.shape[name]?.isOptional()}
                placeholder={ t(`${feature}.${name}.placeholder`) }
                aria-placeholder={ t(`${feature}.${name}.placeholder`) }
                { ...register(name)}
            />
        </fieldset>
    );
}