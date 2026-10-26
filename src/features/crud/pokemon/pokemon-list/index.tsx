import './pokemon-list.scss'

import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDialog } from '../../../../../lib/components/dialogs/dialog/DialogContext.tsx'
import { useOffcanvas } from '../../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'
import { CrudFooter } from '../../shared/crud-footer.tsx'
import { CrudRowActions } from '../../shared/crud-row-actions.tsx'
import { CrudToolbar } from '../../shared/crud-toolbar.tsx'
import type { PokeApiPage } from '../../shared/pokeapi.utils'
import type { PokemonListItem } from '../pokemon.model'
import { PokemonDelete } from '../pokemon-delete'
import { PokemonDetail } from '../pokemon-detail'
import { pokemonService } from '../pokemon.service'

export function PokemonList() {
  const navigate = useNavigate()
  const { openDialog, closeDialog } = useDialog()
  const { openOffcanvas } = useOffcanvas()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')
  const [reload, setReload] = useState(0)
  const [pageData, setPageData] = useState<PokeApiPage<PokemonListItem> | null>(null)

  useEffect(() => {
    let active = true
    pokemonService.getPage(page, pageSize, search).then(data => {
      if (active) setPageData(data)
    })
    return () => { active = false }
  }, [page, pageSize, search, reload])

  const onSearch = useCallback((term: string) => {
    setSearch(term)
    setPage(1)
  }, [])

  const onPageSizeChange = useCallback((size: number) => {
    setPageSize(size)
    setPage(1)
  }, [])

  const onView = (name: string) => {
    openOffcanvas(<PokemonDetail name={name} />, 'right', name, 'pokemon-detail-offcanvas')
  }

  const onDelete = (name: string) => {
    openDialog(
      <PokemonDelete
        name={name}
        onDeleted={() => { closeDialog(); setReload(value => value + 1) }}
        onCancel={closeDialog}
      />,
      'Elimina Pokémon',
      'pokemon-delete-dialog'
    )
  }

  const results = pageData?.results ?? []

  return (
    <section id="ks-pokemon-list">
      <h2>Pokémon</h2>
      <p>
        CRUD con stato gestito tramite <strong>state locale</strong>: pagina, dimensione e dati dell&apos;API
        restano nel componente, senza alcun layer di state management esterno.
      </p>

      <div className="ks-crud-card">
        <CrudToolbar createPath="/crud/pokemon/create" onSearch={onSearch} />

        <div className="ks-crud-table">
          <table className="rdu-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sprite</th>
                <th>Nome</th>
                <th className="ks-crud-cell-actions">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {pageData && results.length === 0 && (
                <tr>
                  <td colSpan={4} className="ks-crud-empty">Nessun Pokémon trovato.</td>
                </tr>
              )}
              {results.map((item, index) => (
                <tr key={item.name}>
                  <td className="ks-crud-index">{index + 1 + (page - 1) * pageSize}</td>
                  <td className="ks-crud-media">
                    <span className="ks-crud-sprite">
                      <img src={item.spriteUrl} alt={item.name} width={36} height={36} loading="lazy" />
                    </span>
                  </td>
                  <td className="ks-crud-name">{item.name}</td>
                  <td className="ks-crud-cell-actions">
                    <CrudRowActions
                      onView={() => onView(item.name)}
                      onEdit={() => navigate(`/crud/pokemon/${item.name}`)}
                      onDelete={() => onDelete(item.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CrudFooter
          count={pageData?.count ?? 0}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </section>
  )
}
