import type { EChartsCoreOption } from 'echarts/core'
import type { Options, SeriesAreaOptions } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { chartBase, GRID, legend, MUTED, tooltip } from '../../../shared/chart-compare/chart-theme.ts'

const AXES = ['Velocità', 'Affidabilità', 'Costo', 'Supporto', 'Sicurezza', 'Scalabilità']
const PRODUCTS = [
  { name: 'Prodotto A', value: [82, 90, 60, 75, 88, 70] },
  { name: 'Prodotto B', value: [65, 70, 90, 85, 60, 92] },
  { name: 'Prodotto C', value: [95, 55, 45, 60, 72, 80] }
]

const RADAR = {
  indicator: AXES.map(name => ({ name, max: 100 })),
  radius: '62%',
  center: ['50%', '54%'],
  axisName: { color: MUTED },
  splitLine: { lineStyle: { color: GRID } },
  splitArea: { show: false },
  axisLine: { lineStyle: { color: GRID } }
}

const polar = (series: SeriesAreaOptions[], extra: Options = {}): Options => ({
  chart: { polar: true, type: 'area' },
  pane: { size: '70%' },
  tooltip: { shared: true },
  xAxis: { categories: AXES, tickmarkPlacement: 'on', lineWidth: 0 },
  yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max: 100, tickInterval: 25, labels: { enabled: false } },
  series,
  ...extra
})

const SIMPLE_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  radar: RADAR,
  series: [{
    type: 'radar',
    areaStyle: { opacity: 0.2 },
    symbolSize: 6,
    data: PRODUCTS.slice(0, 1)
  }]
}

const COMPARE_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  legend: legend(),
  radar: RADAR,
  series: [{
    type: 'radar',
    areaStyle: { opacity: 0.15 },
    symbolSize: 6,
    data: PRODUCTS
  }]
}

const SIMPLE_HIGHCHARTS: Options = polar(
  PRODUCTS.slice(0, 1).map(p => ({ type: 'area' as const, name: p.name, pointPlacement: 'on' as const, fillOpacity: 0.2, marker: { radius: 3 }, data: p.value })),
  { legend: { enabled: false } }
)

const COMPARE_HIGHCHARTS: Options = polar(
  PRODUCTS.map(p => ({ type: 'area' as const, name: p.name, pointPlacement: 'on' as const, fillOpacity: 0.15, marker: { radius: 3 }, data: p.value }))
)

export function RadarChartExample() {
  return (
    <section id="ks-chart-radar">
      <h2>Radar chart</h2>
      <p>Profilo multi-dimensionale: più indicatori sulla stessa scala, utile per confrontare entità. Ogni grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Profilo singolo" echarts={SIMPLE_ECHARTS} highcharts={SIMPLE_HIGHCHARTS} />
      <ChartCompare heading="Confronto" echarts={COMPARE_ECHARTS} highcharts={COMPARE_HIGHCHARTS} />
    </section>
  )
}
