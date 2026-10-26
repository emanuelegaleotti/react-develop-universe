import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_PagerComponent } from '../../../../lib/components/pager/Pager.tsx'
import { RDU_Select } from '../../../../lib/components/inputs/select/Select.tsx'
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '../../../shared/icons.tsx'

const PAGE_SIZE_OPTIONS = ['10', '15', '20', '25']

const PageSizeSchema = z.object({ pageSize: z.string().optional() })
type PageSizeForm = z.infer<typeof PageSizeSchema>

interface CrudFooterProps {
  count: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function CrudFooter({ count, page, pageSize, onPageChange, onPageSizeChange }: CrudFooterProps) {
  const { t } = useTranslation()
  const { register, formState, watch } = useForm<PageSizeForm>({
    resolver: zodResolver(PageSizeSchema),
    defaultValues: { pageSize: String(pageSize) },
  })

  useEffect(() => {
    const subscription = watch(({ pageSize: value }) => {
      if (value) onPageSizeChange(Number(value))
    })
    return () => subscription.unsubscribe()
  }, [watch, onPageSizeChange])

  return (
    <div className="ks-crud-footer">
      <span>{t('crud.total', { count })}</span>
      <RDU_PagerComponent
        pageIndex={page}
        pageSize={pageSize}
        totalItems={count}
        whenPageSelected={onPageChange}
        firstPage={<FirstPage />}
        prevPage={<ChevronLeft />}
        nextPage={<ChevronRight />}
        lastPage={<LastPage />}
      />
      <form>
        <RDU_Select
          name="pageSize"
          feature="crud"
          id="pageSize"
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
    </div>
  )
}
