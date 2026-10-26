import { useNavigate } from 'react-router'
import { RDU_Button } from '../../../lib/components/buttons/button/Button.tsx'

export function NotFound () {
  const navigate = useNavigate()

  return (
    <section id="ks-not-found">
      <h2>404</h2>
      <p>La pagina che stai cercando non esiste o è stata spostata.</p>
      <article>
        <h3>Pagina non trovata</h3>
        <p>Controlla l’indirizzo oppure torna alla home.</p>
        <div className="ks-actions">
          <RDU_Button type="button" text="back" onClick={() => navigate('/')}/>
        </div>
      </article>
    </section>
  )
}
