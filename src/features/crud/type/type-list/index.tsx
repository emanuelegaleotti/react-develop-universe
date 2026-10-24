import './type-list.scss'

import { type FormEvent, useMemo, useState, useEffect } from 'react'
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
import type { NamedApiResource } from '../../shared/pokeapi.utils'
import {
  fetchTypes,
  selectCount,
  selectCurrentPage,
  selectPageSize,
  selectResults,
  selectSearchTerm,
  selectType,
  setPage,
  setPageSize,
  setSearchTerm,
} from '../type-slice.ts'
import { TypeDelete } from '../type-delete'
import { TypeDetail } from '../type-detail'

const PAGE_SIZE_OPTIONS = ['10', '15', '20', '25']

const PageSizeSchema = z.object({ pageSize: z.string().optional() })
type PageSizeForm = z.infer<typeof PageSizeSchema>

function buildVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  return Array.from({ length: 5 }, (_, i) => start + i)
}

export function TypeList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { openDialog, closeDialog } = useDialog()
  const { openOffcanvas } = useOffcanvas()

  const page = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const searchTerm = useAppSelector(selectSearchTerm)
  const results = useAppSelector(selectResults)
  const count = useAppSelector(selectCount)

  const [search, setSearch] = useState(searchTerm)

  const { register, formState, watch } = useForm<PageSizeForm>({
    resolver: zodResolver(PageSizeSchema),
    defaultValues: { pageSize: String(pageSize) },
  })

  useEffect(() => {
    dispatch(fetchTypes())
  }, [dispatch])

  useEffect(() => {
    const sub = watch(value => {
      if (value.pageSize) dispatch(setPageSize(Number(value.pageSize)))
    })
    return () => sub.unsubscribe()
  }, [watch, dispatch])

  const totalPages = Math.ceil(count / pageSize)
  const visiblePages = useMemo(() => buildVisiblePages(page, totalPages), [page, totalPages])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setSearchTerm(search.trim()))
  }

  const openDetailOffcanvas = (item: NamedApiResource) => {
    dispatch(selectType(item.name))
    openOffcanvas(<TypeDetail />, 'right', item.name, 'type-detail')
  }

  const openDeleteDialog = (item: NamedApiResource) => {
    openDialog(
      <TypeDelete name={item.name} onCancel={closeDialog} />,
      'Elimina Type',
      'type-delete'
    )
  }

  return (
    <section className="rdu-grid-main" id="types">
      <header id="header-types">
        <hgroup>
          <h2>Types</h2>
          <p>Esempio di CRUD con <strong>Redux Toolkit + Listener Middleware</strong>. Tutto lo stato (paginazione, risultati, selezione) è in Redux. I listener gestiscono le chiamate HTTP in modo reattivo, mantenendo i componenti privi di logica asincrona.</p>
        </hgroup>
        <RDU_Button type="button" variant="primary" text="create" icon={<IconPlus />} iconPosition="left" onClick={() => navigate('/crud/type/create')} />
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
            {results.length === 0 && (
              <tr><td colSpan={3}>Nessun tipo trovato.</td></tr>
            )}
            {results.map((item, index) => (
              <tr key={item.name}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <RDU_Button type="button" variant="primary" text="view" icon={<VisibilityIcon />} iconPosition="only"
                    onClick={() => openDetailOffcanvas(item)} />
                  <RDU_Button type="button" variant="primary" text="edit" icon={<EditIcon />} iconPosition="only"
                    onClick={() => navigate(`/crud/type/${item.name}`)} />
                  <RDU_Button type="button" variant="error" text="delete" icon={<DeleteIcon />} iconPosition="only"
                    onClick={() => openDeleteDialog(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption>{count} totali</figcaption>
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
          id="type-page-size"
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
