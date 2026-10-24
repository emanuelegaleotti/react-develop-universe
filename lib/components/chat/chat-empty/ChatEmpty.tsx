import './chat-empty.scss'
import {useTranslation} from "react-i18next";

export function RDU_ChatEmpty(){
  const { t } = useTranslation()

  return (
    <article className="rdu-chat-empty">
      <h3>{t('rdu.chat.empty.msg')}</h3>
    </article>
  )
}
