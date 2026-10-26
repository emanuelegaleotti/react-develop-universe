import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { categoryAxis, chartBase, MUTED, tooltip, WEEK_DAYS } from '../../../shared/chart-compare/chart-theme.ts'

const HOURS = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`)

// Valori deterministici: più attività nelle ore centrali dei giorni lavorativi
const ACTIVITY = WEEK_DAYS.flatMap((_, d) =>
  HOURS.map((_, h) => {
    const peak = Math.exp(-Math.pow(h - 6.5, 2) / 6)
    const weekend = d > 4 ? 0.35 : 1
    return [h, d, Math.round(peak * weekend * 80 + ((h * 7 + d * 13) % 17))]
  })
)

const RAMP = ['#e6f4f9', '#149eca', '#087ea4']

const chartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item', { position: 'top' }),
  grid: { top: 16, left: 16, right: 16, bottom: 64, containLabel: true },
  xAxis: categoryAxis(HOURS, { splitArea: { show: false } }),
  yAxis: categoryAxis(WEEK_DAYS, { inverse: true }),
  visualMap: {
    min: 0,
    max: 100,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: 0,
    inRange: { color: RAMP },
    textStyle: { color: MUTED }
  },
  series: [{
    name: 'Attività',
    type: 'heatmap',
    data: ACTIVITY,
    itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 4 },
    emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(35, 39, 47, 0.25)' } }
  }]
}

const highchartsOptions: Options = {
  chart: { type: 'heatmap' },
  xAxis: { categories: HOURS, labels: { step: 2 } },
  yAxis: { categories: WEEK_DAYS, reversed: true, gridLineWidth: 0 },
  colorAxis: { min: 0, max: 100, stops: [[0, RAMP[0]], [0.5, RAMP[1]], [1, RAMP[2]]] },
  legend: { align: 'center', verticalAlign: 'bottom', layout: 'horizontal', symbolWidth: 280, symbolHeight: 10 },
  tooltip: {
    headerFormat: '',
    formatter() {
      const { x, y, value } = this as unknown as { x: number; y: number; value: number }
      return `${WEEK_DAYS[y]} ${HOURS[x]}<br/>Attività: <b>${value}</b>`
    }
  },
  series: [{
    type: 'heatmap',
    name: 'Attività',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 4,
    marker: { symbol: 'rect' },
    data: ACTIVITY
  }]
}

export function HeatmapChartExample () {
  return (
    <section id="ks-chart-heatmap">
      <h2>Heatmap chart</h2>
      <p>Intensità di un valore su due categorie: qui l'attività degli utenti per giorno e fascia oraria. Il grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Attività settimanale" echarts={chartOptions} highcharts={highchartsOptions} />
    </section>
  )
}
