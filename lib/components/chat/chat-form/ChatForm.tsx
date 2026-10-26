import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import './chat-form.scss'
import {useTranslation} from "react-i18next";

const MessageForm = z.object({
  'rdu-chat-form-textarea': z.string().nonempty({ message: 'required' }).max(256, 'maxLength'),
})
type FormControl = z.infer<typeof MessageForm>

export function RDU_ChatForm ({
    whenSend,
    sendIcon,
    loaderIcon,
    disabled,
    isReceiving
  }: {
    whenSend: (message: string) => void,
    sendIcon?: ReactNode
    loaderIcon?: ReactNode,
    disabled?: boolean
    isReceiving?: boolean
  }
) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<FormControl>({
    mode: 'onChange',
    resolver: zodResolver(MessageForm),
    defaultValues: {
      'rdu-chat-form-textarea': ''
    }
  })
  const onSubmit = (data: FormControl) => {
    whenSend(data['rdu-chat-form-textarea'])
    reset()
  }

  return (<>
      <form className="rdu-chat-form"
            onSubmit={handleSubmit(onSubmit)}>
        <div>
    <textarea
      id="rdu-chat-form-textarea"
      minLength={0}
      maxLength={256}
      rows={3}
      cols={12}
      aria-label={t('rdu.chat-form.textarea.label')}
      placeholder={t('rdu.chat-form.textarea.placeholder')}
      aria-placeholder={t('rdu.chat-form.textarea.placeholder')}
      aria-autocomplete="inline"
      {...register('rdu-chat-form-textarea')}
      required={true}
    ></textarea>
          {errors && isDirty && <div className="invalid-feedback"></div>}
        </div>
        <button
          disabled={!isValid || !isDirty || disabled}
          type="submit"
          title={t('rdu.button.send')}
          id="rdu-chat-form-button">
          <span>
          {t('rdu.button.send')}
          </span>
          {isReceiving ? <span id="rdu-chat-form-spinner"
                               role="status"
                               aria-label={t('rdu.chat-form.loading')}>
          {loaderIcon}
        </span> : sendIcon
          }
        </button>
      </form>
    </>
  )
}
