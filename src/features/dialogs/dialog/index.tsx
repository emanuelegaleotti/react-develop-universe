import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { useDialog } from '../../../../lib/components/dialogs/dialog/DialogContext.tsx'

function DialogContent () {
  const { closeDialog } = useDialog()

  return (
    <>
      <div className="rdu-dialog-body">
        <p>Finestra modale per conferme e azioni che richiedono attenzione.</p>
      </div>
      <div className="rdu-dialog-footer">
        <RDU_Button type="button" variant="secondary" text="cancel" onClick={closeDialog}/>
        <RDU_Button type="button" text="confirm" onClick={closeDialog}/>
      </div>
    </>
  )
}

export function Dialog () {
  const { openDialog } = useDialog()

  return (
    <section id="ks-dialog">
      <h2>Dialog</h2>
      <p>Finestra modale nativa (<code>&lt;dialog&gt;</code>) con header, corpo e footer di azioni.</p>
      <article>
        <h3>Dialog di esempio</h3>
        <div className="ks-actions">
          <RDU_Button type="button" text="open-dialog"
                      onClick={() => openDialog(<DialogContent/>, 'Esempio di dialog', 'dialog-example')}/>
        </div>
      </article>
    </section>
  )
}
