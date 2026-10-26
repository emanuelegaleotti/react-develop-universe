import './toast.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { useToast } from '../../../../lib/components/dialogs/toast/use-toast.ts'
import { ToastIcon } from './toast-icons.tsx'

export function ToastPage () {
  const { showToast, hideToast } = useToast()

  return (
    <section id="ks-toast">
      <h2>Toast</h2>

      <article>
        <h3>Posizioni</h3>
        <p>Il toast può comparire in sei posizioni differenti sullo schermo. Può essere temporizzato (scompare automaticamente) oppure persistente (si chiude solo con il pulsante ×).</p>
        <div className="ks-toast-demo-grid">
          <RDU_Button type="button" text="toast-top-left"
                      onClick={() => showToast({
                        position: 'top-left',
                        className: 'ks-toast-success',
                        title: 'Operazione riuscita',
                        message: 'Il file è stato salvato correttamente.',
                        icon: <ToastIcon name="success"/>,
                        dateTime: new Date(),
                        duration: 4000
                      })}/>
          <RDU_Button type="button" text="toast-top-center"
                      onClick={() => showToast({
                        position: 'top-center',
                        title: 'Solo messaggio',
                        message: 'Toast senza icon centrato in alto.',
                        duration: 3000
                      })}/>
          <RDU_Button type="button" text="toast-top-right"
                      onClick={() => showToast({
                        position: 'top-right',
                        className: 'ks-toast-info',
                        title: 'Notifica in arrivo',
                        message: 'Questo è un messaggio informativo temporizzato.',
                        icon: <ToastIcon name="info"/>,
                        dateTime: new Date(),
                        duration: 4000
                      })}/>
          <RDU_Button type="button" text="toast-bottom-left"
                      onClick={() => showToast({
                        position: 'bottom-left',
                        className: 'ks-toast-info',
                        title: 'Messaggio persistente',
                        message: 'Questo toast non sparisce automaticamente. Usa il pulsante × per chiuderlo.',
                        icon: <ToastIcon name="info"/>,
                        dateTime: new Date(),
                        duration: null
                      })}/>
          <RDU_Button type="button" text="toast-bottom-center"
                      onClick={() => showToast({
                        position: 'bottom-center',
                        message: 'Toast senza titolo né data, centrato in basso.',
                        duration: 3000
                      })}/>
          <RDU_Button type="button" text="toast-bottom-right"
                      onClick={() => showToast({
                        position: 'bottom-right',
                        className: 'ks-toast-warning',
                        title: 'Attenzione',
                        message: 'La sessione scadrà tra 5 minuti.',
                        icon: <ToastIcon name="warning"/>,
                        dateTime: new Date(),
                        duration: 5000
                      })}/>
        </div>
      </article>

      <article>
        <h3>Controlli</h3>
        <RDU_Button type="button" variant="secondary" text="toast-hide" onClick={hideToast}/>
      </article>

      <article>
        <h3>Caratteristiche</h3>
        <ul>
          <li>Basato sul tag HTML nativo <code>&lt;dialog&gt;</code> (non-modal)</li>
          <li>Sei posizioni: angoli e centri superiore/inferiore</li>
          <li>Un solo toast visibile alla volta — il nuovo sostituisce il precedente</li>
          <li>Pulsante di chiusura sempre presente</li>
          <li>Titolo, icona, messaggio e data/ora configurabili</li>
          <li>Timer di auto-chiusura opzionale (in millisecondi)</li>
          <li>Toast persistente impostando <code>duration: null</code></li>
        </ul>
      </article>
    </section>
  )
}
