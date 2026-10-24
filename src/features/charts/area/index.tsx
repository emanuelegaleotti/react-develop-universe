import { useEffect, useRef } from 'react'
import { init, use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
    GridComponent,
    LegendComponent,
    MarkAreaComponent,
    TitleComponent,
    TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import '../chart.scss'

use([
    LineChart,
    GridComponent,
    LegendComponent,
    MarkAreaComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
])

export function AreaChartExample() {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        const chart = init(chartContainerRef.current)

        const option: EChartsOption = {
            animation: false, // Render immediately without the initial transition
            title: {
                top: 0,
                text: 'Weekly sales',
                subtext: 'Actual compared with forecast',
                textStyle: {
                    color: '#23272f',
                    fontSize: 18,
                    fontWeight: 600
                },
                subtextStyle: {
                    color: '#5e687e',
                    fontSize: 13
                }
            },
            legend: {
                bottom: 10,
                data: ['Sales', 'Forecast'],
                selectedMode: false // Prevent legend clicks from hiding series
            },
            tooltip: {
                trigger: 'axis', // Show all series values for the hovered day
                backgroundColor: '#e6f6fa',
                borderColor: '#087ea4',
                borderWidth: 1,
                padding: 12,
                textStyle: {
                    color: '#23272f',
                    fontSize: 14
                },
                axisPointer: {
                    type: 'line', // Track the hovered day with a vertical guide
                    lineStyle: {
                        color: '#087ea4',
                        width: 1,
                        type: 'dashed'
                    }
                },
                valueFormatter: value => `${value} units`
            },
            xAxis: {
                name: 'Day',
                nameLocation: 'middle',
                nameGap: 30,
                type: 'category',
                boundaryGap: false, // Align the first and last points with the axis ends
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                splitLine: {
                    show: true, // Draw a vertical grid line for each day
                    lineStyle: {
                        color: '#ebecf0',
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                name: 'Sales',
                nameLocation: 'middle',
                nameGap: 30,
                position: 'left',
                type: 'value',
            },
            series: [
                {
                    name: 'Sales',
                    type: 'line',
                    data: [120, 225, 150, 80, 70, 110, 110],
                    areaStyle: {}, // Enable the filled area beneath the line
                    itemStyle: {
                        color: '#087ea4'
                    },
                    showSymbol: true, // Keep a visible marker at every data point
                    symbol: 'square',
                    symbolSize: 8,
                    lineStyle: {
                        width: 3,
                        type: 'solid'
                    },
                    markArea: {
                        silent: true, // Prevent the marked region from handling pointer events
                        itemStyle: {
                            color: 'rgb(8 126 164 / 0.35)'
                        },
                        data: [
                            // Each pair defines the start and end of a marked region
                            [
                                { name: 'Weekend', xAxis: 'Sat' },
                                { xAxis: 'Sun' }
                            ]
                        ]
                    }
                },
                {
                    name: 'Forecast',
                    type: 'line',
                    data: [100, 190, 170, 95, 85, 125, 145],
                    areaStyle: {
                        opacity: 0.25,
                    },
                    itemStyle: {
                        color: '#abe2ed'
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
            <h2>Area chart with additional options</h2>
            <div
                ref={chartContainerRef}
                className="ks-chart-container"
            />
        </section>
    )
}
