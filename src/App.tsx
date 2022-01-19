import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { getFileContent as unzipSpecificFile } from "./zip_utils.js"
import { db } from './db'
import { useNavigate } from 'react-router-dom'
import {extractHeartBeat, HEARTBEAT_SERIES} from './manipulations'

function App() {
    let navigate = useNavigate();

    async function downloadFile(files: File[]) {
        if (files.length !== 1) {
            console.error("expect 1 file: aborting")
            return
        }

        let content = await unzipSpecificFile(files[0], "export.xml")
        let heartbeat = extractHeartBeat(content)

        try {
            await db.exports.add({
                id: HEARTBEAT_SERIES,
                value: JSON.stringify(heartbeat),
            })
        } catch (error) {
            debugger
            console.error(`Failed to add : ${error}`);
        }
        console.log("done")
        //navigate("/heartbeat")
    }

    return (
        <React.Fragment>
            <DropzoneArea
                acceptedFiles={['application/zip']}
                dropzoneText={"Drag and drop Apple Health export here"}
                onDrop={downloadFile}
                filesLimit={1}
                maxFileSize={9999999}
            />
        </React.Fragment>
    )
}

export default App;
