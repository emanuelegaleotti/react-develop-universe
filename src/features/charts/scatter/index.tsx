import { useEffect, useRef } from 'react'
import { init, use } from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import '../chart.scss'

use([
    ScatterChart,
    GridComponent,
    TooltipComponent,
    CanvasRenderer
])

export function ScatterChartExample() {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        const chart = init(chartContainerRef.current)

        const option: EChartsOption = {
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Sales',
                    type: 'scatter',
                    data: [
                        [10, 8],
                        [15, 12],
                        [20, 18],
                        [25, 22],
                        [30, 28],
                        [35, 31]
                    ],
                    itemStyle: {
                        color: '#087ea4'
                    }
                }
            ]
        }

        chart.setOption(option)

        return () => {
            chart.dispose()
        }
    }, [])

    return (
        <section className="ks-grid-main" id={'ks-chart'}>
            <h2>Scatter chart</h2>
            <div
                ref={chartContainerRef}
                className="ks-chart-container"
            />
        </section>
    )
}
