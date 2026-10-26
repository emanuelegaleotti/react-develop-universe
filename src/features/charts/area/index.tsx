import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { categoryAxis, chartBase, gridBox, legend, MONTHS, tooltip, valueAxis } from '../../../shared/chart-compare/chart-theme.ts'

const FILL_COLOR = 'rgba(8, 126, 164, 0.45)'

const fade = (color: string) => ({
  type: 'linear' as const,
  x: 0, y: 0, x2: 0, y2: 1,
  colorStops: [{ offset: 0, color }, { offset: 1, color: 'rgba(255, 255, 255, 0)' }]
})

const VISITS = [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1380, 1620, 1710, 1900]
const TRAFFIC = [
  { name: 'Organico', data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330] },
  { name: 'Social', data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410] },
  { name: 'Email', data: [150, 232, 201, 154, 190, 330, 410, 320, 332, 301, 334, 390] }
]

const SIMPLE_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis'),
  grid: gridBox,
  xAxis: categoryAxis(MONTHS, { boundaryGap: false }),
  yAxis: valueAxis(),
  series: [{
    name: 'Visite',
    type: 'line',
    smooth: true,
    showSymbol: false,
    lineStyle: { width: 3 },
    areaStyle: { color: fade(FILL_COLOR) },
    data: VISITS
  }]
}

const STACKED_ECHARTS: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('axis'),
  legend: legend(),
  grid: gridBox,
  xAxis: categoryAxis(MONTHS, { boundaryGap: false }),
  yAxis: valueAxis(),
  series: TRAFFIC.map(t => ({ name: t.name, type: 'line', stack: 'traffico', smooth: true, showSymbol: false, areaStyle: { opacity: 0.55 }, data: t.data }))
}

const SIMPLE_HIGHCHARTS: Options = {
  legend: { enabled: false },
  tooltip: { shared: true },
  xAxis: { categories: MONTHS, tickmarkPlacement: 'on', crosshair: true },
  series: [{
    type: 'areaspline',
    name: 'Visite',
    lineWidth: 3,
    marker: { enabled: false },
    fillColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, FILL_COLOR], [1, 'rgba(255, 255, 255, 0)']] },
    data: VISITS
  }]
}

const STACKED_HIGHCHARTS: Options = {
  tooltip: { shared: true },
  xAxis: { categories: MONTHS, tickmarkPlacement: 'on', crosshair: true },
  yAxis: { reversedStacks: false },
  plotOptions: { areaspline: { stacking: 'normal', fillOpacity: 0.55, marker: { enabled: false } } },
  series: TRAFFIC.map(t => ({ type: 'areaspline' as const, name: t.name, data: t.data }))
}

export function AreaChartExample() {
  return (
    <section id="ks-chart-area">
      <h2>Area chart</h2>
      <p>Una linea con l'area sottostante riempita: utile per volumi e per serie impilate. Ogni grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Visite mensili" echarts={SIMPLE_ECHARTS} highcharts={SIMPLE_HIGHCHARTS} />
      <ChartCompare heading="Aree impilate" echarts={STACKED_ECHARTS} highcharts={STACKED_HIGHCHARTS} />
    </section>
  )
}
