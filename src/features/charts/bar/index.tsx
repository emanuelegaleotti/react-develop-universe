import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { categoryAxis, chartBase, gridBox, legend, tooltip, valueAxis, WEEK_DAYS } from '../../../shared/chart-compare/chart-theme.ts'

const WEEKLY = [120, 200, 150, 80, 70, 110, 130]
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']
const YEARS = [
  { name: '2024', data: [320, 332, 301, 334] },
  { name: '2025', data: [220, 182, 191, 234] },
  { name: '2026', data: [150, 232, 201, 154] }
]
const PLATFORMS = ['Web', 'Mobile', 'Desktop', 'Tablet']
const PLANS = [
  { name: 'Gratuiti', data: [320, 302, 301, 134] },
  { name: 'Pro', data: [120, 132, 101, 90] },
  { name: 'Enterprise', data: [220, 182, 191, 60] }
]

const SIMPLE_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis', { axisPointer: { type: 'shadow' } }),
  grid: gridBox,
  xAxis: categoryAxis(WEEK_DAYS),
  yAxis: valueAxis(),
  series: [{ name: 'Vendite', type: 'bar', barMaxWidth: 36, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: WEEKLY }]
}

const GROUPED_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis', { axisPointer: { type: 'shadow' } }),
  legend: legend(),
  grid: gridBox,
  xAxis: categoryAxis(QUARTERS),
  yAxis: valueAxis(),
  series: YEARS.map(y => ({ name: y.name, type: 'bar', barMaxWidth: 28, itemStyle: { borderRadius: [6, 6, 0, 0] }, data: y.data }))
}

const STACKED_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis', { axisPointer: { type: 'shadow' } }),
  legend: legend(),
  grid: gridBox,
  xAxis: valueAxis(),
  yAxis: categoryAxis(PLATFORMS, { inverse: true }),
  series: PLANS.map(p => ({ name: p.name, type: 'bar', stack: 'utenti', barMaxWidth: 28, data: p.data }))
}

const SIMPLE_HIGHCHARTS: Options = {
  chart: { type: 'column' },
  legend: { enabled: false },
  tooltip: { shared: true },
  xAxis: { categories: WEEK_DAYS },
  series: [{ type: 'column', name: 'Vendite', maxPointWidth: 36, borderRadius: 6, data: WEEKLY }]
}

const GROUPED_HIGHCHARTS: Options = {
  chart: { type: 'column' },
  tooltip: { shared: true },
  xAxis: { categories: QUARTERS },
  plotOptions: { column: { maxPointWidth: 28, borderRadius: 6 } },
  series: YEARS.map(y => ({ type: 'column' as const, name: y.name, data: y.data }))
}

const STACKED_HIGHCHARTS: Options = {
  chart: { type: 'bar' },
  tooltip: { shared: true },
  xAxis: { categories: PLATFORMS },
  yAxis: { reversedStacks: false },
  plotOptions: { bar: { stacking: 'normal', maxPointWidth: 28 } },
  series: PLANS.map(p => ({ type: 'bar' as const, name: p.name, data: p.data }))
}

export function BarChartExample() {
  return (
    <section id="ks-chart-bar">
      <h2>Bar chart</h2>
      <p>Confronto tra categorie: barre singole, raggruppate e impilate (orizzontali). Ogni grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Vendite settimanali" echarts={SIMPLE_ECHARTS} highcharts={SIMPLE_HIGHCHARTS} />
      <ChartCompare heading="Barre raggruppate" echarts={GROUPED_ECHARTS} highcharts={GROUPED_HIGHCHARTS} />
      <ChartCompare heading="Barre impilate" echarts={STACKED_ECHARTS} highcharts={STACKED_HIGHCHARTS} />
    </section>
  )
}
