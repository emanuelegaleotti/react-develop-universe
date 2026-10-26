import Highcharts from 'highcharts/esm/highcharts.js'
import 'highcharts/esm/highcharts-more.js'
import 'highcharts/esm/modules/solid-gauge.js'
import 'highcharts/esm/modules/variable-pie.js'
import 'highcharts/esm/modules/funnel.js'
import 'highcharts/esm/modules/heatmap.js'
import 'highcharts/esm/modules/treemap.js'
import 'highcharts/esm/modules/sankey.js'
import 'highcharts/esm/modules/stock.js'
import type { Options } from 'highcharts'
import { AXIS, CHART_COLORS, FONT_FAMILY, GRID, MUTED, TEXT } from './chart-theme.ts'

// Global Highcharts options: the same palette, fonts and surfaces used for ECharts
const highchartsTheme: Options = {
  colors: CHART_COLORS,
  chart: { backgroundColor: 'transparent', style: { fontFamily: FONT_FAMILY }, spacingTop: 16, spacingRight: 16 },
  title: { text: undefined },
  credits: { enabled: false },
  legend: { alignColumns: false, itemStyle: { color: MUTED, fontWeight: '400' }, symbolHeight: 10, symbolWidth: 10, symbolRadius: 5 },
  tooltip: {
    backgroundColor: '#fff',
    borderColor: GRID,
    borderRadius: 8,
    style: { color: TEXT, fontSize: '13px' }
  },
  xAxis: {
    lineColor: AXIS,
    tickLength: 0,
    labels: { style: { color: MUTED } }
  },
  yAxis: {
    title: { text: undefined },
    gridLineColor: GRID,
    gridLineDashStyle: 'Dash',
    labels: { style: { color: MUTED } }
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      marker: { symbol: 'circle' },
      dataLabels: { style: { fontWeight: '500', textOutline: 'none' } }
    }
  }
}

Highcharts.setOptions(highchartsTheme)

export { Highcharts }
