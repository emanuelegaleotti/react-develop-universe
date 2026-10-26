import './pager.scss'
import {ReactNode} from "react";
import {RDU_Button} from "../buttons/button/Button.tsx";

interface RduPagerProps {
  pageIndex: number
  pageSize: number
  totalItems: number
  whenPageSelected: (pageNumber: number) => void,
  prevPage: ReactNode,
  nextPage: ReactNode,
  firstPage: ReactNode,
  lastPage: ReactNode,
}

export function RDU_PagerComponent({
  pageIndex,
  pageSize,
  totalItems,
  whenPageSelected,
  prevPage,
  nextPage,
  firstPage,
  lastPage
}: RduPagerProps) {
  const currentPage = pageIndex

  const pagesLength = (() => {
    const total = totalItems
    const size = pageSize
    if (!total || !size) return 0
    return total % size ? Math.floor(total / size) + 1 : total/size
  })

  const pages = () => {
    const length = pagesLength()
    const current = currentPage

    if (length <= 5) {
      return Array(length).fill(null).map((_, i) => i + 1)
    }

    const result = []
    let ignoredIndex = 0
    for (let i = current - 2; i <= current + 2; i++) {
      if (i > 0 && i <= length) {
        result.push(i)
      } else {
        ignoredIndex++
      }
    }
    for (let i = 1; i <= ignoredIndex; i++) {
      if (current > 2) {
        result.unshift(current - 2 - i)
      } else {
        result.push(current + 2 + i)
      }
    }
    return result
  }

  const setPage = (page: number) => {
    whenPageSelected(page)
  }

  const lastPageIndex = pagesLength()

  return (
    <nav className="rdu-pager" aria-label="pagination">
      <RDU_Button id={"firstPage"} text={"firstPage"} type={"button"} onClick={() => setPage(1)} disabled={currentPage <= 1} variant={"primary"} icon={firstPage} iconPosition={'only'}/>
      <RDU_Button id={"prevPage"} text={"prevPage"} type={"button"} onClick={() => setPage(currentPage-1)} disabled={currentPage <= 1} variant={"primary"} icon={prevPage} iconPosition={'only'}/>
      <ul className="pagination">
        { pages().map((page) => (
            <li key={page} className={`${page === currentPage ? 'active' : ''}`}>
              <button type="button" aria-current={page === currentPage ? 'page' : undefined} onClick={() => setPage(page)}>{ page }</button>
            </li>
        ))}
      </ul>
      <RDU_Button id={"nextPage"} text={"nextPage"} type={"button"} onClick={() => setPage(currentPage+1)} disabled={currentPage >= lastPageIndex} variant={"primary"} icon={nextPage} iconPosition={'only'}/>
      <RDU_Button id={"lastPage"} text={"lastPage"} type={"button"} onClick={() => setPage(lastPageIndex)} disabled={currentPage >= lastPageIndex} variant={"primary"} icon={lastPage} iconPosition={'only'}/>
    </nav>
  )
}