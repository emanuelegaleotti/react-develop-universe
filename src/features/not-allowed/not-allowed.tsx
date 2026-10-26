import { useNavigate } from 'react-router'
import { RDU_Button } from '../../../lib/components/buttons/button/Button.tsx'

export function NotAllowed () {
  const navigate = useNavigate()

  return (
    <section id="ks-not-allowed">
      <h2>403</h2>
      <p>Non hai i permessi per visualizzare questa pagina.</p>
      <article>
        <h3>Accesso negato</h3>
        <p>Se pensi sia un errore, contatta l’amministratore.</p>
        <div className="ks-actions">
          <RDU_Button type="button" text="back" onClick={() => navigate('/')}/>
        </div>
      </article>
    </section>
  )
}
