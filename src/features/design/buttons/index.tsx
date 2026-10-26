import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'

const plus = <svg viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
const download = <svg viewBox="0 -960 960 960"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
const arrow = <svg viewBox="0 -960 960 960"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
const edit = <svg viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.500-17t30.500-6q16 0 31 6t26 18l55 56q12 11 17.500 26t5.500 30q0 16-5.500 30.500T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
const trash = <svg viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.500-23.500T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.500 56.500T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>

const noop = () => {}

export function Buttons () {
  return (
    <section id="ks-buttons">
      <h2>Buttons</h2>
      <p>
        Pulsanti della libreria <code>react-develop-universe</code>: il componente <code>RDU_Button</code> con
        le prop <code>variant</code>, <code>size</code>, <code>icon</code> e <code>pill</code>.
      </p>

      <article>
        <h3>Varianti principali</h3>
        <p>Gerarchia delle azioni: una sola azione primaria per vista, le altre in secondario o terziario.</p>
        <div className="ks-actions">
          <RDU_Button type="button" variant="primary" text="primary" onClick={noop}/>
          <RDU_Button type="button" variant="secondary" text="secondary" onClick={noop}/>
          <RDU_Button type="button" variant="tertiary" text="tertiary" onClick={noop}/>
          <RDU_Button type="button" variant="ghost" text="ghost" onClick={noop}/>
          <RDU_Button type="button" variant="link" text="link" onClick={noop}/>
        </div>
        <pre><code>{'<RDU_Button type="button" variant="primary" text="primary" />'}</code></pre>
      </article>

      <article>
        <h3>Varianti semantiche</h3>
        <p>Colori legati al significato: conferma, attenzione, errore, informazione.</p>
        <div className="ks-actions">
          <RDU_Button type="button" variant="success" text="success" onClick={noop}/>
          <RDU_Button type="button" variant="warning" text="warning" onClick={noop}/>
          <RDU_Button type="button" variant="error" text="danger" onClick={noop}/>
          <RDU_Button type="button" variant="info" text="info" onClick={noop}/>
          <RDU_Button type="button" variant="dark" text="dark" onClick={noop}/>
          <RDU_Button type="button" variant="light" text="light" onClick={noop}/>
        </div>
      </article>

      <article>
        <h3>Dimensioni</h3>
        <p>Tre misure: <code>small</code>, <code>default</code> e <code>large</code>.</p>
        <div className="ks-actions">
          <RDU_Button type="button" size="small" text="small" onClick={noop}/>
          <RDU_Button type="button" text="default" onClick={noop}/>
          <RDU_Button type="button" size="large" text="large" onClick={noop}/>
        </div>
        <div className="ks-actions">
          <RDU_Button type="button" variant="secondary" size="small" text="small" onClick={noop}/>
          <RDU_Button type="button" variant="secondary" text="default" onClick={noop}/>
          <RDU_Button type="button" variant="secondary" size="large" text="large" onClick={noop}/>
        </div>
        <pre><code>{'<RDU_Button type="button" size="large" text="large" />'}</code></pre>
      </article>

      <article>
        <h3>Con icona</h3>
        <p>
          <code>iconPosition</code> sceglie il lato dell’icona; con <code>only</code> il pulsante diventa
          quadrato (il testo resta nell’<code>aria-label</code>).
        </p>
        <div className="ks-actions">
          <RDU_Button type="button" icon={plus} iconPosition="left" text="create" onClick={noop}/>
          <RDU_Button type="button" variant="secondary" icon={download} iconPosition="left" text="download" onClick={noop}/>
          <RDU_Button type="button" variant="tertiary" icon={arrow} iconPosition="right" text="continue" onClick={noop}/>
          <RDU_Button type="button" icon={plus} iconPosition="only" text="add" onClick={noop}/>
          <RDU_Button type="button" variant="secondary" icon={edit} iconPosition="only" text="edit" onClick={noop}/>
          <RDU_Button type="button" variant="ghost" icon={trash} iconPosition="only" text="delete" onClick={noop}/>
          <RDU_Button type="button" variant="error" pill icon={trash} iconPosition="only" text="delete" onClick={noop}/>
        </div>
      </article>

      <article>
        <h3>Stati</h3>
        <p>Normale e <code>disabled</code> a confronto: il pulsante disabilitato perde hover e cursore.</p>
        <div className="ks-actions">
          <RDU_Button type="button" variant="primary" text="primary" onClick={noop}/>
          <RDU_Button type="button" variant="primary" text="primary" disabled/>
          <RDU_Button type="button" variant="secondary" text="secondary" onClick={noop}/>
          <RDU_Button type="button" variant="secondary" text="secondary" disabled/>
          <RDU_Button type="button" variant="tertiary" text="tertiary" disabled/>
          <RDU_Button type="button" variant="error" text="danger" disabled/>
        </div>
      </article>

      <article>
        <h3>Azioni di un form</h3>
        <p>Combinazione tipica: annulla in secondario, conferma in primario.</p>
        <div className="ks-actions">
          <RDU_Button type="button" variant="secondary" text="cancel" onClick={noop}/>
          <RDU_Button type="button" variant="primary" text="save" onClick={noop}/>
        </div>
        <div className="ks-actions">
          <RDU_Button type="button" variant="ghost" text="back" onClick={noop}/>
          <RDU_Button type="button" variant="error" text="delete" onClick={noop}/>
        </div>
      </article>
    </section>
  )
}
