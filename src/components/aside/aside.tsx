import './aside.scss'
import {Navigation} from "../navigation/navigation.tsx";

type AsideProps = {
  open: boolean
}

export default function Aside ({ open }: AsideProps) {
  return (
    <aside id='ks-aside' data-open={open}>
      <Navigation />
    </aside>
  )
}
