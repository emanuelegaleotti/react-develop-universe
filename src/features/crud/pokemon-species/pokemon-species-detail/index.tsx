import { useEffect, useState } from 'react'
import type { PokemonSpecies } from '../pokemon-species.model'
import { pokemonSpeciesService } from '../pokemon-species.service'

interface PokemonSpeciesDetailProps {
  name: string
}

export function PokemonSpeciesDetail({ name }: PokemonSpeciesDetailProps) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null)

  useEffect(() => {
    pokemonSpeciesService.getByName(name).then(setSpecies)
  }, [name])

  if (!species) return null

  return (
    <article className="rdu-offcanvas-body">
      <hgroup id="offcanvas-species-title">
        <p>#{species.id}</p>
        <h3>{species.name}</h3>
      </hgroup>

      <section id="info-species-section">
        <dl id="info-species">
          <div className="info-pokemon">
            <dt>Color</dt>
            <dd>{species.color.name}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Habitat</dt>
            <dd>{species.habitat?.name ?? 'None'}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Capture Rate</dt>
            <dd>{species.capture_rate}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Base Happiness</dt>
            <dd>{species.base_happiness ?? '—'}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Gender Rate</dt>
            <dd>{species.gender_rate}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Legendary</dt>
            <dd>{species.is_legendary ? 'Yes' : 'No'}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Mythical</dt>
            <dd>{species.is_mythical ? 'Yes' : 'No'}</dd>
          </div>
          <div className="info-pokemon">
            <dt>Evolves From</dt>
            <dd>{species.evolves_from_species?.name ?? 'None'}</dd>
          </div>
        </dl>
      </section>

      {species.egg_groups.length > 0 && (
        <section id="egg-groups">
          <h3>Egg Groups</h3>
          <ul>
            {species.egg_groups.map(eg => (
              <li key={eg.name}>{eg.name}</li>
            ))}
          </ul>
        </section>
      )}

      {species.flavor_text_entries.length > 0 && (
        <blockquote>
          {species.flavor_text_entries[0].flavor_text}
        </blockquote>
      )}
    </article>
  )
}
