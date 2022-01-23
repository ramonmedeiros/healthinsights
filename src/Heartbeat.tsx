import React, { useEffect, useState } from "react"
import HeartBeatSerie from "./models"
import { db } from './db'
import { HEARTBEAT_SERIES } from "./manipulations"
import ReactECharts from 'echarts-for-react';


export default function HeartBeat() {
    const [option, setOption] = useState<{}>({})

    useEffect(() => {
        db.exports.where("id").equals(HEARTBEAT_SERIES).each(serie => {
            let s = JSON.parse(serie.value) as HeartBeatSerie[]

            const options = {
                dataset: {
                    source: s,
                    dimensions: [{name: 'creationDate'}, 
                                 {name: 'value', type: 'number', displayName: 'BPM'}, 
                                 {name: 'startDate'}, 
                                 {name: 'endDate'}]
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
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        throttle: 50
                    },
                ],
            }
            setOption(options)
        })

    })


    return (
        <React.Fragment>
            <ReactECharts option={option} />
        </React.Fragment>
    )
}
