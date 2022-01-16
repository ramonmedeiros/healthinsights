import { Data64URIReader, ZipReader, TextWriter } from "@zip.js/zip.js";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function unzip(file) {
    let dataURI = await getBase64(file)
    var zipReader = new ZipReader(new Data64URIReader(dataURI))
    return zipReader
}


export async function getEntries(file){
    let zipReader = await unzip(file)
    let entries = []
    for (const entry of await zipReader.getEntries()) {
        entries.push(entry.filename)
    }
    await zipReader.close()
    return entries
}

export async function getFileContent(file, filename){
    let zipReader = await unzip(file)
    for (const entry of await zipReader.getEntries()) {
        if (entry.filename.endsWith(filename)){
            return await entry.getData(new TextWriter())
        }
    }
    await zipReader.close()
}