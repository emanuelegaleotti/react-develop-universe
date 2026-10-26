import './notification.scss'
import { useState } from 'react'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { useNotification, type NotificationPermissionState } from '../../../shared/notification/use-notification.ts'

const permissionLabels: Record<NotificationPermissionState, string> = {
  granted: 'Concesso',
  denied: 'Negato',
  default: 'Da richiedere',
  unsupported: 'Non supportato'
}

const permissionHelp: Record<NotificationPermissionState, string> = {
  default: 'Il browser non ha ancora chiesto il permesso: premi «Richiedi permesso» per far comparire la richiesta.',
  granted: 'Le notifiche sono abilitate: puoi inviare una notifica di prova.',
  denied: 'Le notifiche sono bloccate dal browser. Per riabilitarle apri le impostazioni del sito (icona accanto all\'indirizzo) e consenti le notifiche, poi ricarica la pagina.',
  unsupported: 'Questo browser non supporta la Notification API.'
}

export function NotificationPage () {
  const { permission, isOpen, requestPermission, send, close } = useNotification()
  const [feedback, setFeedback] = useState('')

  const sendTest = () => {
    const result = send('Notifica di prova', {
      body: 'Questa notifica è stata inviata dal kitchen sink React.',
      tag: 'ks-notification'
    })
    if (result.ok) {
      setFeedback('Notifica inviata.')
    } else if (result.reason === 'error') {
      setFeedback('Il browser ha rifiutato la notifica (alcuni browser mobili richiedono un service worker).')
    } else {
      setFeedback('Notifica non inviata: permesso mancante.')
    }
  }

  return (
    <section id="ks-notification">
      <h2>Notification</h2>
      <p>
        Notifiche di sistema tramite la Notification API del browser, gestite dall'hook <code>useNotification</code>:
        richiesta del permesso, invio e chiusura.
      </p>

      <article>
        <h3>Permesso</h3>
        <p>
          Stato attuale:{' '}
          <span className="ks-notification-status" data-state={permission} role="status">
            {permissionLabels[permission]}
          </span>
        </p>
        <p>{permissionHelp[permission]}</p>
        <div className="ks-actions">
          <RDU_Button type="button" text="notification-request"
                      disabled={permission !== 'default'}
                      onClick={() => {
                        requestPermission().then(result => setFeedback(
                          result === 'granted' ? 'Permesso concesso.' : 'Permesso non concesso.'
                        ))
                      }}/>
        </div>
      </article>

      <article>
        <h3>Local notification</h3>
        <p>Invia una notifica di sistema generata direttamente dalla pagina, e chiudila senza aspettare che scompaia.</p>
        <div className="ks-actions">
          <RDU_Button type="button" text="notification-send"
                      disabled={permission !== 'granted'}
                      onClick={sendTest}/>
          <RDU_Button type="button" variant="secondary" text="notification-close"
                      disabled={!isOpen}
                      onClick={() => {
                        close()
                        setFeedback('Notifica chiusa.')
                      }}/>
        </div>
        <p className="ks-notification-feedback" aria-live="polite">{feedback}</p>
      </article>

      <article>
        <h3>Push notification</h3>
        <p>
          Le notifiche push (ricevute anche a pagina chiusa) richiedono un service worker e una chiave pubblica VAPID
          lato server: non fanno parte di questa demo, che mostra solo le notifiche locali.
        </p>
      </article>

      <article>
        <h3>Caratteristiche</h3>
        <ul>
          <li>Permesso letto da <code>Notification.permission</code> e mantenuto allineato alle impostazioni del browser</li>
          <li>Quattro stati: <code>granted</code>, <code>denied</code>, <code>default</code> e non supportato</li>
          <li>Richiesta del permesso solo su azione dell'utente, come richiesto dai browser</li>
          <li>Invio e chiusura programmatica con gestione dell'errore e del click sulla notifica</li>
          <li>Funziona solo in contesti sicuri (HTTPS o <code>localhost</code>)</li>
        </ul>
      </article>
    </section>
  )
}
