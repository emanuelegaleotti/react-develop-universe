import { useDispatch } from 'react-redux'
import { showError } from '../../../../lib/components/error/error-slice.ts'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import './error.scss'

export function ErrorDialog () {
  const dispatch = useDispatch()
  return (
    <section className="ks-grid-main" id={'ks-error-dialog'}>
      <h2>Error Dialog</h2>
      <RDU_Button type={'button'}
                 text={'show-error-dialog'}
                 className="ks-button ks-button-primary"
                 onClick={() => {dispatch(showError({ status: 404, message: 'not fund'}))}}>
      </RDU_Button>
    </section>
  )
}