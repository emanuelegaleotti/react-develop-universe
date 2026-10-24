import './offcanvas.scss'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'

import OffcanvasContent from './OffcanvasContent.tsx'
import { useOffcanvas } from '../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'

export function Offcanvas () {

  const { openOffcanvas } = useOffcanvas()

  const handleOpenOffcanvas = (position: 'left' | 'right') => {
    openOffcanvas(<OffcanvasContent/>, position, 'offvanvas-example', 'Offcanvas Title')
  }

  return (
    <section className="ks-grid-main" id="ks-offcanvas">
      <h2>Offcanvas</h2>
      <RDU_Button type={'button'}
                 variant={'primary'}
                 text={'open-left'}
                 onClick={() => handleOpenOffcanvas('left')}
      ></RDU_Button>
      <RDU_Button type={'button'}
                 variant={'primary'}
                 text={'open-right'}
                 onClick={() => handleOpenOffcanvas('right')}
      ></RDU_Button>
    </section>
  )
}