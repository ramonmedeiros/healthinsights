import React from 'react';
import { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Data64URIReader, Entry, TextWriter, ZipReader } from "@zip.js/zip.js";



export default function App() {
    const [exportFile, setExportFile] = useState<ZipReader>()

    function uploadFile(files: File[]) {
        if (files.length !== 1) {
            console.error("expect 1 file: aborting")
            return
        }
        unzip(files[0]).then(a => {
            console.log(exportFile)
        })
    }

    function getBase64(file: File) {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async function unzip(file: File) {
        let dataURI = await getBase64(file) as string
        var zipReader = new ZipReader(new Data64URIReader(dataURI))

        debugger
        const entries = await zipReader.getEntries()

        for (const entry of entries) {

            const t = await entry.getData(new TextWriter())
            console.log("")
        }

        setExportFile(zipReader)
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
