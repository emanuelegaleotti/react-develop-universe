import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { useOffcanvas } from '../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'

export default function OffcanvasContent () {
  const { closeOffcanvas } = useOffcanvas()

  return (
    <>
      <div className="rdu-offcanvas-body">
        <p>Contenuto del pannello laterale.</p>
      </div>
      <div className="rdu-offcanvas-footer">
        <RDU_Button type="button" variant="secondary" text="cancel" onClick={closeOffcanvas}/>
        <RDU_Button type="button" text="confirm" onClick={closeOffcanvas}/>
      </div>
    </>
  )
}
