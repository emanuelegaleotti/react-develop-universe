import { RDU_ChatAI } from '../../../../lib/components/chat/chat-ai/ChatAI.tsx'
import './chat-ai.scss'
export function ChatAi(){
    return (
        <section className="ks-grid-main" id={'ks-chat-ai'}>
            <h2>Chat AI</h2>
          <RDU_ChatAI></RDU_ChatAI>
        </section>
    )
}