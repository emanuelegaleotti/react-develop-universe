import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { chartBase, legend, tooltip } from '../../../shared/chart-compare/chart-theme.ts'

const DATA = [
  { value: 335, name: 'Prodotto A' },
  { value: 234, name: 'Prodotto B' },
  { value: 154, name: 'Prodotto C' },
  { value: 110, name: 'Prodotto D' }
]

const PIE_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  legend: legend({ top: 'bottom' }),
  series: [{ name: 'Vendite', type: 'pie', radius: '58%', center: ['50%', '45%'], itemStyle: { borderColor: '#fff', borderWidth: 2 }, label: { overflow: 'none' }, data: DATA }]
}

const DONUT_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  legend: legend({ top: 'bottom' }),
  series: [{
    name: 'Vendite',
    type: 'pie',
    radius: ['45%', '70%'],
    center: ['50%', '45%'],
    itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 18, fontWeight: 600 } },
    data: DATA
  }]
}

const ROSE_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  legend: legend({ top: 'bottom' }),
  series: [{
    name: 'Vendite',
    type: 'pie',
    roseType: 'radius',
    radius: ['15%', '50%'],
    center: ['50%', '45%'],
    itemStyle: { borderRadius: 6 },
    label: { overflow: 'none' },
    data: DATA
  }]
}

const PIE_HIGHCHARTS: Options = {
  legend: { align: 'center', verticalAlign: 'bottom' },
  plotOptions: { pie: { showInLegend: true, size: '70%', borderColor: '#fff', borderWidth: 2, dataLabels: { enabled: false } } },
  series: [{ type: 'pie', name: 'Vendite', data: DATA.map(d => ({ name: d.name, y: d.value })) }]
}

const DONUT_HIGHCHARTS: Options = {
  legend: { align: 'center', verticalAlign: 'bottom' },
  plotOptions: { pie: { showInLegend: true, size: '75%', innerSize: '64%', borderRadius: 8, borderColor: '#fff', borderWidth: 2, dataLabels: { enabled: false } } },
  series: [{ type: 'pie', name: 'Vendite', data: DATA.map(d => ({ name: d.name, y: d.value })) }]
}

// Highcharts has no rose type: a variable-radius pie, with radius and angle both driven by the value, is the equivalent
const ROSE_HIGHCHARTS: Options = {
  legend: { align: 'center', verticalAlign: 'bottom' },
  tooltip: { pointFormat: '{point.name}: <b>{point.z}</b>' },
  series: [{
    type: 'variablepie',
    name: 'Vendite',
    innerSize: '20%',
    zMin: 0,
    sizeBy: 'radius',
    showInLegend: true,
    borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 2,
    dataLabels: { enabled: false },
    data: DATA.map(d => ({ name: d.name, y: d.value, z: d.value }))
  }]
}

export function PieChartExample() {
  return (
    <section id="ks-chart-pie">
      <h2>Pie chart</h2>
      <p>Proporzioni di un totale: torta classica, ciambella e grafico a rosa. Ogni grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Torta" echarts={PIE_ECHARTS} highcharts={PIE_HIGHCHARTS} />
      <ChartCompare heading="Ciambella" echarts={DONUT_ECHARTS} highcharts={DONUT_HIGHCHARTS} />
      <ChartCompare heading="Rosa dei venti" echarts={ROSE_ECHARTS} highcharts={ROSE_HIGHCHARTS} />
    </section>
  )
}
