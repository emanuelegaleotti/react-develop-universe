import './type-detail.scss'

import { useAppSelector } from '../../../../app/hooks.ts'
import type { NamedApiResource } from '../../shared/pokeapi.utils'
import { selectSelectedType } from '../type-slice.ts'

function Relation({ title, items }: { title: string, items: NamedApiResource[] }) {
  return (
    <section>
      <h4>{title}</h4>
      {items.length > 0
        ? <ul className="ks-detail-chips">{items.map(item => <li key={item.name}>{item.name}</li>)}</ul>
        : <p>—</p>}
    </section>
  )
}

export function TypeDetail() {
  const type = useAppSelector(selectSelectedType)

  if (!type) return null

  const relations = type.damage_relations

  return (
    <article className="ks-detail" id="ks-type-detail">
      <header className="ks-detail-hero">
        <div>
          <p>#{type.id}</p>
          <h3>{type.name}</h3>
        </div>
      </header>

      <dl className="ks-detail-facts">
        <div>
          <dt>Generazione</dt>
          <dd>{type.generation.name}</dd>
        </div>
        <div>
          <dt>Pokémon</dt>
          <dd>{type.pokemon.length}</dd>
        </div>
      </dl>

      <Relation title="Danno doppio verso" items={relations.double_damage_to} />
      <Relation title="Danno doppio da" items={relations.double_damage_from} />
      <Relation title="Danno dimezzato verso" items={relations.half_damage_to} />
      <Relation title="Danno dimezzato da" items={relations.half_damage_from} />
      <Relation title="Nessun danno verso" items={relations.no_damage_to} />
      <Relation title="Nessun danno da" items={relations.no_damage_from} />
    </article>
  )
}
