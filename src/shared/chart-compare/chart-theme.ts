import type { EChartsCoreOption } from 'echarts/core'

// react.dev palette, shared by ECharts and Highcharts
export const CHART_COLORS = ['#087ea4', '#575fb7', '#db7d27', '#388f7f', '#c1554d', '#149eca', '#99a1b3']

export const TEXT = '#23272f'
export const MUTED = '#5e687e'
export const GRID = '#ebecf0'
export const AXIS = '#bcc1cd'
export const FONT_FAMILY = '-apple-system, ui-sans-serif, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

export const chartBase: EChartsCoreOption = {
  color: CHART_COLORS,
  backgroundColor: 'transparent',
  textStyle: { fontFamily: FONT_FAMILY, color: TEXT }
}

export const tooltip = (trigger: 'axis' | 'item' = 'item', extra: Record<string, unknown> = {}) => ({
  trigger,
  backgroundColor: '#fff',
  borderColor: GRID,
  borderWidth: 1,
  textStyle: { color: TEXT, fontSize: 13 },
  extraCssText: 'box-shadow: 0 8px 24px rgb(35 39 47 / 12%); border-radius: 8px;',
  ...extra
})

export const legend = (extra: Record<string, unknown> = {}) => ({
  top: 0,
  icon: 'circle',
  itemWidth: 10,
  itemHeight: 10,
  textStyle: { color: MUTED },
  ...extra
})

export const valueAxis = (extra: Record<string, unknown> = {}) => ({
  type: 'value' as const,
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: MUTED },
  splitLine: { lineStyle: { color: GRID, type: 'dashed' as const } },
  ...extra
})

export const categoryAxis = (data: (string | number)[], extra: Record<string, unknown> = {}) => ({
  type: 'category' as const,
  data,
  axisLine: { lineStyle: { color: AXIS } },
  axisTick: { show: false },
  axisLabel: { color: MUTED },
  ...extra
})

export const gridBox = { top: 48, left: 16, right: 24, bottom: 16, containLabel: true }

export const WEEK_DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
export const MONTHS = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
