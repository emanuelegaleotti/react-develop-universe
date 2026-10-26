import type { EChartsCoreOption } from 'echarts/core'
import type { Options, PointOptionsObject } from 'highcharts'
import { ChartCompare } from '../../../shared/chart-compare/chart-compare.tsx'
import { CHART_COLORS, chartBase, tooltip } from '../../../shared/chart-compare/chart-theme.ts'

const DATA = [
  { name: 'Frontend', value: 40, children: [{ name: 'Angular', value: 22 }, { name: 'React', value: 10 }, { name: 'Vue', value: 8 }] },
  { name: 'Backend', value: 34, children: [{ name: 'Node.js', value: 14 }, { name: 'Java', value: 12 }, { name: 'Go', value: 8 }] },
  { name: 'Database', value: 18, children: [{ name: 'PostgreSQL', value: 10 }, { name: 'MongoDB', value: 5 }, { name: 'Redis', value: 3 }] },
  { name: 'DevOps', value: 14, children: [{ name: 'Docker', value: 8 }, { name: 'Kubernetes', value: 6 }] }
]

// Highcharts describes a tree as a flat list of nodes linked by parent id
const FLAT: PointOptionsObject[] = DATA.flatMap((group, i) => [
  { id: group.name, name: group.name, color: CHART_COLORS[i] },
  ...group.children.map(child => ({ name: child.name, parent: group.name, value: child.value }))
])

const chartOptions: EChartsCoreOption = {
  ...chartBase,
  tooltip: tooltip('item', { formatter: '{b}: {c}' }),
  series: [{
    type: 'treemap',
    roam: false,
    nodeClick: false,
    breadcrumb: { show: false },
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
    label: { show: true, formatter: '{b}', color: '#fff', fontWeight: 600 },
    upperLabel: { show: true, height: 28, color: '#fff', fontWeight: 600 },
    itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2, borderRadius: 4 },
    levels: [
      { itemStyle: { borderColor: '#fff', borderWidth: 4, gapWidth: 4 } },
      { colorSaturation: [0.45, 0.75], itemStyle: { borderColorSaturation: 0.7, gapWidth: 2, borderWidth: 2 } }
    ],
    data: DATA
  }]
}

const highchartsOptions: Options = {
  legend: { enabled: false },
  tooltip: { pointFormat: '{point.name}: <b>{point.value}</b>' },
  series: [{
    type: 'treemap',
    layoutAlgorithm: 'squarified',
    allowTraversingTree: false,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 4,
    dataLabels: { enabled: true, style: { color: '#fff', fontWeight: '600', textOutline: 'none' } },
    levels: [
      {
        level: 1,
        borderWidth: 4,
        dataLabels: { enabled: true, align: 'left', verticalAlign: 'top', style: { fontSize: '14px', fontWeight: '600', color: '#fff', textOutline: 'none' } }
      },
      { level: 2, colorVariation: { key: 'brightness', to: 0.3 } }
    ],
    data: FLAT
  }]
}

export function TreemapChartExample () {
  return (
    <section id="ks-chart-treemap">
      <h2>Treemap chart</h2>
      <p>Dati gerarchici rappresentati come rettangoli proporzionali al valore. Il grafico è disegnato sia con ECharts sia con Highcharts.</p>
      <ChartCompare heading="Competenze del team" echarts={chartOptions} highcharts={highchartsOptions} />
    </section>
  )
}
