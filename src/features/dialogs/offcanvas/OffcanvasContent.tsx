import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'

export default function OffcanvasContent () {
  return (
    <>
      <div className="rdu-offcanvas-body">
        offcanvas content
      </div>
      <div className="rdu-offcanvas-footer">
        <RDU_Button type={'button'} text={'test'}></RDU_Button>
      </div>
    </>
  )
}