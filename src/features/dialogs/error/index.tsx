import { useDispatch } from 'react-redux'
import { showError } from '../../../../lib/components/error/error-slice.ts'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'

const errors = [
  { status: 403, message: 'forbidden' },
  { status: 404, message: 'not found' },
  { status: 500, message: 'server error' }
]

export function ErrorDialog () {
  const dispatch = useDispatch()

  return (
    <section id="ks-error-dialog">
      <h2>Error Dialog</h2>
      <p>Dialog globale per gli errori: basta inviare lo stato con <code>showError</code>, titolo e messaggio sono tradotti.</p>
      <article>
        <h3>Errori di esempio</h3>
        <div className="ks-actions">
          {errors.map(error => (
            <RDU_Button key={error.status} type="button" variant={error.status === 500 ? 'error' : 'secondary'}
                        text="show-error"
                        onClick={() => dispatch(showError(error))}/>
          ))}
        </div>
        <pre><code>{"dispatch(showError({ status: 404, message: 'not found' }))"}</code></pre>
      </article>
    </section>
  )
}
