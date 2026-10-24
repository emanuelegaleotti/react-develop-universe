import { useAppSelector } from '../../../../app/hooks.ts'
import { selectSelectedType } from '../type-slice.ts'

function NameList({ items }: { items: { name: string }[] }) {
  if (items.length === 0) return <span>None</span>
  return <>{items.map(r => <span key={r.name}>{r.name}</span>)}</>
}

export function TypeDetail() {
  const type = useAppSelector(selectSelectedType)

  if (!type) return null

  return (
    <article className="rdu-offcanvas-body">
      <hgroup id="offcanvas-type-title">
        <p>#{type.id}</p>
        <h3>{type.name}</h3>
      </hgroup>

      <section id="info-type">
        <p>Generation: <strong>{type.generation.name}</strong></p>
        <p>Pokémon with this type: <strong>{type.pokemon.length}</strong></p>
      </section>

      <section id="damage-relations">
        <h3>Damage Relations</h3>
        <dl>
          <div className="info-type">
            <dt>Double damage to</dt>
            <dd><NameList items={type.damage_relations.double_damage_to} /></dd>
          </div>
          <div className="info-type">
            <dt>Double damage from</dt>
            <dd><NameList items={type.damage_relations.double_damage_from} /></dd>
          </div>
          <div className="info-type">
            <dt>Half damage to</dt>
            <dd><NameList items={type.damage_relations.half_damage_to} /></dd>
          </div>
          <div className="info-type">
            <dt>Half damage from</dt>
            <dd><NameList items={type.damage_relations.half_damage_from} /></dd>
          </div>
          <div className="info-type">
            <dt>No damage to</dt>
            <dd><NameList items={type.damage_relations.no_damage_to} /></dd>
          </div>
          <div className="info-type">
            <dt>No damage from</dt>
            <dd><NameList items={type.damage_relations.no_damage_from} /></dd>
          </div>
        </dl>
      </section>
    </article>
  )
}
