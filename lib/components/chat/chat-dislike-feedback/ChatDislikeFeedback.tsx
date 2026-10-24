import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import './chat-dislike-feedback.scss'
import {useTranslation} from "react-i18next";

export function RDU_ChatDislikeFeedback ({ whenClose, whenDislike, messageToSend, sendIcon, closeIcon }: {
    whenClose: () => void,
    whenDislike: (message: string) => void,
    messageToSend?: string
    sendIcon?: ReactNode
    closeIcon?: ReactNode
  }
) {
  const { t } = useTranslation()

  const MessageForm = z.object({
    'rdu-chat-dislike-feedback-textarea': z.string().nonempty({ message: 'required' }).max(256, { message: 'maxLength' }),
  })
  type FormControl = z.infer<typeof MessageForm>
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<FormControl>({
    mode: 'onChange',
    resolver: zodResolver(MessageForm),
    defaultValues: {
      'rdu-chat-dislike-feedback-textarea': messageToSend
    }
  })
  const onSubmit = (data: FormControl) => {
    whenDislike(data['rdu-chat-dislike-feedback-textarea'])
  }
  return (
    <form className="rdu-chat-dislike-feedback"
          onSubmit={handleSubmit(onSubmit)}>
      <div className={'rdu-alert'}>
        {t('rdu.chat-dislike-feedback.alert')}
        <button type={'button'}
                onClick={whenClose}>
          {closeIcon}
        </button>
      </div>
      <div>
        <label htmlFor={'like-feedback'}>
          {t('rdu.chat-dislike-feedback.label')}</label>
        <textarea
          id={'like-feedback'}
          aria-autocomplete="inline"
          aria-required="true"
          minLength={0}
          maxLength={256}
          rows={3}
          cols={12}
          aria-label={t('rdu.chat-dislike-feedback.textarea.label')}
          aria-placeholder={t('rdu.chat-dislike-feedback.textarea.placeholder')}
          required={true}
          {...register('rdu-chat-dislike-feedback-textarea')}
        ></textarea>
        {!isValid && isDirty && <div className="rdu-invalid-feedback"
                                     id={'dislike-feedback-error-feedback'}>
          {t('rdu.chat-dislike-feedback.' + errors['rdu-chat-dislike-feedback-textarea']?.message)}
        </div>
        }
      </div>
      <button type="submit"
              disabled={!isValid || !isDirty}
              id={'dislike-feedback-submit'}
              title={t('button.send')}>
        {sendIcon}
        {t('button.send')}
      </button>
    </form>

  )
}
