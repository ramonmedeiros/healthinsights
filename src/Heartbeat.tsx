import React, { useState } from "react"
import { LineChart, XAxis, Tooltip, Line } from "recharts"
import HeartBeatSerie from "./models"



export default function HeartBeat() {
    const [serie, setSerie] = useState<HeartBeatSerie[]>() 



    return (
        <React.Fragment>
            <LineChart
                width={400}
                height={400}
                data={serie}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="creationDate" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
            </LineChart>
        </React.Fragment>
    )
}
