import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import './chat-knowledgebase.scss'
import {KBInformation} from '../models/knowledge-information.ts'
import {useTranslation} from "react-i18next";

export function RDU_ChatKnowledgeBase ({
  knowledgeBases,
  selectedKnowledgeBase,
  whenKnowledgeBaseAdd,
  whenKnowledgeBaseDelete,
  closeIcon
}: {
  knowledgeBases: KBInformation[],
  selectedKnowledgeBase: string[],
  whenKnowledgeBaseAdd: (kb: string) => void,
  whenKnowledgeBaseDelete: (kb: string) => void,
  closeIcon: ReactNode
}) {
  const { t } = useTranslation()

  const [filtersKnowledgeBase, setFiltersKnowledgeBase] = useState<KBInformation[]>([])
  const KnowledgeForm = z.object({
    'rdu-knowledge-base-select': z.string({ message: 'required' }),
  })
  type FormControl = z.infer<typeof KnowledgeForm>
  const {
    register,
    handleSubmit,
    watch
  } = useForm<FormControl>({
    mode: 'onChange',
    resolver: zodResolver(KnowledgeForm),
  })
  useEffect(() => {
    if (selectedKnowledgeBase.length) {
      setFiltersKnowledgeBase(
        knowledgeBases.filter(kb => !selectedKnowledgeBase.includes(kb.contextId))
      )
    } else {
      setFiltersKnowledgeBase(knowledgeBases)
    }
  }, [knowledgeBases, selectedKnowledgeBase])
  const onSubmit = (data: FormControl) => {
    whenKnowledgeBaseAdd(data['rdu-knowledge-base-select'])
  }
  const observeSelect = watch('rdu-knowledge-base-select')
  useEffect(() => {
    if (observeSelect) {
      whenKnowledgeBaseAdd(observeSelect)
    }
  }, [observeSelect])
  return (
    <form className={'rdu-chat-knowledge-base'}
          onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor={'rdu-knowledge-base-select'}>
          {t('rdu.chat-knowledge-base.label')}
        </label>
        <select id={'rdu-knowledge-base-select'}
                className={!selectedKnowledgeBase.length ? 'rdu-is-invalid' : ''}
                {...register('rdu-knowledge-base-select')}
        >
          <option value={undefined}></option>
          {
            filtersKnowledgeBase.map((k) => <option key={k.contextId} value={k.contextId}>
                {k.displayName}
              </option>
            )
          }
        </select>
        {
          !selectedKnowledgeBase.length && <div className={'rdu-invalid-feedback'}>
            {t('rdu.chat-knowledge-base.required')}
          </div>
        }
      </fieldset>
      <menu>
        {selectedKnowledgeBase.map((kb, i) => <li key={i}>
          <div className={'rdu-chat-knowledge-base-chips'}>
            {knowledgeBases.find(
              knowledgeBase => knowledgeBase.contextId === kb
            )?.displayName}
            <button type="button"
                    onClick={() => {whenKnowledgeBaseDelete(kb)}}>
              {closeIcon}
            </button>
          </div>
        </li>)}
      </menu>
    </form>
  )
}