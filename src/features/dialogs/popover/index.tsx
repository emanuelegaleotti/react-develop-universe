import './popover.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_Popover } from '../../../../lib/components/dialogs/popover/Popover.tsx'

export function PopoverPage () {
  return (
    <section id="ks-popover">
      <h2>Popover</h2>

      <article>
        <h3>Posizioni</h3>
        <div className="ks-actions">
          <RDU_Popover id="popover-bottom"
                       trigger={<RDU_Button type="button" text="popover-bottom"/>}>
            <p>Popover sotto il trigger.</p>
            <p>Si chiude con click fuori o Esc.</p>
          </RDU_Popover>
          <RDU_Popover id="popover-top" placement="top"
                       trigger={<RDU_Button type="button" variant="secondary" text="popover-top"/>}>
            Popover sopra il trigger
          </RDU_Popover>
          <RDU_Popover id="popover-right" placement="right"
                       trigger={<RDU_Button type="button" variant="secondary" text="popover-right"/>}>
            Popover a destra
          </RDU_Popover>
          <RDU_Popover id="popover-left" placement="left"
                       trigger={<RDU_Button type="button" variant="secondary" text="popover-left"/>}>
            Popover a sinistra
          </RDU_Popover>
        </div>
      </article>

      <article>
        <h3>Flip verso l'alto</h3>
        <div className="ks-popover-bottom">
          <RDU_Popover id="popover-flip"
                       trigger={<RDU_Button type="button" text="popover-flip"/>}>
            Non c'è spazio sotto: il popover si ribalta sopra.
          </RDU_Popover>
        </div>
      </article>
    </section>
  )
}
