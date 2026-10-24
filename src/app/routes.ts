import { createBrowserRouter } from 'react-router'
import App from './app.tsx'


import {Pager} from "../features/pager";
import { ChatAi } from '../features/chats/chat-ai'
import { AreaChartExample } from '../features/charts/area'
import { BarChartExample } from '../features/charts/bar'
import { LineChartExample } from '../features/charts/line'
import { PieChartExample } from '../features/charts/pie'
import { ScatterChartExample } from '../features/charts/scatter'
import { Buttons } from '../features/design/buttons'
import { ErrorDialog } from '../features/dialogs/error'
import { Offcanvas } from '../features/dialogs/offcanvas'
import { InputCheckbox } from '../features/inputs/input-checkbox'
import { InputColor } from '../features/inputs/input-color'
import { InputDataList } from '../features/inputs/input-datalist'
import { InputDate } from '../features/inputs/input-date'
import { InputDatetimeLocal } from '../features/inputs/input-datetime-local'
import { InputEmail } from '../features/inputs/input-email'
import { InputFile } from '../features/inputs/input-file'
import { InputHidden } from '../features/inputs/input-hidden'
import { InputMonth } from '../features/inputs/input-month'
import { InputNumber } from '../features/inputs/input-number'
import { InputPassword } from '../features/inputs/input-password'
import { InputRadio } from '../features/inputs/input-radio'
import { InputRange } from '../features/inputs/input-range'
import { InputSearch } from '../features/inputs/input-search'
import { InputTel } from '../features/inputs/input-tel'
import { InputText } from '../features/inputs/input-text'
import { InputTime } from '../features/inputs/input-time'
import { InputUrl } from '../features/inputs/input-url'
import { InputWeek } from '../features/inputs/input-week'
import { Select } from '../features/inputs/select'
import { SelectObject } from '../features/inputs/select-object'
import { Textarea } from '../features/inputs/textarea'
import { NotAllowed } from '../features/not-allowed/not-allowed.tsx'
import { NotFound } from '../features/not-found/not-found.tsx'
import { Paginator } from '../features/paginator'

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '404',
        Component: NotFound
      },
      {
        path: '403',
        Component: NotAllowed
      },
      {
        path: 'paginator',
        Component: Paginator
      },
      {
        path: 'inputs',
        children: [
          {
            path: 'text',
            Component: InputText
          },
          {
            path: 'number',
            Component: InputNumber
          },
          {
            path: 'checkbox',
            Component: InputCheckbox
          },
          {
            path: 'radio',
            Component: InputRadio
          },
          {
            path: 'datalist',
            Component: InputDataList
          },
          {
            path: 'email',
            Component: InputEmail
          },
          {
            path: 'password',
            Component: InputPassword
          },
          {
            path: 'search',
            Component: InputSearch
          },
          {
            path: 'tel',
            Component: InputTel
          },
          {
            path: 'url',
            Component: InputUrl
          },
          {
            path: 'time',
            Component: InputTime
          },
          {
            path: 'date',
            Component: InputDate
          },
          {
            path: 'datetime-local',
            Component: InputDatetimeLocal
          },
          {
            path: 'color',
            Component: InputColor
          },
          {
            path: 'range',
            Component: InputRange
          },
          {
            path: 'hidden',
            Component: InputHidden
          },
          {
            path: 'textarea',
            Component: Textarea
          },
          {
            path: 'select',
            Component: Select
          },
          {
            path: 'select-object',
            Component: SelectObject
          },
          {
            path: 'file',
            Component: InputFile
          },
          {
            path: 'month',
            Component: InputMonth
          },
          {
            path: 'week',
            Component: InputWeek
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: 'chat-ai',
            Component: ChatAi
          }
        ]
      },
      {
        path: 'design',
        children: [
          {
            path: 'buttons',
            Component: Buttons
          }
        ]
      },
      {
        path: 'dialogs',
        children: [
          {
            path: 'offcanvas',
            Component: Offcanvas
          },
          {
            path: 'error',
            Component: ErrorDialog
          },
            {
                path: 'pager',
                Component: Pager
            }
        ]
      },
      {
        path: 'crud',
        children: [
          {
            path: 'pokemon',
            lazy: async () => ({
              Component: (await import('../features/crud/pokemon/pokemon-list')).PokemonList
            })
          },
          {
            path: 'pokemon/:name',
            lazy: async () => ({
              Component: (await import('../features/crud/pokemon/pokemon-edit')).PokemonEdit
            })
          },
          {
            path: 'pokemon-species',
            lazy: async () => ({
              Component: (await import('../features/crud/pokemon-species/pokemon-species-list')).PokemonSpeciesList
            })
          },
          {
            path: 'pokemon-species/:name',
            lazy: async () => ({
              Component: (await import('../features/crud/pokemon-species/pokemon-species-edit')).PokemonSpeciesEdit
            })
          },
          {
            path: 'type',
            lazy: async () => ({
              Component: (await import('../features/crud/type/type-list')).TypeList
            })
          },
          {
            path: 'type/:name',
            lazy: async () => ({
              Component: (await import('../features/crud/type/type-edit')).TypeEdit
            })
          }
        ]
      },
      {
        path: 'charts',
        children: [
          {
            path: 'bar',
            Component: BarChartExample
          },
          {
            path: 'line',
            Component: LineChartExample
          },
          {
            path: 'pie',
            Component: PieChartExample
          },
          {
            path: 'scatter',
            Component: ScatterChartExample
          },
          {
            path: 'area',
            Component: AreaChartExample
          }
        ]
      }
    ]
  }
])
