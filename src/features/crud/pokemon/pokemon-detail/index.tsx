import { useEffect, useState } from 'react'
import type { Pokemon } from '../pokemon.model'
import { pokemonService } from '../pokemon.service'

interface PokemonDetailProps {
  name: string
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    pokemonService.getByName(name).then(setPokemon)
  }, [name])

  if (!pokemon) return null

  return (
    <article className="rdu-offcanvas-body">
      <hgroup id="offcanvas-pokemon-title">
        <p>#{pokemon.id}</p>
        <h3>{pokemon.name}</h3>
      </hgroup>

      {pokemon.sprites.front_default && (
        <figure>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} width={96} height={96} loading="lazy" />
          {pokemon.sprites.front_shiny && (
            <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} width={96} height={96} loading="lazy" />
          )}
        </figure>
      )}

      <section>
        <dl id="info-pokemon-section">
          <div className="info-pokemon">
            <dt>Height</dt>
            <dd>{pokemon.height / 10} m</dd>
          </div>
          <div className="info-pokemon">
            <dt>Weight</dt>
            <dd>{pokemon.weight / 10} kg</dd>
          </div>
          <div className="info-pokemon">
            <dt>Base Experience</dt>
            <dd>{pokemon.base_experience}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Types</dt>
            <dd>{pokemon.types.map(t => t.type.name).join(' / ')}</dd>
          </div>
        </dl>
      </section>

      <section id="stats">
        <h3>Stats</h3>
        <table className="rdu-table">
          <thead>
            <tr><th>Stat</th><th>Base</th><th>Effort</th></tr>
          </thead>
          <tbody>
            {pokemon.stats.map(s => (
              <tr key={s.stat.name}>
                <td>{s.stat.name}</td>
                <td>{s.base_stat}</td>
                <td>{s.effort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="abilities">
        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities.map(a => (
            <li key={a.ability.name}>{a.ability.name}{a.is_hidden ? ' (hidden)' : ''}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

