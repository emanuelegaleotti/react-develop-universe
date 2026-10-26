export type NavItem = { to: string, label: string }
export type NavGroup = { label: string, items: NavItem[] }

export const navGroups: NavGroup[] = [
  {
    label: 'Design',
    items: [
      { to: '/design/buttons', label: 'Buttons' },
      { to: '/design/dropdown', label: 'Dropdown' }
    ]
  },
  {
    label: 'Inputs',
    items: [
      { to: '/inputs/text', label: 'Input text' },
      { to: '/inputs/number', label: 'Input number' },
      { to: '/inputs/email', label: 'Input email' },
      { to: '/inputs/password', label: 'Input password' },
      { to: '/inputs/search', label: 'Input search' },
      { to: '/inputs/tel', label: 'Input tel' },
      { to: '/inputs/time', label: 'Input time' },
      { to: '/inputs/date', label: 'Input date' },
      { to: '/inputs/datetime-local', label: 'Input datetime' },
      { to: '/inputs/url', label: 'Input url' },
      { to: '/inputs/range', label: 'Input range' },
      { to: '/inputs/hidden', label: 'Input hidden' },
      { to: '/inputs/color', label: 'Input color' },
      { to: '/inputs/datalist', label: 'Input datalist' },
      { to: '/inputs/file', label: 'Input file' },
      { to: '/inputs/select', label: 'Select' },
      { to: '/inputs/select-object', label: 'Select object' },
      { to: '/inputs/textarea', label: 'Textarea' },
      { to: '/inputs/checkbox', label: 'Input checkbox' },
      { to: '/inputs/radio', label: 'Input radio' },
      { to: '/inputs/month', label: 'Input month' },
      { to: '/inputs/week', label: 'Input week' }
    ]
  },
  {
    label: 'Charts',
    items: [
      { to: '/charts/line', label: 'Line' },
      { to: '/charts/bar', label: 'Bar' },
      { to: '/charts/pie', label: 'Pie' },
      { to: '/charts/scatter', label: 'Scatter' },
      { to: '/charts/area', label: 'Area' },
      { to: '/charts/radar', label: 'Radar' },
      { to: '/charts/gauge', label: 'Gauge' },
      { to: '/charts/heatmap', label: 'Heatmap' },
      { to: '/charts/funnel', label: 'Funnel' },
      { to: '/charts/treemap', label: 'Treemap' },
      { to: '/charts/candlestick', label: 'Candlestick' },
      { to: '/charts/sankey', label: 'Sankey' }
    ]
  },
  {
    label: 'Utility',
    items: [
      { to: '/utility/intersection', label: 'Intersection' },
      { to: '/utility/notification', label: 'Notification' },
      { to: '/utility/loader', label: 'Loader' },
      { to: '/utility/carousel', label: 'Carousel' },
      { to: '/utility/picture', label: 'Picture' },
      { to: '/utility/pager', label: 'Pager' },
      { to: '/utility/card', label: 'Card' }
    ]
  },
  {
    label: 'Export',
    items: [
      { to: '/export/csv', label: 'CSV' },
      { to: '/export/pdf', label: 'PDF' }
    ]
  },
  {
    label: 'Chat',
    items: [
      { to: '/chat/chat', label: 'Chat' }
    ]
  },
  {
    label: 'Dialogs',
    items: [
      { to: '/dialogs/dialog', label: 'Dialog' },
      { to: '/dialogs/offcanvas', label: 'Offcanvas' },
      { to: '/dialogs/bottom-sheet', label: 'Bottom Sheet' },
      { to: '/dialogs/toast', label: 'Toast' },
      { to: '/dialogs/popover', label: 'Popover' },
      { to: '/dialogs/error', label: 'Error' }
    ]
  },
  {
    label: 'Crud',
    items: [
      { to: '/crud/pokemon', label: 'Pokémon' },
      { to: '/crud/pokemon-species', label: 'Pokémon Species' },
      { to: '/crud/type', label: 'Types' }
    ]
  }
]
