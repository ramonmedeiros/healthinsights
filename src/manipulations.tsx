
import HeartBeatSerie from './models'

export const HEARTBEAT_SERIES = "HKQuantityTypeIdentifierHeartRate"


export function extractHeartBeat(xmlContent: string): HeartBeatSerie[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlContent, "application/xml")

    const errorNode = doc.querySelector("parsererror")
    if (errorNode) {
        console.log("error while parsing")
        throw Error("some shit happen")
    }

    let records = doc.documentElement.querySelectorAll("Record[type='" + HEARTBEAT_SERIES + "']")
    var series: HeartBeatSerie[] = []

    for (const resource of records) {
        series.push({
            creationDate: new Date(Date.parse(resource.getAttribute("creationDate") || Date.now().toString())),
            startDate: new Date(Date.parse(resource.getAttribute("startDate") || Date.now().toString())),
            endDate: new Date(Date.parse(resource.getAttribute("endDate") || Date.now().toString())),
            value: Number(resource.getAttribute("value")),
        })

    }
    return series
}