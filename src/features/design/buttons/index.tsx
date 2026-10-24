import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import './buttons.scss'

export function Buttons () {
  return (
    <section className="ks-grid-main" id={'ks-buttons'}>
      <h2>Buttons</h2>
      <RDU_Button type={'button'} variant={'primary'} text={'primary'}></RDU_Button>
      <RDU_Button type={'button'} variant={'secondary'} text={'secondary'}></RDU_Button>
      <RDU_Button type={'button'} variant={'tertiary'} text={'tertiary'}></RDU_Button>
      <RDU_Button type={'button'} variant={'error'} text={'danger'}></RDU_Button>
      <RDU_Button type={'button'} variant={'warning'} text={'warning'}></RDU_Button>
      <RDU_Button type={'button'} variant={'success'} text={'success'}></RDU_Button>
      <RDU_Button type={'button'} variant={'info'} text={'info'}></RDU_Button>
      <RDU_Button type={'button'} variant={'light'} text={'light'}></RDU_Button>
      <RDU_Button type={'button'} variant={'dark'} text={'dark'}></RDU_Button>
    </section>
  )
}