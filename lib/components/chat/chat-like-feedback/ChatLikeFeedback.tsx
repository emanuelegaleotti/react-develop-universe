import './chat-like-feedback.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {useTranslation} from "react-i18next";

export function RDU_ChatLikeFeedback ({ whenLike, whenClose, messageToSend, sendIcon, closeIcon }: {
  whenLike: (message: string) => void,
  whenClose: () => void,
  messageToSend?: string,
  sendIcon?: ReactNode
  closeIcon?: ReactNode
}) {
  const { t } = useTranslation()

  const MessageForm = z.object({
    'rdu-chat-like-feedback-textarea': z.string().max(256),
  })
  type FormControl = z.infer<typeof MessageForm>
  const {
    register,
    handleSubmit,
    formState
  } = useForm<FormControl>({
    mode: 'onChange',
    resolver: zodResolver(MessageForm),
    defaultValues: {
      'rdu-chat-like-feedback-textarea': messageToSend
    }
  })
  const onSubmit = (data: FormControl) => {
    whenLike(data['rdu-chat-like-feedback-textarea'])
  }
  return (

    <form className="rdu-chat-like-feedback"
          onSubmit={handleSubmit(onSubmit)}>
      <div className={'rdu-alert'}>
        {t('rdu.chat-like-feedback.alert')}
        <button type={'button'}
                onClick={whenClose}>
          {closeIcon}
        </button>
      </div>
      <div>
        <label htmlFor={'like-feedback'}>
          {t('rdu.chat-like-feedback.label')}
        </label>
        <textarea id={'like-feedback'}
                  aria-autocomplete="inline"
                  aria-required="true"
                  minLength={0}
                  maxLength={256}
                  {...register('rdu-chat-like-feedback-textarea')}
        ></textarea>
      </div>
      <button type="submit"
              id={'like-feedback-submit'}
              disabled={!formState.isValid}
              title={t('button.send')}>
        {sendIcon}
        {t('button.send')}
      </button>
    </form>
  )
}