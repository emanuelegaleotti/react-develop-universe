import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { AXIS, CHART_COLORS, categoryAxis, chartBase, gridBox, tooltip, valueAxis } from '../../../shared/chart-compare/chart-theme.ts'

// [apertura, chiusura, minimo, massimo]
const OHLC = [
  [20, 34, 10, 38], [40, 35, 30, 50], [31, 38, 33, 44], [38, 15, 5, 42], [15, 22, 12, 28],
  [22, 29, 20, 35], [29, 25, 21, 33], [25, 40, 24, 43], [40, 46, 38, 52], [46, 41, 36, 49]
]
const DAYS = OHLC.map((_, i) => `G${i + 1}`)
const VOLUMES = [320, 302, 301, 334, 390, 330, 320, 410, 380, 290]

const UP = CHART_COLORS[3]
const DOWN = CHART_COLORS[4]

// Highcharts Stock expects [x, apertura, massimo, minimo, chiusura]
const OHLC_STOCK = OHLC.map(([open, close, low, high], i) => [i, open, high, low, close])
const VOLUMES_STOCK = VOLUMES.map((v, i) => [i, v])

const stock = (extra: Options): Options => ({
  navigator: { enabled: false },
  scrollbar: { enabled: false },
  rangeSelector: { enabled: false },
  legend: { enabled: false },
  tooltip: { shared: true, split: false },
  // Stock charts use a datetime axis: a plain linear axis with day labels keeps the same G1..G10 ticks
  xAxis: { type: 'linear', ordinal: false, tickInterval: 1, crosshair: true, labels: { formatter: ({ value }) => DAYS[value as number] ?? '' } },
  ...extra
})

const chartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis', { axisPointer: { type: 'cross' } }),
  grid: gridBox,
  xAxis: categoryAxis(DAYS),
  yAxis: valueAxis({ scale: true }),
  series: [{
    name: 'Prezzo',
    type: 'candlestick',
    data: OHLC,
    itemStyle: { color: UP, color0: DOWN, borderColor: UP, borderColor0: DOWN }
  }]
}

const volumeChartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis', { axisPointer: { type: 'cross' } }),
  axisPointer: { link: [{ xAxisIndex: 'all' }] },
  grid: [
    { top: 24, left: 16, right: 24, height: '52%', containLabel: true },
    { top: '72%', left: 16, right: 24, height: '14%', containLabel: true }
  ],
  xAxis: [
    categoryAxis(DAYS, { gridIndex: 0, axisLabel: { show: false } }),
    categoryAxis(DAYS, { gridIndex: 1 })
  ],
  yAxis: [
    valueAxis({ gridIndex: 0, scale: true }),
    valueAxis({ gridIndex: 1, splitNumber: 2, axisLabel: { show: false }, splitLine: { show: false } })
  ],
  dataZoom: [{ type: 'inside', xAxisIndex: [0, 1], start: 0, end: 100 }],
  series: [
    {
      name: 'Prezzo',
      type: 'candlestick',
      data: OHLC,
      itemStyle: { color: UP, color0: DOWN, borderColor: UP, borderColor0: DOWN }
    },
    { name: 'Volume', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, itemStyle: { color: AXIS }, data: VOLUMES }
  ]
}

const highchartsOptions: Options = stock({
  yAxis: { opposite: false },
  series: [{
    type: 'candlestick',
    name: 'Prezzo',
    color: DOWN,
    lineColor: DOWN,
    upColor: UP,
    upLineColor: UP,
    data: OHLC_STOCK
  }]
})

const volumeHighchartsOptions: Options = stock({
  yAxis: [
    { opposite: false, height: '62%', labels: { align: 'right', x: -4 } },
    { opposite: false, top: '70%', height: '24%', offset: 0, gridLineWidth: 0, labels: { enabled: false }, title: { text: undefined } }
  ],
  series: [
    { type: 'candlestick', name: 'Prezzo', color: DOWN, lineColor: DOWN, upColor: UP, upLineColor: UP, data: OHLC_STOCK },
    { type: 'column', name: 'Volume', yAxis: 1, color: AXIS, data: VOLUMES_STOCK }
  ]
})

export function CandlestickChartExample () {
  return (
    <section id="ks-chart-candlestick">
      <h2>Candlestick chart</h2>
      <p>Apertura, chiusura, minimo e massimo per periodo. Verde quando il valore sale, rosso quando scende. Ogni grafico è disegnato sia con ECharts sia con Highcharts (Stock).</p>
      <ChartCompare heading="Andamento giornaliero" echarts={chartOptions} highcharts={highchartsOptions} />
      <ChartCompare heading="Con volumi" echarts={volumeChartOptions} highcharts={volumeHighchartsOptions} />
    </section>
  )
}
