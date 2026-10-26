import { ReactNode, useEffect, useRef } from 'react'
import { RDU_ChatForm } from '../chat-form/ChatForm.tsx'
import { RDU_ChatMessage, RduChatBubble } from '../chat-message/ChatMessage.tsx'
import './chat.scss'

export function RDU_Chat ({
  id,
  chatTitle,
  messages,
  help,
  onSend,
  sendIcon
}: {
  id: string
  chatTitle?: string
  messages: (string | RduChatBubble)[]
  help?: string
  onSend: (message: string) => void
  sendIcon?: ReactNode
}) {
  const body = useRef<HTMLElement>(null)

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <section className="rdu-chat" id={id}>
      {chatTitle && (
        <article className="rdu-chat-header">
          <h4>{chatTitle}</h4>
        </article>
      )}
      <article className="rdu-chat-messages" ref={body}>
        {messages.map((m, index) => {
          const bubble = typeof m === 'string' ? { text: m } : m
          return <RDU_ChatMessage key={index} message={bubble.text} author={bubble.author} time={bubble.time} />
        })}
      </article>
      <RDU_ChatForm whenSend={onSend} sendIcon={sendIcon} />
      {help && (
        <article className="rdu-chat-footer">
          <p>{help}</p>
        </article>
      )}
    </section>
  )
}
