import React, { useEffect, useState } from "react"
import {HeartBeatSerie} from "./models"
import { db } from './db'
import ReactECharts from 'echarts-for-react';
import { HEARTBEAT_SERIES } from "./manipulations"


export default function HeartBeat() {
    const [option, setOption] = useState<{}>({})

    useEffect(() => {
        db.exports.get(HEARTBEAT_SERIES).then(result => {
            if (!result) {
                throw Error("heartbeat data not found")
            }

            const options = {
                title: {
                    left: 'center',
                    text: 'Historical Heartbeat time-series'
                },
                dataset: {
                    source: JSON.parse(result.value) as HeartBeatSerie[],
                    dimensions: [
                        { name: 'creationDate' },
                        { name: 'value', type: 'number', displayName: 'BPM' },
                        { name: 'startDate' },
                        { name: 'endDate' }
                    ]
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        formatter: function (dateString: string) {
                            let date = new Date(dateString)
                            return `${date.toLocaleString('en-gb', {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            })}`
                        },
                    },
                    axisLine: { onZero: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                },
                yAxis: {
                    axisLabel: {
                        formatter: `{value} BPM`,
                    },
                },
                series: [
                    {
                        type: 'line',
                        smooth: true
                    },
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        label: {
                            formatter: function (props: { value: string, axisDimension: string, axisIndex: number, seriesData: any }) {
                                let date = new Date(props.value)
                                return `BPM on ${date.toLocaleString('en-gb', {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                })}`
                            },
                        },
                    },
                },
                toolbox: {
                    show: true,
                    left: 'center',
                    itemSize: 15,
                    top: 20,
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        restore: {
                            show: false
                        },
                        saveAsImage: {}
                    },

                },
                dataZoom: [
                    {
                        type: 'inside',
                        throttle: 50
                    },
                ],
                grid: {
                    top: 110,
                    left: 80,
                    right: 80,
                    height: 400
                },
            }
            setOption(options)
        })
    })

    return (
        <React.Fragment>
            <ReactECharts
                option={option}
                style={{ height: '600px', width: '100%' }}
            />
        </React.Fragment>
    )
}
