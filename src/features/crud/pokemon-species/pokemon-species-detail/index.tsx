import './pokemon-species-detail.scss'

import { useEffect, useState } from 'react'
import type { PokemonSpecies } from '../pokemon-species.model'
import { pokemonSpeciesService } from '../pokemon-species.service'

interface PokemonSpeciesDetailProps {
  name: string
}

export function PokemonSpeciesDetail({ name }: PokemonSpeciesDetailProps) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null)

  useEffect(() => {
    let active = true
    pokemonSpeciesService.getByName(name).then(data => {
      if (active) setSpecies(data)
    })
    return () => { active = false }
  }, [name])

  if (!species) return null

  const flavor = species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text
  const flavorText = flavor?.replace(/[\n\f]/g, ' ')

  return (
    <article className="ks-detail" id="ks-species-detail">
      <header className="ks-detail-hero">
        <div>
          <p>#{species.id}</p>
          <h3>{species.name}</h3>
        </div>
        {(species.is_legendary || species.is_mythical) && (
          <ul className="ks-detail-chips">
            {species.is_legendary && <li>Leggendario</li>}
            {species.is_mythical && <li>Misterioso</li>}
          </ul>
        )}
      </header>

      <dl className="ks-detail-facts">
        <div>
          <dt>Colore</dt>
          <dd>{species.color.name}</dd>
        </div>
        <div>
          <dt>Habitat</dt>
          <dd>{species.habitat?.name ?? '—'}</dd>
        </div>
        <div>
          <dt>Cattura</dt>
          <dd>{species.capture_rate}</dd>
        </div>
        <div>
          <dt>Felicità base</dt>
          <dd>{species.base_happiness ?? '—'}</dd>
        </div>
        <div>
          <dt>Rapporto sessi</dt>
          <dd>{species.gender_rate}</dd>
        </div>
        <div>
          <dt>Si evolve da</dt>
          <dd>{species.evolves_from_species?.name ?? '—'}</dd>
        </div>
      </dl>

      <section>
        <h4>Gruppi uova</h4>
        <ul className="ks-detail-chips">
          {species.egg_groups.map(group => <li key={group.name}>{group.name}</li>)}
        </ul>
      </section>

      {flavorText && <blockquote>{flavorText}</blockquote>}
    </article>
  )
}
