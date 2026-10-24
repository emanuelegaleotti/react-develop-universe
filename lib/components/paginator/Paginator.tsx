import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import './paginator.scss'

export interface RduPaginatorProps {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
  onPageChange: (page: number) => void
  ariaLabel?: string
  firstIcon?: ReactNode
  previousIcon?: ReactNode
  nextIcon?: ReactNode
  lastIcon?: ReactNode
}

function range(start: number, end: number): number[] {
  const pageNumbers: number[] = []

  for (let number = start; number <= end; number++) {
    pageNumbers.push(number)
  }

  return pageNumbers
}

function buildVisiblePages(
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number,
): number[] {
  const pageCount = Math.min(totalPages, maxVisiblePages)
  const visiblePagesBeforeCurrent = Math.floor(pageCount / 2)
  const centeredStartPage = currentPage - visiblePagesBeforeCurrent
  const lastPossibleStartPage = totalPages - pageCount + 1

  const startPage = Math.max(
      1,
      Math.min(centeredStartPage, lastPossibleStartPage),
  )

  const endPage = startPage + pageCount - 1

  return range(startPage, endPage)
}

export function RDU_Paginator({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
  ariaLabel,
  firstIcon,
  previousIcon,
  nextIcon,
  lastIcon,
}: RduPaginatorProps) {
  const { t } = useTranslation()

  if (totalPages < 1) return null

  const firstAriaLabel = t('rdu.paginator.first-page')
  const previousAriaLabel = t('rdu.button.prev')
  const nextAriaLabel = t('rdu.button.next')
  const lastAriaLabel = t('rdu.paginator.last-page')
  const visibleCurrentPage = Math.min(Math.max(1, currentPage), totalPages)
  const visiblePages = buildVisiblePages(
      visibleCurrentPage,
      totalPages,
      maxVisiblePages,
  )

  const changePage = (nextPage: number) => {
    if (
      nextPage === visibleCurrentPage ||
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return
    }

    onPageChange(nextPage)
  }

  return (
    <nav
      className="rdu-paginator"
      aria-label={ariaLabel ?? t('rdu.paginator.label')}
    >
      <ul className="rdu-paginator-list">
        {firstIcon ? (
          <li className="rdu-paginator-item">
            <button
              type="button"
              className="rdu-paginator-button"
              aria-label={firstAriaLabel}
              title={firstAriaLabel}
              disabled={visibleCurrentPage === 1}
              onClick={() => changePage(1)}
            >
              {firstIcon}
            </button>
          </li>
        ) : null}

        {previousIcon ? (
          <li className="rdu-paginator-item">
            <button
              type="button"
              className="rdu-paginator-button"
              aria-label={previousAriaLabel}
              title={previousAriaLabel}
              disabled={visibleCurrentPage === 1}
              onClick={() => changePage(visibleCurrentPage - 1)}
            >
              {previousIcon}
            </button>
          </li>
        ) : null}

        {visiblePages.map(page => (
          <li key={page} className="rdu-paginator-item">
            <button
              type="button"
              className="rdu-paginator-button"
              aria-current={page === visibleCurrentPage ? 'page' : undefined}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {nextIcon ? (
          <li className="rdu-paginator-item">
            <button
              type="button"
              className="rdu-paginator-button"
              aria-label={nextAriaLabel}
              title={nextAriaLabel}
              disabled={visibleCurrentPage === totalPages}
              onClick={() => changePage(visibleCurrentPage + 1)}
            >
              {nextIcon}
            </button>
          </li>
        ) : null}

        {lastIcon ? (
          <li className="rdu-paginator-item">
            <button
              type="button"
              className="rdu-paginator-button"
              aria-label={lastAriaLabel}
              title={lastAriaLabel}
              disabled={visibleCurrentPage === totalPages}
              onClick={() => changePage(totalPages)}
            >
              {lastIcon}
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}