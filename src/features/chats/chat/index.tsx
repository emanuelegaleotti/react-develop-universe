import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RDU_Chat, RduChatBubble } from '../../../../lib/main.ts'
import './chat.scss'

const initialMessages: RduChatBubble[] = [
  { author: 'other', time: '09:41', text: 'Ciao! Sono l’assistente di react-develop-universe. Come posso aiutarti?' },
  { author: 'user', time: '09:42', text: 'Ciao, come si crea un componente?' },
  {
    author: 'other',
    time: '09:42',
    text: 'In React un componente è una funzione che restituisce JSX.\nBasta dichiararla con la prima lettera maiuscola e usarla come un tag: `<Saluto />`.'
  },
  { author: 'user', time: '09:43', text: 'E per i dati reattivi?' },
  {
    author: 'other',
    time: '09:44',
    text: 'Usa gli hook: `useState` per lo stato, `useMemo` per i valori derivati e `useEffect` per gli effetti collaterali. Con le props passi i dati ai componenti figli.'
  },
  { author: 'user', time: '09:45', text: 'Perfetto, grazie! 🙌' },
  { author: 'other', time: '09:45', text: 'Figurati! Scrivimi pure se hai altre domande.' }
]

const timeFormat = new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit' })

export function Chat () {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<RduChatBubble[]>(initialMessages)

  const send = (text: string) => {
    setMessages(current => [...current, { author: 'user', time: timeFormat.format(new Date()), text }])
  }

  return (
    <section id="ks-chat">
      <h2>Chat</h2>
      <article className="ks-chat-card">
        <RDU_Chat id="chat"
                  chatTitle="Assistente"
                  messages={messages}
                  help={t('rdu.chat.help')}
                  onSend={send}
                  sendIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
                    </svg>
                  }
        />
      </article>
    </section>
  )
}
