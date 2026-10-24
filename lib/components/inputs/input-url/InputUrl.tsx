import './input-url.scss'
import {InputHTMLAttributes} from "react";
import {FormState, UseFormRegister} from "react-hook-form";
import {useTranslation} from "react-i18next";

interface RduInputUrlProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    feature: string;
    id: string;
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

export function RDU_InputUrl({
                                  name,
                                  feature,
                                  id,
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
                              }: RduInputUrlProps) {
    const { t } = useTranslation()

    return (
        <fieldset className={'rdu-input-url'}>
            <label htmlFor={id}>
                { t(`${feature}.${name}.label`) }
                {!schema.shape[name]?.isOptional() && '*'}
            </label>
            <input
                type={'url'}
                minLength={0}
                className={`
              ${ errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : '' }
              ${ successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : '' }
              ${ helpMsg && 'rdu-show-help'}
              `}
                id={id}
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

            { helpMsg && <div className={'rdu-help-feedback'}>
                { t(`${feature}.${name}.help`) }
            </div> }

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
    );
}