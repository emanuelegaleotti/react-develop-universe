import './chat-message.scss'

/**
 * Message shown in the chat. `author` decides the side of the bubble:
 * `user` on the right (who writes), `other` on the left (default).
 */
export type RduChatBubble = {
  text: string
  author?: 'user' | 'other'
  time?: string
}

export function RDU_ChatMessage ({ message, author = 'other', time }: {
  message: string
  author?: 'user' | 'other'
  time?: string
}) {
  return (
    <div className={`rdu-chat-message${author === 'user' ? ' rdu-chat-message-user' : ''}`}>
      {time && <time>{time}</time>}
      <p>{message}</p>
    </div>
  )
}
