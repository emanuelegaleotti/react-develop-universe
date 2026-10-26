import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_InputSearch } from '../../../../lib/components/inputs/input-search/InputSearch.tsx'
import { IconPlus } from '../../../shared/icons.tsx'

const SearchSchema = z.object({ search: z.string().optional() })
type SearchForm = z.infer<typeof SearchSchema>

interface CrudToolbarProps {
  createPath: string
  defaultSearch?: string
  onSearch: (term: string) => void
}

export function CrudToolbar({ createPath, defaultSearch = '', onSearch }: CrudToolbarProps) {
  const navigate = useNavigate()
  const { register, formState, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(SearchSchema),
    defaultValues: { search: defaultSearch },
  })

  const submit = handleSubmit(({ search }) => onSearch((search ?? '').trim()))

  return (
    <div className="ks-crud-toolbar">
      <form role="search" onSubmit={submit}>
        <RDU_InputSearch
          name="search"
          feature="crud"
          id="search"
          maxLength={100}
          autoComplete="none"
          register={register}
          formState={formState}
          schema={SearchSchema}
          errorMsg={false}
          successMsg={false}
          helpMsg={false}
        />
        <RDU_Button type="submit" variant="secondary" text="search" />
      </form>
      <RDU_Button type="button" variant="primary" text="create" icon={<IconPlus />} iconPosition="left"
        onClick={() => navigate(createPath)} />
    </div>
  )
}
