import './pokemon-species-list.scss'

import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { RDU_Select } from '../../../../../lib/components/inputs/select/Select.tsx'
import { useDialog } from '../../../../../lib/components/dialogs/dialog/DialogContext.tsx'
import { useOffcanvas } from '../../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts'
import { DeleteIcon, EditIcon, IconPlus, VisibilityIcon } from '../../../../shared/icons.tsx'
import type { NamedApiResource, PokeApiPage } from '../../shared/pokeapi.utils'
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchTerm,
  setPage,
  setPageSize,
  setSearchTerm,
} from '../pokemon-species-slice.ts'
import { pokemonSpeciesService } from '../pokemon-species.service.ts'
import { PokemonSpeciesDelete } from '../pokemon-species-delete'
import { PokemonSpeciesDetail } from '../pokemon-species-detail'

const PAGE_SIZE_OPTIONS = ['10', '15', '20', '25']

const PageSizeSchema = z.object({ pageSize: z.string().optional() })
type PageSizeForm = z.infer<typeof PageSizeSchema>

function buildVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  return Array.from({ length: 5 }, (_, i) => start + i)
}

export function PokemonSpeciesList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { openDialog, closeDialog } = useDialog()
  const { openOffcanvas } = useOffcanvas()

  const page = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const searchTerm = useAppSelector(selectSearchTerm)

  const [search, setSearch] = useState(searchTerm)
  const [pageData, setPageData] = useState<PokeApiPage<NamedApiResource> | null>(null)

  const { register, formState, watch } = useForm<PageSizeForm>({
    resolver: zodResolver(PageSizeSchema),
    defaultValues: { pageSize: String(pageSize) },
  })

  const fetchSpecies = useCallback(async (p: number, ps: number, s: string) => {
    const data = await pokemonSpeciesService.getPage(p, ps, s)
    setPageData(data)
  }, [])

  useEffect(() => {
    void fetchSpecies(page, pageSize, searchTerm)
  }, [fetchSpecies, page, pageSize, searchTerm])

  useEffect(() => {
    const sub = watch(value => {
      if (value.pageSize) dispatch(setPageSize(Number(value.pageSize)))
    })
    return () => sub.unsubscribe()
  }, [watch, dispatch])

  const totalCount = pageData?.count ?? 0
  const totalPages = Math.ceil(totalCount / pageSize)
  const visiblePages = useMemo(() => buildVisiblePages(page, totalPages), [page, totalPages])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setSearchTerm(search.trim()))
  }

  const openDetailOffcanvas = (item: NamedApiResource) => {
    openOffcanvas(<PokemonSpeciesDetail name={item.name} />, 'right', item.name, 'pokemon-species-detail')
  }

  const openDeleteDialog = (name: string) => {
    openDialog(
      <PokemonSpeciesDelete
        name={name}
        onDeleted={() => { closeDialog(); void fetchSpecies(page, pageSize, searchTerm) }}
        onCancel={closeDialog}
      />,
      'Elimina Pokémon Species',
      'pokemon-species-delete'
    )
  }

  return (
    <section className="rdu-grid-main" id="pokemon-species">
      <header id="header-pokemon-species">
        <hgroup>
          <h2>Pokémon Species</h2>
          <p>Esempio di CRUD ibrido con <strong>Redux Toolkit</strong>. Lo stato di paginazione (pagina, dimensione, ricerca) è in Redux; i dati API rimangono nello state locale del componente.</p>
        </hgroup>
        <RDU_Button type="button" variant="primary" text="create" icon={<IconPlus />} iconPosition="left" onClick={() => navigate('/crud/pokemon-species/create')} />
      </header>

      <search>
        <form onSubmit={handleSearchSubmit} role="search">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cerca per nome"
          />
          <RDU_Button type="submit" variant="primary" text="search" />
        </form>
      </search>

      <figure>
        <table className="rdu-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.results.length === 0 && (
              <tr><td colSpan={3}>Nessuna species trovata.</td></tr>
            )}
            {pageData?.results.map((item, index) => (
              <tr key={item.name}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <RDU_Button type="button" variant="primary" text="view" icon={<VisibilityIcon />} iconPosition="only"
                    onClick={() => openDetailOffcanvas(item)} />
                  <RDU_Button type="button" variant="primary" text="edit" icon={<EditIcon />} iconPosition="only"
                    onClick={() => navigate(`/crud/pokemon-species/${item.name}`)} />
                  <RDU_Button type="button" variant="error" text="delete" icon={<DeleteIcon />} iconPosition="only"
                    onClick={() => openDeleteDialog(item.name)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption>{totalCount} totali</figcaption>
      </figure>

      <nav aria-label="Paginazione">
        <RDU_Button type="button" variant="primary" text="prev" icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
        } iconPosition="only" disabled={page <= 1} onClick={() => dispatch(setPage(page - 1))} />
        {visiblePages.map(n => (
          <button key={n} type="button" className={`rdu-button rdu-link${n === page ? ' active' : ''}`}
            onClick={() => dispatch(setPage(n))} aria-current={n === page ? 'page' : undefined}>
            {n}
          </button>
        ))}
        <RDU_Button type="button" variant="primary" text="next" icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        } iconPosition="only" disabled={page >= totalPages} onClick={() => dispatch(setPage(page + 1))} />
      </nav>

      <form id="pageSizeForm">
        <RDU_Select
          name="pageSize"
          feature="crud"
          id="species-page-size"
          options={PAGE_SIZE_OPTIONS}
          autoComplete="none"
          register={register}
          formState={formState}
          schema={PageSizeSchema}
          errorMsg={false}
          successMsg={false}
          helpMsg={false}
        />
      </form>
    </section>
  )
}
