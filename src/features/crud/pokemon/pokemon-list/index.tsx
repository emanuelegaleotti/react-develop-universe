import './pokemon-list.scss'

import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../../lib/components/buttons/button/Button.tsx'
import { RDU_Select } from '../../../../../lib/components/inputs/select/Select.tsx'
import { useDialog } from '../../../../../lib/components/dialogs/dialog/DialogContext.tsx'
import { useOffcanvas } from '../../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'
import { DeleteIcon, EditIcon, IconPlus, VisibilityIcon } from '../../../../shared/icons.tsx'
import type { PokeApiPage } from '../../shared/pokeapi.utils'
import type { PokemonListItem } from '../pokemon.model'
import { PokemonDelete } from '../pokemon-delete'
import { PokemonDetail } from '../pokemon-detail'
import { pokemonService } from '../pokemon.service'

const PAGE_SIZE_OPTIONS = ['10', '15', '20', '25']

const PageSizeSchema = z.object({ pageSize: z.string().optional() })
type PageSizeForm = z.infer<typeof PageSizeSchema>

function buildVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  return Array.from({ length: 5 }, (_, i) => start + i)
}

export function PokemonList() {
  const navigate = useNavigate()
  const { openDialog, closeDialog } = useDialog()
  const { openOffcanvas } = useOffcanvas()
  const submittedSearch = useRef('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')
  const [pageData, setPageData] = useState<PokeApiPage<PokemonListItem> | null>(null)

  const { register, formState, watch } = useForm<PageSizeForm>({
    resolver: zodResolver(PageSizeSchema),
    defaultValues: { pageSize: String(pageSize) },
  })

  const fetchPokemon = useCallback(async (p: number, ps: number, s: string) => {
    const data = await pokemonService.getPage(p, ps, s)
    setPageData(data)
  }, [])

  useEffect(() => {
    void fetchPokemon(page, pageSize, submittedSearch.current)
  }, [fetchPokemon, page, pageSize])

  useEffect(() => {
    const sub = watch(value => {
      if (value.pageSize) {
        setPageSize(Number(value.pageSize))
        setPage(1)
      }
    })
    return () => sub.unsubscribe()
  }, [watch])

  const totalCount = pageData?.count ?? 0
  const totalPages = Math.ceil(totalCount / pageSize)
  const visiblePages = useMemo(() => buildVisiblePages(page, totalPages), [page, totalPages])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submittedSearch.current = search.trim()
    setPage(1)
    void fetchPokemon(1, pageSize, submittedSearch.current)
  }

  const openDetailOffcanvas = (item: PokemonListItem) => {
    openOffcanvas(<PokemonDetail name={item.name} />, 'right', item.name, 'pokemon-detail')
  }

  const openDeleteDialog = (name: string) => {
    openDialog(
      <PokemonDelete
        name={name}
        onDeleted={() => { closeDialog(); void fetchPokemon(page, pageSize, submittedSearch.current) }}
        onCancel={closeDialog}
      />,
      'Elimina Pokémon',
      'pokemon-delete'
    )
  }

  return (
    <section className="rdu-grid-main" id="pokemon">
      <header id="header-pokemon">
        <hgroup>
          <h2>Pokémon</h2>
          <p>Esempio di CRUD con gestione dello stato tramite <strong>state locale</strong>. Pagina, dimensione e dati API sono mantenuti nel componente senza alcun layer di state management esterno.</p>
        </hgroup>
        <RDU_Button type="button" variant="primary" text="create" icon={<IconPlus />} iconPosition="left" onClick={() => navigate('/crud/pokemon/create')} />
      </header>

      <search>
        <form onSubmit={handleSearchSubmit} role="search">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              <th>Sprite</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.results.length === 0 && (
              <tr><td colSpan={4}>Nessun Pokémon trovato.</td></tr>
            )}
            {pageData?.results.map((item, index) => (
              <tr key={item.name}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>
                  <img src={item.spriteUrl} alt={item.name} width={40} height={40} loading="lazy" />
                </td>
                <td>{item.name}</td>
                <td>
                  <RDU_Button type="button" variant="primary" text="view" icon={<VisibilityIcon />} iconPosition="only"
                    onClick={() => openDetailOffcanvas(item)} />
                  <RDU_Button type="button" variant="primary" text="edit" icon={<EditIcon />} iconPosition="only"
                    onClick={() => navigate(`/crud/pokemon/${item.name}`)} />
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
        } iconPosition="only" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} />
        {visiblePages.map(n => (
          <button key={n} type="button" className={`rdu-button rdu-link${n === page ? ' active' : ''}`}
            onClick={() => setPage(n)} aria-current={n === page ? 'page' : undefined}>
            {n}
          </button>
        ))}
        <RDU_Button type="button" variant="primary" text="next" icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        } iconPosition="only" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
      </nav>

      <form id="pageSizeForm">
        <RDU_Select
          name="pageSize"
          feature="crud"
          id="pokemon-page-size"
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
