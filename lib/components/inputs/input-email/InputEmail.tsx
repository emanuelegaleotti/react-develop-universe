import './input-email.scss'
import {InputHTMLAttributes} from "react";
import {FormState, UseFormRegister} from "react-hook-form";
import {useTranslation} from "react-i18next";

interface RduInputEmailProps extends InputHTMLAttributes<HTMLInputElement> {
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

export function RDU_InputEmail({
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
}: RduInputEmailProps) {
    const { t } = useTranslation()
    return (
      <fieldset className={'rdu-input-email'}>
          <label htmlFor={id}>
              { t(`${feature}.${name}.label`) }
              {!schema.shape[name]?.isOptional() && '*'}
          </label>
          <input
              type={'email'}
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