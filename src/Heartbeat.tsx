import React, { useEffect, useState } from "react"
import HeartBeatSerie from "./models"
import { db } from './db'
import { HEARTBEAT_SERIES } from "./manipulations"
import ReactECharts from 'echarts-for-react';

const upColor = '#ec0000';
const downColor = '#00da3c';

const upBorderColor = '#8A0000';
const downBorderColor = '#008F28';

export default function HeartBeat() {
    const [option, setOption] = useState<{}>({})

    useEffect(() => {
        db.exports.where("id").equals(HEARTBEAT_SERIES).each(serie => {
            let s = JSON.parse(serie.value) as HeartBeatSerie[]

            const options = {
                dataset: {
                    source: s,
                    dimensions: ['creationDate', 'value', 'startDate', 'endDate']
                  },
                xAxis: {
                      type: 'category',
                    },
                    
                yAxis: {},
                series: [
                    {
                        type: 'line',
                        smooth: true
                    },
                ],
                tooltip:{},
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
