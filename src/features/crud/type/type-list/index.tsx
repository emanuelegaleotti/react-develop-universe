import './type-list.scss'

import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDialog } from '../../../../../lib/components/dialogs/dialog/DialogContext.tsx'
import { useOffcanvas } from '../../../../../lib/components/dialogs/offcanvas/OffcanvasContext.tsx'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts'
import { CrudFooter } from '../../shared/crud-footer.tsx'
import { CrudRowActions } from '../../shared/crud-row-actions.tsx'
import { CrudToolbar } from '../../shared/crud-toolbar.tsx'
import { TypeDelete } from '../type-delete'
import { TypeDetail } from '../type-detail'
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

  useEffect(() => { dispatch(fetchTypes()) }, [dispatch])

  const onSearch = useCallback((term: string) => { dispatch(setSearchTerm(term)) }, [dispatch])
  const onPageChange = useCallback((value: number) => { dispatch(setPage(value)) }, [dispatch])
  const onPageSizeChange = useCallback((value: number) => { dispatch(setPageSize(value)) }, [dispatch])

  const onView = (name: string) => {
    dispatch(selectType(name))
    openOffcanvas(<TypeDetail />, 'right', name, 'type-detail-offcanvas')
  }

  const onDelete = (name: string) => {
    openDialog(
      <TypeDelete name={name} onDeleted={closeDialog} onCancel={closeDialog} />,
      'Elimina tipo',
      'type-delete-dialog'
    )
  }

  return (
    <section id="ks-type-list">
      <h2>Tipi</h2>
      <p>
        CRUD con stato gestito tramite <strong>Redux Toolkit</strong> e <strong>Listener Middleware</strong>: lo slice
        contiene pagina, ricerca e risultati, mentre le chiamate asincrone sono orchestrate dai listener.
      </p>

      <div className="ks-crud-card">
        <CrudToolbar createPath="/crud/type/create" defaultSearch={searchTerm} onSearch={onSearch} />

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
              {count === 0 && (
                <tr>
                  <td colSpan={3} className="ks-crud-empty">Nessun tipo trovato.</td>
                </tr>
              )}
              {results.map((item, index) => (
                <tr key={item.name}>
                  <td className="ks-crud-index">{index + 1 + (page - 1) * pageSize}</td>
                  <td className="ks-crud-name">{item.name}</td>
                  <td className="ks-crud-cell-actions">
                    <CrudRowActions
                      onView={() => onView(item.name)}
                      onEdit={() => navigate(`/crud/type/${item.name}`)}
                      onDelete={() => onDelete(item.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CrudFooter
          count={count}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </section>
  )
}
