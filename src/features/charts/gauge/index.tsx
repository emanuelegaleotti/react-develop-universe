import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { AXIS, CHART_COLORS, chartBase, GRID, MUTED, TEXT, tooltip } from '../../../shared/chart-compare/chart-theme.ts'

const PRIMARY = CHART_COLORS[0]
const GOOD = CHART_COLORS[3]
const WARN = CHART_COLORS[2]
const BAD = CHART_COLORS[4]

const simpleChartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  series: [{
    type: 'gauge',
    radius: '85%',
    progress: { show: true, width: 16, itemStyle: { color: PRIMARY } },
    axisLine: { lineStyle: { width: 16, color: [[1, GRID]] } },
    axisTick: { show: false },
    splitLine: { length: 10, lineStyle: { width: 2, color: AXIS } },
    axisLabel: { distance: 24, color: MUTED },
    pointer: { width: 5, itemStyle: { color: PRIMARY } },
    anchor: { show: true, size: 16, itemStyle: { borderColor: PRIMARY, borderWidth: 4, color: '#fff' } },
    title: { offsetCenter: [0, '78%'], color: MUTED },
    detail: { valueAnimation: true, offsetCenter: [0, '58%'], fontSize: 32, fontWeight: 600, color: TEXT, formatter: '{value}%' },
    data: [{ value: 72, name: 'CPU' }]
  }]
}

const zonesChartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item'),
  series: [{
    type: 'gauge',
    radius: '85%',
    min: 0,
    max: 240,
    splitNumber: 8,
    axisLine: { lineStyle: { width: 14, color: [[0.4, GOOD], [0.75, WARN], [1, BAD]] } },
    axisTick: { distance: -14, length: 5, lineStyle: { color: '#fff', width: 1 } },
    splitLine: { distance: -14, length: 14, lineStyle: { color: '#fff', width: 2 } },
    axisLabel: { distance: 22, color: MUTED },
    pointer: { width: 5, itemStyle: { color: 'auto' } },
    anchor: { show: true, size: 14, itemStyle: { color: TEXT } },
    title: { offsetCenter: [0, '78%'], color: MUTED },
    detail: { offsetCenter: [0, '58%'], fontSize: 28, fontWeight: 600, color: 'inherit', formatter: '{value} km/h' },
    data: [{ value: 168, name: 'Velocità' }]
  }]
}

const simpleHighchartsOptions: Options = {
  chart: { type: 'solidgauge' },
  legend: { enabled: false },
  pane: {
    size: '85%',
    center: ['50%', '52%'],
    startAngle: -135,
    endAngle: 135,
    background: [{ shape: 'arc', outerRadius: '100%', innerRadius: '86%', backgroundColor: GRID, borderWidth: 0 }]
  },
  yAxis: { min: 0, max: 100, lineWidth: 0, tickAmount: 2, minorTickLength: 0, tickWidth: 0, labels: { y: 20 } },
  tooltip: { enabled: false },
  series: [{
    type: 'solidgauge',
    name: 'CPU',
    radius: '100%',
    innerRadius: '86%',
    color: PRIMARY,
    data: [72],
    dataLabels: {
      useHTML: true,
      borderWidth: 0,
      y: -24,
      format: `<div style="text-align:center"><span style="font-size:2rem;font-weight:600;color:${TEXT}">{y}%</span><br/><span style="color:${MUTED};font-weight:400">CPU</span></div>`
    }
  }]
}

const zonesHighchartsOptions: Options = {
  chart: { type: 'gauge' },
  legend: { enabled: false },
  pane: { size: '85%', center: ['50%', '52%'], startAngle: -135, endAngle: 135, background: [{ backgroundColor: 'transparent', borderWidth: 0 }] },
  yAxis: {
    min: 0,
    max: 240,
    tickInterval: 30,
    minorTickLength: 0,
    tickWidth: 2,
    tickLength: 10,
    tickColor: AXIS,
    lineWidth: 0,
    labels: { distance: 14, style: { color: MUTED } },
    plotBands: [
      { from: 0, to: 96, color: GOOD, thickness: 14 },
      { from: 96, to: 180, color: WARN, thickness: 14 },
      { from: 180, to: 240, color: BAD, thickness: 14 }
    ]
  },
  tooltip: { valueSuffix: ' km/h' },
  series: [{
    type: 'gauge',
    name: 'Velocità',
    data: [168],
    dial: { radius: '78%', backgroundColor: TEXT, baseWidth: 8, rearLength: '0%' },
    pivot: { radius: 7, backgroundColor: TEXT },
    dataLabels: { borderWidth: 0, y: 24, format: '{y} km/h', style: { fontSize: '1.75rem', fontWeight: '600', color: TEXT } }
  }]
}

export function GaugeChartExample () {
  return (
    <section id="ks-chart-gauge">
      <h2>Gauge chart</h2>
      <p>Un singolo valore rispetto a un intervallo: indicatore a progresso e quadrante a zone di colore. Ogni grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Progresso" echarts={simpleChartOptions} highcharts={simpleHighchartsOptions} />
      <ChartCompare heading="Quadrante a zone" echarts={zonesChartOptions} highcharts={zonesHighchartsOptions} />
    </section>
  )
}
