import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { useOffcanvas } from '../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'
import OffcanvasContent from './OffcanvasContent.tsx'

export function Offcanvas () {
  const { openOffcanvas } = useOffcanvas()

  const handleOpenOffcanvas = (position: 'left' | 'right') => {
    openOffcanvas(<OffcanvasContent/>, position, 'Offcanvas di esempio', 'offcanvas-example')
  }

  return (
    <section id="ks-offcanvas">
      <h2>Offcanvas</h2>
      <p>Pannello laterale ancorato a sinistra o a destra, con header, corpo e footer di azioni.</p>
      <article>
        <h3>Posizione</h3>
        <div className="ks-actions">
          <RDU_Button type="button" text="open-left" onClick={() => handleOpenOffcanvas('left')}/>
          <RDU_Button type="button" text="open-right" onClick={() => handleOpenOffcanvas('right')}/>
        </div>
      </article>
    </section>
  )
}
