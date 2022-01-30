import React, { useEffect, useState } from "react"
import { ActivitySummary } from "./models"
import { db } from './db'
import ReactECharts from 'echarts-for-react';
import { ACTIVITY_SUMMARY } from "./manipulations"


const CHART_HEIGHT = "19%"

const DescriptiveName = {
    "dateComponents":  "Date",
    "activeEnergyBurned": "Active Energy Burned",
    "activeEnergyBurnedGoal": "",
    "activeEnergyBurnedUnit": "",
    "appleMoveTime": "",
    "appleMoveTimeGoal": "",
    "appleExerciseTime": "Exercise Time",
    "appleExerciseTimeGoal": "",
    "appleStandHours": "Stand hours",
    "appleStandHoursGoal": "",
}

export default function Activity() {
    const [option, setOption] = useState<{}>({})

    useEffect(() => {
        db.exports.get(ACTIVITY_SUMMARY).then(result => {
            if (!result) {
                throw Error("activity data not found")
            }

            let dataset = JSON.parse(result.value) as ActivitySummary[]
            const options = {
                title: {
                    left: 'center',
                    text: 'Activity Summary'
                },
                dataset: {
                    source: dataset,
                    dimensions: [
                        { name: 'dateComponents', type: 'string' },
                        { name: 'activeEnergyBurned', type: 'number' },
                        { name: 'appleExerciseTime', type: 'number' },
                        { name: 'appleStandHours', type: 'number' },
                        { name: 'appleExerciseTimeGoal', type: 'number' },
                        { name: 'appleStandHoursGoal', type: 'number' },
                        { name: 'activeEnergyBurnedGoal', type: 'number' },
                        { name: 'activeEnergyBurnedUnit' },
                        { name: 'appleMoveTime', type: 'number' },
                        { name: 'appleMoveTimeGoal', type: 'number' },
                    ]
                },
                grid: [
                    {
                        top: '10%',
                        height: CHART_HEIGHT,
                        textAlign: "center",
                    },
                    {
                        top: '40%',
                        height: CHART_HEIGHT,
                        textAlign: "center",
                    },
                    {
                        top: '70%',
                        height: CHART_HEIGHT,
                        textAlign: "center",
                    },
                ],
                xAxis: [
                    {
                        //name: "dateComponents",
                        type: 'time',
                        gridIndex: 0
                    },
                    {
                        name: "dateComponents",
                        type: 'time',
                        gridIndex: 1
                    },
                    {
                        name: "dateComponents",
                        type: 'time',
                        gridIndex: 2
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        gridIndex: 0

                    },
                    {
                        type: 'value',
                        gridIndex: 1
                    },
                    {
                        type: 'value',
                        gridIndex: 2
                    },
                ],
                series: [
                    {
                        name: DescriptiveName['activeEnergyBurned'],
                        type: 'bar',
                        seriesLayoutBy: 'row',
                        encode: {
                            x: 'dateComponents',
                            y: 'activeEnergyBurned'
                        },
                        xAxisIndex: 0,
                        yAxisIndex: 0
                    },
                    {
                        name: DescriptiveName['appleExerciseTime'],
                        type: 'bar',
                        seriesLayoutBy: 'row',
                        encode: {
                            x: 'dateComponents',
                            y: 'appleExerciseTime'
                        },
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    },
                    {
                        name: DescriptiveName['appleStandHours'],
                        type: 'bar',
                        seriesLayoutBy: 'row',
                        encode: {
                            x: 'dateComponents',
                            y: 'appleStandHours'
                        },
                        xAxisIndex: 2,
                        yAxisIndex: 2
                    }
                ],
                tooltip: {},
                legend: {
                    left: 'right',
                },

            }
            setOption(options)
        })
    })

    return (
        <React.Fragment>
            <ReactECharts
                option={option}
                style={{ left: '0', right: '0', height: '800px', width: '100%' }}
            />
        </React.Fragment>
    )
}
