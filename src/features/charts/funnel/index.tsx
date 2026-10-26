import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { AXIS, chartBase, legend, TEXT, tooltip } from '../../../shared/chart-compare/chart-theme.ts'

const STEPS = [
  { value: 100, name: 'Visite' },
  { value: 72, name: 'Registrazioni' },
  { value: 48, name: 'Prova gratuita' },
  { value: 26, name: 'Abbonamenti' },
  { value: 12, name: 'Rinnovi' }
]

const HIGHCHARTS_STEPS = STEPS.map(s => ({ name: s.name, y: s.value }))

const simpleChartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item', { formatter: '{b}: {c}%' }),
  legend: legend(),
  series: [{
    type: 'funnel',
    top: 48,
    bottom: 16,
    left: '10%',
    width: '80%',
    min: 0,
    max: 100,
    sort: 'descending',
    gap: 4,
    itemStyle: { borderColor: '#fff', borderWidth: 1 },
    label: { show: true, position: 'inside', formatter: '{b}', color: '#fff' },
    data: STEPS
  }]
}

const pyramidChartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item', { formatter: '{b}: {c}%' }),
  series: [{
    type: 'funnel',
    top: 16,
    bottom: 16,
    left: '10%',
    width: '80%',
    sort: 'ascending',
    gap: 4,
    funnelAlign: 'center',
    itemStyle: { borderColor: '#fff', borderWidth: 1 },
    label: { show: true, position: 'right', color: TEXT },
    data: STEPS
  }]
}

const simpleHighchartsOptions: Options = {
  legend: { align: 'center', verticalAlign: 'top' },
  tooltip: { pointFormat: '{point.name}: <b>{point.y}%</b>' },
  plotOptions: { funnel: { showInLegend: true, neckWidth: '20%', neckHeight: '0%', borderColor: '#fff', borderWidth: 1 } },
  series: [{
    type: 'funnel',
    name: 'Conversione',
    width: '80%',
    dataLabels: { enabled: true, inside: true, format: '{point.name}', color: '#fff', softConnector: true },
    data: HIGHCHARTS_STEPS
  }]
}

const pyramidHighchartsOptions: Options = {
  legend: { enabled: false },
  tooltip: { pointFormat: '{point.name}: <b>{point.y}%</b>' },
  plotOptions: { pyramid: { borderColor: '#fff', borderWidth: 1 } },
  series: [{
    type: 'pyramid',
    name: 'Conversione',
    width: '60%',
    reversed: true,
    dataLabels: { enabled: true, inside: false, format: '{point.name}', color: TEXT, connectorColor: AXIS },
    data: HIGHCHARTS_STEPS
  }]
}

export function FunnelChartExample () {
  return (
    <section id="ks-chart-funnel">
      <h2>Funnel chart</h2>
      <p>Fasi consecutive di un processo, con la perdita a ogni passaggio: ideale per le conversioni. Ogni grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Funnel di conversione" echarts={simpleChartOptions} highcharts={simpleHighchartsOptions} />
      <ChartCompare heading="Piramide" echarts={pyramidChartOptions} highcharts={pyramidHighchartsOptions} />
    </section>
  )
}
