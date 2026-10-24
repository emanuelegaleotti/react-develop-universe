import { useEffect, useRef } from 'react'
import { init, use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import '../chart.scss'

use([
    PieChart,
    TooltipComponent,
    CanvasRenderer
])

export function PieChartExample() {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        const chart = init(chartContainerRef.current)

        const option: EChartsOption = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Sales',
                    type: 'pie',
                    data: [
                        {
                            value: 335,
                            name: 'Product A',
                            itemStyle: {
                                color: '#087ea4'
                            }
                        },
                        {
                            value: 234, name: 'Product B',

                        },
                        { value: 154, name: 'Product C' }
                    ]
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
            <h2>Pie chart</h2>
            <div
                ref={chartContainerRef}
                className="ks-chart-container"
            />
        </section>
    )
}
