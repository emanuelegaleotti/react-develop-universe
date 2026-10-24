import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import './chat-form.scss'
import {useTranslation} from "react-i18next";

export  function RDU_ChatForm ({
    messageToSend,
    whenSend,
    whenChange,
    sendIcon,
    loaderIcon,
    disabled,
    isReceiving
  }: {
    messageToSend: string | undefined,
    whenSend: (message: string) => void,
    whenChange: (message: string) => void,
    sendIcon?: ReactNode
    loaderIcon?: ReactNode,
    disabled?: boolean
    isReceiving?: boolean
  }
) {
  const { t } = useTranslation()

  const MessageForm = z.object({
    'rdu-chat-form-textarea': z.string().nonempty({ message: 'required' }).max(256, 'maxLength'),
  })
  type FormControl = z.infer<typeof MessageForm>
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm<FormControl>({
    mode: 'onChange',
    resolver: zodResolver(MessageForm),
    defaultValues: {
      'rdu-chat-form-textarea': messageToSend ? messageToSend : undefined
    }
  })
  const onSubmit = (data: FormControl) => {
    whenSend(data['rdu-chat-form-textarea'])
    reset()
  }

  useEffect(() => {
    whenChange(watch('rdu-chat-form-textarea'))
  }, [watch('rdu-chat-form-textarea')])

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
      autoFocus={true}
      aria-label={t('rdu.chat-form.textarea.label')}
      aria-placeholder={t('rdu.chat-form.textarea.placeholder')}
      aria-autocomplete="inline"
      {...register('rdu-chat-form-textarea')}
      required={true}
    ></textarea>
          {errors && isDirty && <div className="invalid-feedback"></div>}
        </div>
        <button
          disabled={(!isValid && isDirty) || disabled}
          type="submit"
          title={t('button.send')}
          id="rdu-chat-form-button">
          <span>
          {t('button.send')}
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
