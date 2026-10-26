import './dropdown.scss'
import { useState } from 'react'
import { RDU_Dropdown } from '../../../../lib/components/dropdown/Dropdown.tsx'

type MenuListProps = { actions: { label: string, value: string }[], onSelect: (value: string) => void }

function MenuList ({ actions, onSelect }: MenuListProps) {
  return (
    <ul className="ks-menu-list">
      {actions.map(({ label, value }) => (
        <li key={value}>
          <button type="button" onClick={() => onSelect(value)}>{label}</button>
        </li>
      ))}
    </ul>
  )
}

export function DropdownPage () {
  const [lastAction, setLastAction] = useState('')

  return (
    <section id="ks-dropdown">
      <h2>Dropdown</h2>

      <article>
        <h3>Menu</h3>
        <div className="ks-dropdown-demo">
          <RDU_Dropdown id="actions" label="Actions">
            <MenuList onSelect={setLastAction} actions={[
              { label: 'Edit', value: 'Edit' },
              { label: 'Duplicate', value: 'Duplicate' },
              { label: 'Delete', value: 'Delete' }
            ]}/>
          </RDU_Dropdown>

          <RDU_Dropdown id="custom-content" label="Custom content">
            <p>Qualsiasi contenuto passato come children.</p>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React docs</a>
          </RDU_Dropdown>
        </div>
        <p>Ultima azione: <strong>{lastAction || '-'}</strong></p>
      </article>

      <article>
        <h3>Flip verso l'alto</h3>
        <div className="ks-dropdown-bottom">
          <RDU_Dropdown id="flip" label="Flip verso l'alto">
            <MenuList onSelect={setLastAction} actions={[
              { label: 'Voce A', value: 'Bottom A' },
              { label: 'Voce B', value: 'Bottom B' },
              { label: 'Voce C', value: 'Bottom C' }
            ]}/>
          </RDU_Dropdown>
        </div>
      </article>
    </section>
  )
}
