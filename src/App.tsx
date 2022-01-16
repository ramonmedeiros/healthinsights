import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { getFileContent } from "./zip_utils.js"
import HeartBeatSerie from "./models"
import HeartBeat from './Heartbeat'

const HEARTBEAT_SERIES = "HKQuantityTypeIdentifierHeartRate"

export default function App() {
    //const [exportFile, setExportFile] = useState<File>()
    const [heartbeat, setHeartbeat] = useState<JSX.Element>()

    function uploadFile(files: File[]) {
        if (files.length !== 1) {
            console.error("expect 1 file: aborting")
            return
        }

        //getEntries(files[0]).then(entries => console.log(entries))
        getFileContent(files[0], "export.xml").then(content => {
            plotHeartBeat(content)
        })
    }


    function plotHeartBeat(xmlContent: string) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(xmlContent, "application/xml")
        // print the name of the root element or error message
        const errorNode = doc.querySelector("parsererror")
        if (errorNode) {
            console.log("error while parsing")
            return
        }

        let records = doc.documentElement.getElementsByTagName("Record")

        var series: HeartBeatSerie[] = []
        for (const resource of records) {
            if (resource.getAttribute("type") === HEARTBEAT_SERIES) {
                series.push({
                    creationDate: new Date(Date.parse(resource.getAttribute("creationDate") || Date.now().toString())),
                    startDate: new Date(Date.parse(resource.getAttribute("startDate") || Date.now().toString())),
                    endDate: new Date(Date.parse(resource.getAttribute("endDate") || Date.now().toString())),
                    value: Number(resource.getAttribute("value")),
                })
            }
        }
        setHeartbeat(<HeartBeat series={series} />)
    }

    return (
        <React.Fragment>
            <DropzoneArea
                acceptedFiles={['application/zip']}
                dropzoneText={"Drag and drop Apple Health export here"}
                onDrop={uploadFile}
                filesLimit={1}
                maxFileSize={9999999}
            />
            {heartbeat}
        </React.Fragment>
    )
}
