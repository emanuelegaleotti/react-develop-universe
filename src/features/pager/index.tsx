import "./pager.scss"
import {RDU_PagerComponent} from "../../../lib/components/pager/Pager.tsx";
import {ChevronLeft, ChevronRight, FirstPage, LastPage} from "../../shared/icons.tsx";
import {useState} from "react";

type ContentItemPagerComponent = {
  id: number,
  content: string
}

const contentPagerComponent: ContentItemPagerComponent[] = [
  {id: 1, content: 'Content 1'}, {id: 2, content: 'Content 2'}, {id: 3, content: 'Content 3'},
  {id: 4, content: 'Content 4'}, {id: 5, content: 'Content 5'}, {id: 6, content: 'Content 6'},
  {id: 7, content: 'Content 7'}, {id: 8, content: 'Content 8'}, {id: 9, content: 'Content 9'},
  {id: 10, content: 'Content 10'}, {id: 11, content: 'Content 11'}, {id: 12, content: 'Content 12'},
  {id: 13, content: 'Content 13'}, {id: 14, content: 'Content 14'}, {id: 15, content: 'Content 15'},
  {id: 16, content: 'Content 16'}, {id: 17, content: 'Content 17'}, {id: 18, content: 'Content 18'},
  {id: 19, content: 'Content 19'}, {id: 20, content: 'Content 20'}, {id: 21, content: 'Content 21'},
  {id: 22, content: 'Content 22'}, {id: 23, content: 'Content 23'}, {id: 24, content: 'Content 24'},
  {id: 25, content: 'Content 25'}, {id: 26, content: 'Content 26'}, {id: 27, content: 'Content 27'},
  {id: 28, content: 'Content 28'}, {id: 29, content: 'Content 29'}, {id: 30, content: 'Content 30'},
  {id: 31, content: 'Content 31'}, {id: 32, content: 'Content 32'}, {id: 33, content: 'Content 33'},
  {id: 34, content: 'Content 34'}, {id: 35, content: 'Content 35'}, {id: 36, content: 'Content 36'},
  {id: 37, content: 'Content 37'}, {id: 38, content: 'Content 38'}, {id: 39, content: 'Content 39'},
  {id: 40, content: 'Content 40'}, {id: 41, content: 'Content 41'}, {id: 42, content: 'Content 42'},
]

const PAGE_SIZE = 15

export function Pager() {
  const [page, setPage] = useState(1)
  const results = contentPagerComponent.filter(f => f.id > (page - 1) * PAGE_SIZE && f.id <= PAGE_SIZE * page)

  return (
    <section id="ks-pager">
      <h2>Pager</h2>
      <p>Paginazione client-side con <code>RDU_PagerComponent</code>: indice, dimensione e totale.</p>
      <article>
      <table className="rdu-table">
        <thead>
        <tr>
          <th>id</th>
          <th>Content</th>
        </tr>
        </thead>
        <tbody>
        { results.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.content}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <RDU_PagerComponent
        pageIndex={page}
        pageSize={PAGE_SIZE}
        totalItems={contentPagerComponent.length}
        whenPageSelected={setPage}
        prevPage={<ChevronLeft />}
        nextPage={<ChevronRight />}
        firstPage={<FirstPage />}
        lastPage={<LastPage />}/>
      </article>
    </section>
  )
}