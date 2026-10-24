import { ReactNode } from 'react'
import './chip.scss'
import {useTranslation} from "react-i18next";

interface RduChipProps {
  withAction?: boolean;
  actionIcon?: ReactNode;
  whenActionClick?: () => void;
  textAction?: string;
  text: string;
}

export function RDU_Chips ({
  withAction,
  actionIcon,
  whenActionClick,
  text,
  textAction
}: RduChipProps) {
  const { t } = useTranslation()

  return (
    <div className={'rdu-chips'}>
      {text}
      {
        withAction && <button type={'button'}
                              className={'rdu-chips-action'}
                              title={t(`chip.action.${textAction}`)}
                              onClick={whenActionClick}>
          {actionIcon}
        </button>
      }
    </div>
  )
}
