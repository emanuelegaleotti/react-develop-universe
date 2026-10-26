import './bottom-sheet.scss'
import { useState } from 'react'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { useBottomSheet } from '../../../../lib/components/dialogs/bottom-sheet/BottomSheetContext.tsx'

type BottomSheetData = { items: string[] }

const dialogData: BottomSheetData = { items: ['Condividi', 'Salva', 'Modifica', 'Elimina'] }

function BottomSheetContent ({ data }: { data: BottomSheetData }) {
  const { closeBottomSheet } = useBottomSheet()

  return (
    <>
      <div className="rdu-bottom-sheet-body">
        <ul className="ks-bottom-sheet-list">
          {data.items.map(item => (
            <li key={item}>
              <button type="button" className="ks-bottom-sheet-list-item" onClick={() => closeBottomSheet(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rdu-bottom-sheet-footer">
        <RDU_Button type="button" variant="secondary" text="close" onClick={() => closeBottomSheet()}/>
      </div>
    </>
  )
}

export function BottomSheetPage () {
  const { openBottomSheet } = useBottomSheet()
  const [selected, setSelected] = useState('')

  const open = () => {
    openBottomSheet<string>(<BottomSheetContent data={dialogData}/>, 'Seleziona un\'opzione', 'test-bottom-sheet')
      .then(item => {
        if (item) {
          setSelected(item)
        }
      })
  }

  return (
    <section id="ks-bottom-sheet">
      <h2>Bottom Sheet</h2>

      <article>
        <RDU_Button type="button" text="open-bottom-sheet" onClick={open}/>
        <p>Ultima selezione: <strong>{selected || '-'}</strong></p>
      </article>
    </section>
  )
}
