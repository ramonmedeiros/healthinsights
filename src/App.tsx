import React from 'react';
import {useState} from 'react';
import {DropzoneArea} from 'material-ui-dropzone';


export default function App() {
    const [exportFile, setExportFile] = useState<File>()

    function uploadFile(files: File[]) {
        debugger
        if (files.length != 1 ){
            console.error("expect 1 file: aborting")
            return
        }
        setExportFile(files[0])
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
        </React.Fragment>
    )
}
