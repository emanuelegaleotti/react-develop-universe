import './chat-ai.scss'
import { ReactNode, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addSelectedKnowledgeBase,
  addTemporaryKb,
  clearDislike,
  clearLike,
  initKnowledgeBase,
  removeSelectedKnowledgeBase,
  removeTemporaryKb, sendMessage, sendTemporaryMessage,
  storeAction,
  storeDislike,
  storeDislikeMessage,
  storeLike,
  storeLikeMessage,
  storeMessage,
  storeTemporaryMessage
} from '../store/chat-slice.ts'

import {
  selectChatId,
  selectIsReceiving,
  selectKnowledgeBase, selectMessage, selectMessageDislike, selectMessageDislikeId, selectMessageLike,
  selectMessageLikeId, selectMessages,
  selectSelectedKnowledgeBase,
  selectTemporaryKnowledgeBase, selectTemporaryMessage
} from '../store/chat-selectors.ts'
import { MessageView } from '../models/message-view.ts'
import {useTranslation} from "react-i18next";
import {RDU_ChatDislikeFeedback} from "../chat-dislike-feedback/ChatDislikeFeedback.tsx";
import {RDU_ChatKnowledgeBase} from "../chat-knowledgebase/ChatKnowledgebase.tsx";
import {RDU_ChatForm} from "../chat-form/ChatForm.tsx";
import {RDU_ChatMessageAI} from "../chat-message-ai/ChatMessageAI.tsx";
import {RDU_ChatEmpty} from "../chat-empty/ChatEmpty.tsx";
import {RDU_ChatLikeFeedback} from "../chat-like-feedback/ChatLikeFeedback.tsx";
import {KBInformation} from "../models/knowledge-information.ts";

export function RDU_ChatAI ({ title, sendIcon, likeIcon, dislikeIcon, actionIcon, closeIcon , loaderIcon}: {
  title?: string
  sendIcon?: ReactNode,
  likeIcon?: ReactNode,
  dislikeIcon?: ReactNode,
  actionIcon?: ReactNode,
  closeIcon?: ReactNode,
  loaderIcon?: ReactNode,
}) {
  const { t } = useTranslation()

  const chatBody = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const chatId = useSelector(selectChatId)
  const messageLikeId: string | undefined = useSelector(selectMessageLikeId(chatId))
  const messageDislikeId: string | undefined = useSelector(selectMessageDislikeId(chatId))
  const messages: MessageView [] = useSelector(selectMessages(chatId))
  const messageToSend: string | undefined = useSelector(selectMessage(chatId))
  const temporaryMessageToSend: string | undefined = useSelector(selectTemporaryMessage)
  const messageLikeToSend: string | undefined = useSelector(selectMessageLike(chatId))
  const messageDislikeToSend: string | undefined = useSelector(selectMessageDislike(chatId))
  const knowledgeBase: KBInformation[] = useSelector(selectKnowledgeBase)
  const selectedKnowledgeBases: string[] = useSelector(selectSelectedKnowledgeBase(chatId))
  const temporaryKnowledgeBases: string[] = useSelector(selectTemporaryKnowledgeBase)
  const isReceiving: boolean = useSelector(selectIsReceiving)

  useEffect(() => {
    dispatch(initKnowledgeBase(null))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      chatBody.current?.scroll({ top: chatBody.current?.scrollHeight, behavior: 'smooth' })
    }, 500)
  }, [messages])

  const knowledgeBaseAdd = (kb: string) => {
    if (chatId) {
      dispatch(addSelectedKnowledgeBase({
        chatId,
        knowledgeBase: kb
      }))
    } else {
      dispatch(addTemporaryKb({ knowledgeBase: kb }))

    }
  }
  const knowledgeBaseDelete = (kb: string) => {
    if (chatId) {
      dispatch(removeSelectedKnowledgeBase({
        chatId,
        knowledgeBase: kb
      }))
    } else {
      dispatch(removeTemporaryKb({ knowledgeBase: kb }))
    }
  }
  const send = () => {
    if (chatId) {
     dispatch(sendMessage(null))
    } else {
      dispatch(sendTemporaryMessage(null))
    }
  }
  const messageChange = (m: string) => {
    if (chatId) {
      dispatch(storeMessage({ chatId, messageToSend: m }))
    } else {
      dispatch(storeTemporaryMessage({ messageToSend: m }))
    }
  }
  const eventRender = (mlid?: string, mdid?: string) => {
    if (mlid) {
      return (<RDU_ChatLikeFeedback
        closeIcon={closeIcon}
        sendIcon={sendIcon}
        messageToSend={messageLikeToSend}
        whenLike={(message: string) => {
          dispatch(storeLikeMessage({ chatId, message }))
        }}
        whenClose={() => {
          dispatch(clearLike({ chatId }))
        }}
      ></RDU_ChatLikeFeedback>)
    } else if (mdid) {
      return (<RDU_ChatDislikeFeedback
        sendIcon={sendIcon}
        closeIcon={closeIcon}
        messageToSend={messageDislikeToSend}
        whenDislike={(message) => {
          dispatch(storeDislikeMessage({ chatId, message }))
        }}
        whenClose={() => {
          dispatch(clearDislike({ chatId }))
        }}
      ></RDU_ChatDislikeFeedback>)
    } else {
      return (<>
        <RDU_ChatKnowledgeBase
          knowledgeBases={knowledgeBase}
          closeIcon={closeIcon}
          selectedKnowledgeBase={chatId ? selectedKnowledgeBases : temporaryKnowledgeBases}
          whenKnowledgeBaseAdd={knowledgeBaseAdd}
          whenKnowledgeBaseDelete={knowledgeBaseDelete}
        ></RDU_ChatKnowledgeBase>
        <RDU_ChatForm
          sendIcon={sendIcon}
          messageToSend={chatId ? messageToSend : temporaryMessageToSend}
          whenSend={send}
          whenChange={messageChange}
          disabled={chatId ? isReceiving || !selectedKnowledgeBases.length : isReceiving || !temporaryKnowledgeBases.length}
          loaderIcon={loaderIcon}
          isReceiving={isReceiving}
        ></RDU_ChatForm>
      </>)
    }
  }
  return (
    <section className="rdu-chat-ai">
      <article className="rdu-chat-ai-header">
        <h4>{title && t(title)}</h4>
      </article>
      {chatId ?
        <article className="rdu-chat-ai-body"
                 ref={chatBody}>
          {
            messages.map((m) =>
              <RDU_ChatMessageAI
                likeIcon={likeIcon}
                dislikeIcon={dislikeIcon}
                actionIcon={actionIcon}
                key={m.messageId}
                message={m}
                whenDislike={(id) => {
                  dispatch(storeDislike({ chatId, id }))
                }}
                whenLike={(id) => {
                  dispatch(storeLike({ chatId, id }))
                }}
                whenAction={(id) => {
                  dispatch(storeAction({ chatId, id }))
                }}
              ></RDU_ChatMessageAI>
            )
          }
        </article> :
        <RDU_ChatEmpty></RDU_ChatEmpty>
      }
      {eventRender( messageLikeId, messageDislikeId)}
      <article className="rdu-chat-ai-footer">
        <p>{t('rdu.chat.ai.msg')}</p>
      </article>
    </section>
  )
}