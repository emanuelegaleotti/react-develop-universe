import './chat-message-ai.scss'
import 'katex/dist/katex-swap.min.css'

import { ReactNode, useEffect, useState } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { VFile } from 'vfile'
import {MessageView} from '../models/message-view.ts'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import {useTranslation} from "react-i18next";

export function RDU_ChatMessageAI ({
  message,
  likeIcon,
  dislikeIcon,
  actionIcon,
  whenLike,
  whenDislike,
  whenAction
}: {
  message: MessageView,
  likeIcon: ReactNode,
  dislikeIcon: ReactNode,
  actionIcon: ReactNode,
  whenLike: (id: string) => void,
  whenDislike: (id: string) => void,
  whenAction: (id: string) => void,
}) {
  const { t } = useTranslation()

  const [_message, set_message] = useState<string>('')
  useEffect(() => {
    if (message) {
      remark()
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(message.content).then((m: VFile) => {
        set_message(m.value as string)
      })
    }
  }, [message])
  return (
    <div className={`rdu-chat-message-ai ${message.source === 'USER' ? 'right' : 'left'}`}>
      <div dangerouslySetInnerHTML={{ __html: _message }}></div>
      {message.source !== 'USER' && message.messageId &&
        <menu className="rdu-chat-message-ai-menu">
          <button type="button"
                  onClick={() => {whenLike(message.messageId)}}
                  className={`rdu-chat-message-ai-button ${message.reaction === 'like' ? 'rdu-active' : ''}`}
                  title={t('rdu.chat-message-ai.like')}>
            {likeIcon}
          </button>
          <button type="button"
                  onClick={() => {whenDislike(message.messageId)}}
                  className={`rdu-chat-message-ai-button ${message.reaction === 'dislike' ? 'rdu-active' : ''}`}
                  title={t('rdu.chat-message-ai.dislike')}>
            {dislikeIcon}
          </button>
          <button type="button"
                  onClick={() => {whenAction(message.messageId)}}
                  className={'rdu-chat-message-ai-button'}
                  title={t('rdu.chat-message-ai.action')}>
            {actionIcon}
          </button>
        </menu>
      }
    </div>
  )
}
