import HeartBeatSerie from './models'

export const HEARTBEAT_SERIES = "HKQuantityTypeIdentifierHeartRate"


export class ParseExport {
    parser: Document;

    constructor(xmlDocument: string) {
        try {
            this.parser = this.parseExport(xmlDocument)
        } catch (error) {
            console.error(`could not parse string: ${error}`)
            throw error
        }
    }

    parseExport(document: string): Document {
        const parser = new DOMParser()
        const doc = parser.parseFromString(document, "application/xml")

        const errorNode = doc.querySelector("parsererror")
        if (errorNode) {
            console.log("error while parsing")
            throw Error("some shit happen")
        }
        return doc
    }
    extractHeartBeat(): HeartBeatSerie[] {
        let records = this.parser.documentElement.querySelectorAll("Record[type='" + HEARTBEAT_SERIES + "']")
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
    getAvailableDateTypes(): Map<string, number> {
        let records = this.parser.documentElement.querySelectorAll("Record")
        let series = new Map<string, number>()

        for (const resource of records) {
            const type = resource.getAttribute("type") || ""
            const search = series.get(type)
            if (!search){
                series.set(type, 1)
            }else{
                series.set(type, search + 1)
            }
        }
        return series
    }
}