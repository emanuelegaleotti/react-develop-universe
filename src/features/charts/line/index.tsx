import { useEffect, useRef } from 'react'
import { init, use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import '../chart.scss'

use([
    LineChart,
    GridComponent,
    TooltipComponent,
    CanvasRenderer
])

export function LineChartExample() {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        const chart = init(chartContainerRef.current)

        const option: EChartsOption = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Sales',
                    type: 'line',
                    data: [120, 225, 150, 80, 70, 110, 130],
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
            <h2>Line chart</h2>
            <div
                ref={chartContainerRef}
                className="ks-chart-container"
            />
        </section>
    )
}
