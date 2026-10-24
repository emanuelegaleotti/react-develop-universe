import './input-week.scss'
import {InputHTMLAttributes} from "react";
import {FormState, UseFormRegister} from "react-hook-form";
import {useTranslation} from "react-i18next";

interface RduInputWeekProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    feature: string;
    id: string;
    autoFocus?: boolean;
    min?: string;
    max?: string;
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

export function RDU_InputWeek({
                                  name,
                                  feature,
                                  id,
                                  autoFocus,
                                  min,
                                  max,
                                  autoComplete,
                                  onInput,
                                  disabled,
                                  register,
                                  formState,
                                  successMsg,
                                  errorMsg,
                                  helpMsg,
                                  schema
                              }: RduInputWeekProps) {
    const { t } = useTranslation()

    return (
        <fieldset className={'rdu-input-week'}>
            <label htmlFor={id}>
                { t(`${feature}.${name}.label`) }
                {!schema.shape[name]?.isOptional() && '*'}
            </label>
            <input
                type={'week'}
                className={`
              ${errorMsg && formState.errors?.[name] && formState.dirtyFields[name] ? 'rdu-is-invalid' : ''}
              ${successMsg && !formState.errors[name] && formState.dirtyFields[name] ? 'rdu-is-valid' : ''}
              ${helpMsg && 'rdu-show-help'}
              `}
                id={id}
                autoComplete={autoComplete ?? 'none'}
                autoFocus={autoFocus}
                min={min}
                max={max}
                aria-autocomplete={autoComplete ?? 'none'}
                aria-disabled={disabled}
                onInput={onInput}
                disabled={disabled}
                required={!schema.shape[name]?.isOptional()}
                placeholder={ t(`${feature}.${name}.placeholder`) }
                aria-placeholder={ t(`${feature}.${name}.placeholder`) }
                {...register(name)}
            />

            {helpMsg && <div className={'rdu-help-feedback'}>
                { t(`${feature}.${name}.help`) }
            </div>}

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