import { createBrowserRouter } from 'react-router'
import App from './app.tsx'
import { crudRoutes } from './crud.routes.ts'

import { Home } from '../features/home'
import { Pager } from '../features/pager'
import { Chat } from '../features/chats/chat'
import { Buttons } from '../features/design/buttons'
import { ErrorDialog } from '../features/dialogs/error'
import { Dialog } from '../features/dialogs/dialog'
import { Offcanvas } from '../features/dialogs/offcanvas'
import { NotAllowed } from '../features/not-allowed/not-allowed.tsx'
import { NotFound } from '../features/not-found/not-found.tsx'
import { InputText } from '../features/inputs/input-text'
import { InputNumber } from '../features/inputs/input-number'
import { InputCheckbox } from '../features/inputs/input-checkbox'
import { InputRadio } from '../features/inputs/input-radio'
import { InputDataList } from '../features/inputs/input-datalist'
import { InputEmail } from '../features/inputs/input-email'
import { InputPassword } from '../features/inputs/input-password'
import { InputSearch } from '../features/inputs/input-search'
import { InputTel } from '../features/inputs/input-tel'
import { InputUrl } from '../features/inputs/input-url'
import { InputTime } from '../features/inputs/input-time'
import { InputDate } from '../features/inputs/input-date'
import { InputDatetimeLocal } from '../features/inputs/input-datetime-local'
import { InputColor } from '../features/inputs/input-color'
import { InputRange } from '../features/inputs/input-range'
import { InputHidden } from '../features/inputs/input-hidden'
import { Textarea } from '../features/inputs/textarea'
import { Select } from '../features/inputs/select'
import { SelectObject } from '../features/inputs/select-object'
import { InputFile } from '../features/inputs/input-file'
import { InputMonth } from '../features/inputs/input-month'
import { InputWeek } from '../features/inputs/input-week'

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: '404', Component: NotFound },
      { path: '403', Component: NotAllowed },
      {
        path: 'design',
        children: [
          { path: 'buttons', Component: Buttons },
          { path: 'dropdown', lazy: async () => ({ Component: (await import('../features/design/dropdown')).DropdownPage }) }
        ]
      },
      {
        path: 'inputs',
        children: [
          { path: 'text', Component: InputText },
          { path: 'number', Component: InputNumber },
          { path: 'checkbox', Component: InputCheckbox },
          { path: 'radio', Component: InputRadio },
          { path: 'datalist', Component: InputDataList },
          { path: 'email', Component: InputEmail },
          { path: 'password', Component: InputPassword },
          { path: 'search', Component: InputSearch },
          { path: 'tel', Component: InputTel },
          { path: 'url', Component: InputUrl },
          { path: 'time', Component: InputTime },
          { path: 'date', Component: InputDate },
          { path: 'datetime-local', Component: InputDatetimeLocal },
          { path: 'color', Component: InputColor },
          { path: 'range', Component: InputRange },
          { path: 'hidden', Component: InputHidden },
          { path: 'textarea', Component: Textarea },
          { path: 'select', Component: Select },
          { path: 'select-object', Component: SelectObject },
          { path: 'file', Component: InputFile },
          { path: 'month', Component: InputMonth },
          { path: 'week', Component: InputWeek }
        ]
      },
      {
        path: 'charts',
        children: [
          { path: 'line', lazy: async () => ({ Component: (await import('../features/charts/line')).LineChartExample }) },
          { path: 'bar', lazy: async () => ({ Component: (await import('../features/charts/bar')).BarChartExample }) },
          { path: 'pie', lazy: async () => ({ Component: (await import('../features/charts/pie')).PieChartExample }) },
          { path: 'scatter', lazy: async () => ({ Component: (await import('../features/charts/scatter')).ScatterChartExample }) },
          { path: 'area', lazy: async () => ({ Component: (await import('../features/charts/area')).AreaChartExample }) },
          { path: 'radar', lazy: async () => ({ Component: (await import('../features/charts/radar')).RadarChartExample }) },
          { path: 'gauge', lazy: async () => ({ Component: (await import('../features/charts/gauge')).GaugeChartExample }) },
          { path: 'heatmap', lazy: async () => ({ Component: (await import('../features/charts/heatmap')).HeatmapChartExample }) },
          { path: 'funnel', lazy: async () => ({ Component: (await import('../features/charts/funnel')).FunnelChartExample }) },
          { path: 'treemap', lazy: async () => ({ Component: (await import('../features/charts/treemap')).TreemapChartExample }) },
          { path: 'candlestick', lazy: async () => ({ Component: (await import('../features/charts/candlestick')).CandlestickChartExample }) },
          { path: 'sankey', lazy: async () => ({ Component: (await import('../features/charts/sankey')).SankeyChartExample }) }
        ]
      },
      {
        path: 'utility',
        children: [
          { path: 'intersection', lazy: async () => ({ Component: (await import('../features/utility/intersection')).IntersectionPage }) },
          { path: 'notification', lazy: async () => ({ Component: (await import('../features/utility/notification')).NotificationPage }) },
          { path: 'loader', lazy: async () => ({ Component: (await import('../features/utility/loader')).LoaderPage }) },
          { path: 'carousel', lazy: async () => ({ Component: (await import('../features/utility/carousel')).CarouselPage }) },
          { path: 'picture', lazy: async () => ({ Component: (await import('../features/utility/picture')).PicturePage }) },
          { path: 'pager', Component: Pager },
          { path: 'card', lazy: async () => ({ Component: (await import('../features/utility/card')).CardPage }) }
        ]
      },
      {
        path: 'export',
        children: [
          { path: 'csv', lazy: async () => ({ Component: (await import('../features/export/csv')).CsvPage }) },
          { path: 'pdf', lazy: async () => ({ Component: (await import('../features/export/pdf')).PdfPage }) }
        ]
      },
      {
        path: 'chat',
        children: [
          { path: 'chat', Component: Chat }
        ]
      },
      {
        path: 'dialogs',
        children: [
          { path: 'dialog', Component: Dialog },
          { path: 'offcanvas', Component: Offcanvas },
          { path: 'bottom-sheet', lazy: async () => ({ Component: (await import('../features/dialogs/bottom-sheet')).BottomSheetPage }) },
          { path: 'toast', lazy: async () => ({ Component: (await import('../features/dialogs/toast')).ToastPage }) },
          { path: 'popover', lazy: async () => ({ Component: (await import('../features/dialogs/popover')).PopoverPage }) },
          { path: 'error', Component: ErrorDialog }
        ]
      },
      {
        path: 'crud',
        children: crudRoutes
      }
    ]
  }
])
