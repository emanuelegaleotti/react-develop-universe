import './pokemon-species-list.scss'

import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDialog } from '../../../../../lib/components/dialogs/dialog/DialogContext.tsx'
import { useOffcanvas } from '../../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts'
import { CrudFooter } from '../../shared/crud-footer.tsx'
import { CrudRowActions } from '../../shared/crud-row-actions.tsx'
import { CrudToolbar } from '../../shared/crud-toolbar.tsx'
import type { NamedApiResource, PokeApiPage } from '../../shared/pokeapi.utils'
import { PokemonSpeciesDelete } from '../pokemon-species-delete'
import { PokemonSpeciesDetail } from '../pokemon-species-detail'
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchTerm,
  setPage,
  setPageSize,
  setSearchTerm,
} from '../pokemon-species-slice.ts'
import { pokemonSpeciesService } from '../pokemon-species.service'

export function PokemonSpeciesList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { openDialog, closeDialog } = useDialog()
  const { openOffcanvas } = useOffcanvas()

  const page = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const searchTerm = useAppSelector(selectSearchTerm)

  const [reload, setReload] = useState(0)
  const [pageData, setPageData] = useState<PokeApiPage<NamedApiResource> | null>(null)

  useEffect(() => {
    let active = true
    pokemonSpeciesService.getPage(page, pageSize, searchTerm).then(data => {
      if (active) setPageData(data)
    })
    return () => { active = false }
  }, [page, pageSize, searchTerm, reload])

  const onSearch = useCallback((term: string) => { dispatch(setSearchTerm(term)) }, [dispatch])
  const onPageChange = useCallback((value: number) => { dispatch(setPage(value)) }, [dispatch])
  const onPageSizeChange = useCallback((value: number) => { dispatch(setPageSize(value)) }, [dispatch])

  const onView = (name: string) => {
    openOffcanvas(<PokemonSpeciesDetail name={name} />, 'right', name, 'pokemon-species-detail-offcanvas')
  }

  const onDelete = (name: string) => {
    openDialog(
      <PokemonSpeciesDelete
        name={name}
        onDeleted={() => { closeDialog(); setReload(value => value + 1) }}
        onCancel={closeDialog}
      />,
      'Elimina specie',
      'pokemon-species-delete-dialog'
    )
  }

  const results = pageData?.results ?? []

  return (
    <section id="ks-species-list">
      <h2>Specie Pokémon</h2>
      <p>
        CRUD con stato gestito tramite <strong>Redux Toolkit</strong>: pagina, dimensione e ricerca vivono nello
        slice, mentre i dati dell&apos;API restano nel componente.
      </p>

      <div className="ks-crud-card">
        <CrudToolbar createPath="/crud/pokemon-species/create" defaultSearch={searchTerm} onSearch={onSearch} />

        <div className="ks-crud-table">
          <table className="rdu-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th className="ks-crud-cell-actions">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {pageData && results.length === 0 && (
                <tr>
                  <td colSpan={3} className="ks-crud-empty">Nessuna specie trovata.</td>
                </tr>
              )}
              {results.map((item, index) => (
                <tr key={item.name}>
                  <td className="ks-crud-index">{index + 1 + (page - 1) * pageSize}</td>
                  <td className="ks-crud-name">{item.name}</td>
                  <td className="ks-crud-cell-actions">
                    <CrudRowActions
                      onView={() => onView(item.name)}
                      onEdit={() => navigate(`/crud/pokemon-species/${item.name}`)}
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
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </section>
  )
}
