import './pokemon-detail.scss'

import { useEffect, useState } from 'react'
import type { Pokemon } from '../pokemon.model'
import { pokemonService } from '../pokemon.service'

interface PokemonDetailProps {
  name: string
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    let active = true
    pokemonService.getByName(name).then(data => {
      if (active) setPokemon(data)
    })
    return () => { active = false }
  }, [name])

  if (!pokemon) return null

  return (
    <article className="ks-detail" id="ks-pokemon-detail">
      <header className="ks-detail-hero">
        {pokemon.sprites.front_default && (
          <img src={pokemon.sprites.front_default} alt={pokemon.name} width={80} height={80} loading="lazy" />
        )}
        <div>
          <p>#{pokemon.id}</p>
          <h3>{pokemon.name}</h3>
        </div>
        {pokemon.sprites.front_shiny && (
          <div className="ks-detail-sprites">
            <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} width={56} height={56} loading="lazy" />
          </div>
        )}
      </header>

      <dl className="ks-detail-facts">
        <div>
          <dt>Altezza</dt>
          <dd>{pokemon.height / 10} <small>m</small></dd>
        </div>
        <div>
          <dt>Peso</dt>
          <dd>{pokemon.weight / 10} <small>kg</small></dd>
        </div>
        <div>
          <dt>Esperienza base</dt>
          <dd>{pokemon.base_experience}</dd>
        </div>
      </dl>

      <section>
        <h4>Tipi</h4>
        <ul className="ks-detail-chips">
          {pokemon.types.map(t => <li key={t.type.name}>{t.type.name}</li>)}
        </ul>
      </section>

      <section>
        <h4>Statistiche</h4>
        <div className="ks-detail-list">
          {pokemon.stats.map(s => (
            <div className="ks-detail-stat" key={s.stat.name}>
              <span>{s.stat.name}</span>
              <output>{s.base_stat}</output>
              <meter min={0} max={255} value={s.base_stat} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4>Abilità</h4>
        <ul className="ks-detail-chips">
          {pokemon.abilities.map(a => (
            <li key={a.ability.name}>{a.ability.name}{a.is_hidden && ' · nascosta'}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
