import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { getFileContent as unzipSpecificFile } from "./zip_utils.js"
import { db } from './db'
import { ParseExport } from './manipulations'

export default function Home() {
    const [keys, setKeys] = useState<JSX.Element[]>([])

    async function downloadFile(files: File[], event: any) {
        if (files.length !== 1) {
            console.error("expect 1 file: aborting")
            return
        }
        hideDropzone()
        
        let content = await unzipSpecificFile(files[0], "export.xml")
        const parser = new ParseExport(content)

        var keys: JSX.Element[] = []
        for (const key of parser.getAvailableDateTypes()) {
            keys.push(<h5 key={key[0]}>{key[0]}</h5>)
        }
        setKeys(keys)

        await db.upsertHeartbeat(parser.extractHeartBeat())
        await db.upsertActivitySummary(parser.extractActivity())
    }

    function hideDropzone(){
        let dropzoneElement = document.getElementById("dropzone")
        if (dropzoneElement !== null){
            dropzoneElement.hidden=true
        }
    }

    return (
        <React.Fragment>
            <div id="dropzone">
                <DropzoneArea
                    acceptedFiles={['application/zip']}
                    dropzoneText={"Drag and drop Apple Health export here"}
                    onDrop={downloadFile}
                    filesLimit={1}
                    maxFileSize={9999999}
                />
            </div>

            <h1>Mapped content</h1>
            <a href="/#/heartbeat"><h2>Historical Heatbeat</h2></a>
            <a href="/#/activity"><h2>Activity Summary</h2></a>
            {keys}
        </React.Fragment>
    )
}
