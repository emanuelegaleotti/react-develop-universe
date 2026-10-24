import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'
import { RDU_Paginator } from '../../../lib/components/paginator/Paginator.tsx'
import './paginator.scss'

const TOTAL_PAGES = 10
const FIRST_ICON = <FaAngleDoubleLeft aria-hidden="true"/>
const PREVIOUS_ICON = <FaAngleLeft aria-hidden="true"/>
const NEXT_ICON = <FaAngleRight aria-hidden="true"/>
const LAST_ICON = <FaAngleDoubleRight aria-hidden="true"/>

export function Paginator() {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <section className="ks-grid-main" id="ks-paginator">
      <h2>{t('navigation.paginator')}</h2>
      <p aria-live="polite">
        {t('rdu.paginator.status', { currentPage, totalPages: TOTAL_PAGES })}
      </p>
      <RDU_Paginator
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        maxVisiblePages={5}
        onPageChange={setCurrentPage}
        firstIcon={FIRST_ICON}
        previousIcon={PREVIOUS_ICON}
        nextIcon={NEXT_ICON}
        lastIcon={LAST_ICON}
      />
    </section>
  )
}