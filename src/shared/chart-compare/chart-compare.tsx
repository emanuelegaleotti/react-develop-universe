import { useEffect, useRef } from 'react'
import { init } from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'
import HighchartsReact from 'highcharts-react-official'
import type { Options } from 'highcharts'
import './echarts.ts'
import { Highcharts } from './highcharts.ts'
import './chart-compare.scss'

type ChartCompareProps = {
  heading: string
  echarts: EChartsCoreOption
  highcharts: Options
}

function EChart({ options }: { options: EChartsCoreOption }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const chart = init(container)
    chart.setOption({ animation: false, ...options })
    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(container)
    return () => {
      observer.disconnect()
      chart.dispose()
    }
  }, [options])

  return <div ref={containerRef} className="ks-chart-canvas" />
}

// The same chart drawn by two libraries, side by side
export function ChartCompare({ heading, echarts, highcharts }: ChartCompareProps) {
  return (
    <article className="ks-chart-compare">
      <h3>{heading}</h3>
      <div className="ks-chart-panels">
        <div className="ks-chart-panel" data-lib="echarts">
          <header>
            <strong>ECharts</strong>
            <span>Canvas</span>
          </header>
          <EChart options={echarts} />
        </div>
        <div className="ks-chart-panel" data-lib="highcharts">
          <header>
            <strong>Highcharts</strong>
            <span>SVG</span>
          </header>
          <div className="ks-chart-canvas">
            <HighchartsReact highcharts={Highcharts} options={highcharts}
                             containerProps={{ style: { height: '100%' } }} />
          </div>
        </div>
      </div>
    </article>
  )
}
