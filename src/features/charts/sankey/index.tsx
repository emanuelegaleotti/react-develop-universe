import type { EChartsCoreOption } from 'echarts/core'
import type { Options } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { chartBase, TEXT, tooltip } from '../../../shared/chart-compare/chart-theme.ts'

const NODES = ['Organico', 'Social', 'Email', 'Advertising', 'Landing', 'Catalogo', 'Carrello', 'Acquisto', 'Abbandono']
const LINKS: [string, string, number][] = [
  ['Organico', 'Landing', 40],
  ['Social', 'Landing', 25],
  ['Email', 'Catalogo', 18],
  ['Advertising', 'Landing', 32],
  ['Landing', 'Catalogo', 70],
  ['Landing', 'Abbandono', 27],
  ['Catalogo', 'Carrello', 52],
  ['Catalogo', 'Abbandono', 36],
  ['Carrello', 'Acquisto', 34],
  ['Carrello', 'Abbandono', 18]
]

const chartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item', { triggerOn: 'mousemove' }),
  series: [{
    type: 'sankey',
    left: 16,
    right: 120,
    top: 16,
    bottom: 16,
    nodeGap: 14,
    nodeWidth: 16,
    emphasis: { focus: 'adjacency' },
    lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.35 },
    label: { color: TEXT },
    data: NODES.map(name => ({ name })),
    links: LINKS.map(([source, target, value]) => ({ source, target, value }))
  }]
}

const highchartsOptions: Options = {
  legend: { enabled: false },
  chart: { marginRight: 96 },
  series: [{
    type: 'sankey',
    name: 'Percorso degli utenti',
    tooltip: {
      nodeFormat: '{point.name}: <b>{point.sum}</b>',
      pointFormat: '{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}</b>'
    },
    keys: ['from', 'to', 'weight'],
    nodeWidth: 16,
    nodePadding: 14,
    linkOpacity: 0.35,
    colorByPoint: true,
    curveFactor: 0.5,
    dataLabels: { align: 'left', x: 22, overflow: 'allow', crop: false, style: { color: TEXT, fontWeight: '400' } },
    nodes: NODES.map(id => ({ id, name: id })),
    data: LINKS
  }]
}

export function SankeyChartExample () {
  return (
    <section id="ks-chart-sankey">
      <h2>Sankey chart</h2>
      <p>Flussi tra nodi: lo spessore di ogni collegamento è proporzionale alla quantità trasferita. Il grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Percorso degli utenti" echarts={chartOptions} highcharts={highchartsOptions} />
    </section>
  )
}
